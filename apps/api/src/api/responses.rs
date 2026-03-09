use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde::Serialize;
use utoipa::ToSchema;

use crate::domain::errors::DomainError;

// ──────────────────────────────────────────────
// Unified success wrapper
// ──────────────────────────────────────────────

/// Generic API response envelope.
#[derive(Debug, Serialize, ToSchema)]
pub struct ApiResponse<T: Serialize> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<String>,
}

impl<T: Serialize> ApiResponse<T> {
    pub fn success(data: T) -> Self {
        Self {
            success: true,
            data: Some(data),
            error: None,
        }
    }
}

// ──────────────────────────────────────────────
// Error handling
// ──────────────────────────────────────────────

/// API error type that converts domain errors to HTTP responses.
#[derive(Debug)]
pub struct ApiError(DomainError);

impl From<DomainError> for ApiError {
    fn from(err: DomainError) -> Self {
        Self(err)
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, message) = match &self.0 {
            DomainError::NotFound { .. } => (StatusCode::NOT_FOUND, self.0.to_string()),
            DomainError::Conflict { .. } => (StatusCode::CONFLICT, self.0.to_string()),
            DomainError::Validation { .. } => (StatusCode::BAD_REQUEST, self.0.to_string()),
        };

        let body = ApiResponse::<()> {
            success: false,
            data: None,
            error: Some(message),
        };

        (status, Json(body)).into_response()
    }
}
