mod rest;
mod socket;

use crate::socket::ServerMessage;
use axum::Router;
use axum::routing::{any, post};
use blog_common::ReportRequest;
use std::env::var;
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio::sync::{Mutex, broadcast};
use tower_http::trace::TraceLayer;
use tracing::{Level, info};
use tracing_subscriber::EnvFilter;

#[derive(Debug, Clone)]
pub struct AppState {
    pub socket_sender: broadcast::Sender<ServerMessage>,
    pub last_report: Arc<Mutex<Option<ReportRequest>>>,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::builder()
                .with_default_directive(Level::INFO.into())
                .from_env_lossy(),
        )
        .init();

    let host = var("HOST").unwrap_or("127.0.0.1".to_string());
    let port = var("PORT").unwrap_or("8123".to_string());
    let listener = TcpListener::bind(format!("{host}:{port}")).await.unwrap();

    info!(host, port, "server listening");

    let (socket_sender, _) = broadcast::channel(100);

    let router = Router::new()
        .route("/socket", any(socket::handle_socket))
        .route("/report", post(rest::handle_report))
        .layer(TraceLayer::new_for_http())
        .with_state(AppState {
            socket_sender: socket_sender.clone(),
            last_report: Arc::new(Mutex::new(None)),
        });

    axum::serve(listener, router).await.unwrap();
}
