use crate::AppState;
use crate::socket::ServerMessage;
use axum::Json;
use axum::extract::State;
use axum::http::StatusCode;
use blog_common::ReportRequest;
use std::env;
use tracing::{info, warn};

pub async fn handle_report(
    State(state): State<AppState>,
    Json(req): Json<ReportRequest>,
) -> StatusCode {
    let env_token = env::var("TOKEN");
    if let Ok(token) = env_token {
        if req.token != token {
            return StatusCode::UNAUTHORIZED;
        }
        info!(message = req.message, "report received");
        let req_clone = req.clone();
        _ = state.socket_sender.send(ServerMessage::Activity {
            icon: req.icon,
            message: req.message,
        });
        state.last_report.lock().await.replace(req_clone);
    } else {
        warn!("TOKEN env var not set");
        return StatusCode::INTERNAL_SERVER_ERROR;
    }

    StatusCode::OK
}
