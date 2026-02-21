use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;
use uuid::Uuid;

use crate::domain::entities::user::User;

// ──────────────────────────────────────────────
// Request DTOs
// ──────────────────────────────────────────────

/// Payload for creating a new user.
#[derive(Debug, Deserialize, Serialize, ToSchema, TS)]
#[ts(export)]
pub struct CreateUserRequest {
    /// User email address.
    pub email: String,
    /// Display name.
    pub name: String,
}

/// Payload for updating an existing user.
#[derive(Debug, Deserialize, Serialize, ToSchema, TS)]
#[ts(export)]
pub struct UpdateUserRequest {
    /// Updated email address (optional).
    pub email: Option<String>,
    /// Updated display name (optional).
    pub name: Option<String>,
}

// ──────────────────────────────────────────────
// Response DTOs
// ──────────────────────────────────────────────

/// Serialisable user representation returned by the API.
#[derive(Debug, Serialize, Deserialize, ToSchema, TS)]
#[ts(export)]
pub struct UserResponse {
    pub id: Uuid,
    pub email: String,
    pub name: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl From<User> for UserResponse {
    fn from(user: User) -> Self {
        Self {
            id: user.id,
            email: user.email,
            name: user.name,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }
    }
}
