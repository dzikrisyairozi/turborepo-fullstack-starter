/// Application configuration loaded from environment variables.
#[derive(Debug, Clone)]
pub struct AppConfig {
    pub database_url: String,
    pub host: String,
    pub port: u16,
}

impl AppConfig {
    /// Load configuration from environment variables.
    ///
    /// Falls back to sensible defaults for `HOST` and `PORT`.
    pub fn from_env() -> Result<Self, std::env::VarError> {
        Ok(Self {
            database_url: std::env::var("DATABASE_URL")?,
            host: std::env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
            port: std::env::var("PORT")
                .unwrap_or_else(|_| "3001".to_string())
                .parse()
                .expect("PORT must be a valid u16"),
        })
    }
}
