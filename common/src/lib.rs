use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct ReportRequest {
    pub token: String,
    pub icon: Option<String>,
    pub message: String,
}
