use crate::AppState;
use anyhow::Result;
use axum::extract::ws::WebSocket;
use axum::extract::{State, WebSocketUpgrade, ws};
use axum::response::Response;
use blog_common::ReportRequest;
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use std::time::Duration;
use tokio::sync::mpsc;
use tokio::time::sleep;
use tracing::{debug, instrument};

#[allow(unused)]
#[derive(Debug, Deserialize)]
struct ClientMessage {
    slug: Option<String>,
}

impl TryFrom<ws::Utf8Bytes> for ClientMessage {
    type Error = anyhow::Error;
    fn try_from(value: ws::Utf8Bytes) -> std::result::Result<Self, Self::Error> {
        let msg = serde_json::from_str(&value)?;
        Ok(msg)
    }
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase", tag = "type")]
pub enum ServerMessage {
    Info {
        name: String,
        version: String,
    },
    State {
        connections: usize,
    },
    Activity {
        icon: Option<String>,
        message: String,
    },
}

impl ServerMessage {
    fn new_info() -> Self {
        ServerMessage::Info {
            name: env!("CARGO_PKG_NAME").to_string(),
            version: env!("CARGO_PKG_VERSION").to_string(),
        }
    }
}

impl From<ReportRequest> for ServerMessage {
    fn from(value: ReportRequest) -> Self {
        ServerMessage::Activity {
            icon: value.icon,
            message: value.message,
        }
    }
}

impl TryInto<ws::Message> for ServerMessage {
    type Error = anyhow::Error;
    fn try_into(self) -> std::result::Result<ws::Message, Self::Error> {
        let json = serde_json::to_string(&self)?;
        Ok(ws::Message::Text(json.into()))
    }
}

pub async fn handle_socket(ws: WebSocketUpgrade, State(state): State<AppState>) -> Response {
    ws.on_upgrade(|socket: WebSocket| async move {
        _ = handle_socket_core(socket, state).await;
    })
}

#[instrument(skip(socket), err)]
async fn handle_socket_core(socket: WebSocket, state: AppState) -> Result<()> {
    debug!("new websocket connection");

    let (mut socket_tx, mut socket_rx) = socket.split();

    socket_tx
        .send(ServerMessage::new_info().try_into()?)
        .await?;

    {
        if let Some(last_report) = state.last_report.lock().await.clone() {
            socket_tx
                .send(ServerMessage::from(last_report).try_into()?)
                .await?;
        }
    }

    let mut broadcast_rx = state.socket_sender.subscribe();
    let (tx, mut rx) = mpsc::unbounded_channel::<ServerMessage>();

    let broadcast_sender_tx = tx.clone();
    let broadcast_sender = async move {
        // forward broadcast messages
        while let Ok(message) = broadcast_rx.recv().await {
            _ = broadcast_sender_tx.send(message);
        }
    };

    let state_sender_tx = tx.clone();
    let state_sender = async move {
        // send state every 5 seconds
        while state_sender_tx
            .send(ServerMessage::State {
                connections: state.socket_sender.receiver_count(),
            })
            .is_ok()
        {
            sleep(Duration::from_secs(5)).await;
        }
    };

    let socket_receiver = async move {
        // if a close message is received or any error occurred, the loop will exit
        while let Some(Ok(ws::Message::Text(_message))) = socket_rx.next().await {
            //
        }
    };

    let socket_sender = async move {
        while let Some(message) = rx.recv().await {
            if let Ok(ws_message) = message.try_into() {
                _ = socket_tx.send(ws_message).await;
            }
        }
    };

    tokio::select! {
        _ = broadcast_sender => {},
        _ = state_sender => {},

        _ = socket_receiver => {},
        _ = socket_sender => {},
    }

    Ok(())
}
