use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;
use tracing::info;

/// Create a PostgreSQL connection pool from the provided database URL.
///
/// The pool is configured with sensible defaults for a production workload.
pub async fn create_pool(database_url: &str) -> Result<PgPool, sqlx::Error> {
    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(database_url)
        .await?;

    info!("✅ Database connection pool established");

    Ok(pool)
}

/// Run all pending SQLx migrations embedded at compile time.
pub async fn run_migrations(pool: &PgPool) -> Result<(), sqlx::migrate::MigrateError> {
    sqlx::migrate!("./migrations").run(pool).await?;
    info!("✅ Database migrations applied");
    Ok(())
}
