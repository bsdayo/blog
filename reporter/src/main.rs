use anyhow::{Result, anyhow};
use base64::Engine;
use base64::prelude::BASE64_STANDARD;
use block2::RcBlock;
use blog_common::ReportRequest;
use objc2::AnyThread;
use objc2::rc::Retained;
use objc2_app_kit::{
    NSApplication, NSBitmapImageFileType, NSBitmapImageRep, NSRunningApplication, NSWorkspace,
    NSWorkspaceApplicationKey, NSWorkspaceDidActivateApplicationNotification,
};
use objc2_foundation::{MainThreadMarker, NSDictionary, NSNotification};
use serde::Deserialize;
use std::collections::HashMap;
use std::ptr::{NonNull, null_mut};
use std::sync::LazyLock;
use std::{env, fs};
use tracing::{error, info, warn};

#[derive(Deserialize)]
struct ServerConfig {
    address: String,
    token: String,
}

#[derive(Deserialize)]
struct Config {
    server: ServerConfig,
    messages: HashMap<String, String>,
}

static CONFIG: LazyLock<Option<Config>> = LazyLock::new(|| {
    let path = env::home_dir()
        .unwrap()
        .join(".config/blog-backend-reporter/config.toml");
    if let Ok(f) = fs::read_to_string(path) {
        let config = toml::from_str(&f).unwrap();
        info!("config loaded");
        config
    } else {
        warn!("config not found");
        None
    }
});

static CLIENT: LazyLock<reqwest::Client> = LazyLock::new(|| {
    reqwest::Client::builder()
        .user_agent(format!(
            "{}/{}",
            env!("CARGO_PKG_NAME"),
            env!("CARGO_PKG_VERSION")
        ))
        .build()
        .unwrap()
});

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = NSApplication::sharedApplication(MainThreadMarker::new().unwrap());

    let notification_center = NSWorkspace::sharedWorkspace().notificationCenter();
    unsafe {
        notification_center.addObserverForName_object_queue_usingBlock(
            Some(&NSWorkspaceDidActivateApplicationNotification),
            None,
            None,
            &RcBlock::new(observer),
        );
    }

    app.run();
}

fn observer(notification: NonNull<NSNotification>) {
    let app = get_activated_app(notification);
    match app {
        Ok(app) => {
            if let Some(id) = app.bundleIdentifier() {
                let id = id.to_string();
                if let Some(config) = CONFIG.as_ref()
                    && let Some(message) = config.messages.get(&id)
                {
                    info!(id, message, "app activated");

                    let icon_data_url = app
                        .icon()
                        .and_then(|icon| unsafe {
                            icon.CGImageForProposedRect_context_hints(null_mut(), None, None)
                        })
                        .and_then(|cg_image| {
                            let rep = NSBitmapImageRep::initWithCGImage(
                                NSBitmapImageRep::alloc(),
                                &cg_image,
                            );
                            unsafe {
                                rep.representationUsingType_properties(
                                    NSBitmapImageFileType::PNG,
                                    &NSDictionary::new(),
                                )
                            }
                        })
                        .map(|data| {
                            let bytes = unsafe { data.as_bytes_unchecked() };
                            let base64 = BASE64_STANDARD.encode(bytes);
                            format!("data:image/png;base64,{base64}")
                        });

                    tokio::spawn(async move {
                        let result = CLIENT
                            .post(format!("{}/report", config.server.address))
                            .json(&ReportRequest {
                                token: config.server.token.clone(),
                                icon: icon_data_url,
                                message: message.clone(),
                            })
                            .send()
                            .await
                            .and_then(|rep| rep.error_for_status());
                        if let Err(error) = result {
                            error!(%error, "failed to send report");
                        }
                    });
                } else {
                    info!(id, "app activated but no message configured");
                }
            } else {
                warn!(url = ?app.bundleURL(), "bundle id not found");
            }
        }
        Err(error) => {
            error!(%error, "failed to get activated app");
        }
    }
}

fn get_activated_app(
    notification: NonNull<NSNotification>,
) -> Result<Retained<NSRunningApplication>> {
    unsafe {
        let notification = notification.as_ref();
        let user_info = notification
            .userInfo()
            .ok_or(anyhow!("failed to get userInfo"))?;
        let value = user_info
            .valueForKey(NSWorkspaceApplicationKey)
            .ok_or(anyhow!("failed to get application value"))?;
        let app = value
            .downcast::<NSRunningApplication>()
            .map_err(|_| anyhow!("failed to downcast"))?;
        Ok(app)
    }
}
