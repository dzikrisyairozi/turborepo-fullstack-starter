// ─────────────────────────────────────────────────────────────────────────────
// Monorepo Fullstack Starter — Rust API
//
// Author:     Dzikri Syairozi <dzikrisyairozi@gmail.com>
// Repository: https://github.com/dzikrisyairozi/monorepo-fullstack-starter
// License:    MIT
// ─────────────────────────────────────────────────────────────────────────────

use std::sync::Arc;
use tokio::net::TcpListener;
use tracing_subscriber::EnvFilter;

use api::api::router::create_router;
use api::application::services::user_service::UserService;
use api::config::AppConfig;
use api::infrastructure::database::connection::{create_pool, run_migrations};
use api::infrastructure::database::repositories::user_repository_impl::PgUserRepository;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // ── 1. Load configuration (before tracing so we can print the banner) ──
    dotenvy::dotenv().ok();
    let config = AppConfig::from_env()?;

    // ── 2. Initialise tracing ────────────────────────────────
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")),
        )
        .init();

    // ── 3. Startup banner (plain text so URLs are clickable) ──
    println!();
    println!("  🚀 Monorepo API Starter");
    println!("  ────────────────────────────────────────");
    println!("  ├─ Local:   http://localhost:{}", config.port);
    println!("  ├─ Health:  http://localhost:{}/health", config.port);
    println!("  ├─ Docs:    http://localhost:{}/docs", config.port);
    println!("  └─ OpenAPI: http://localhost:{}/api-docs/openapi.json", config.port);
    println!();

    // ── 4. Database ──────────────────────────────────────────
    let pool = create_pool(&config.database_url).await?;
    run_migrations(&pool).await?;

    // ── 5. Wire up dependencies (poor-man's DI) ──────────────
    let user_repo = Arc::new(PgUserRepository::new(pool.clone()));
    let user_service = Arc::new(UserService::new(user_repo));

    // ── 6. Build router ──────────────────────────────────────
    let app = create_router(user_service);

    // ── 7. Start server ──────────────────────────────────────
    let addr = format!("{}:{}", config.host, config.port);
    let listener = TcpListener::bind(&addr).await?;

    println!("  ✅ Server listening on http://localhost:{}", config.port);
    println!();

    axum::serve(listener, app).await?;

    Ok(())
}
