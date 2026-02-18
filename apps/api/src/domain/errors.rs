use thiserror::Error;
use uuid::Uuid;

/// Domain-level errors representing business rule violations.
#[derive(Debug, Error)]
pub enum DomainError {
    #[error("Entity not found: {entity} with id {id}")]
    NotFound { entity: String, id: Uuid },

    #[error("Conflict: {message}")]
    Conflict { message: String },

    #[error("Validation error: {message}")]
    Validation { message: String },
}
