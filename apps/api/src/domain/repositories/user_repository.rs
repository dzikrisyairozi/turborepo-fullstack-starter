use async_trait::async_trait;
use uuid::Uuid;

use crate::domain::entities::user::User;
use crate::domain::errors::DomainError;

/// Repository trait (port) for User persistence.
///
/// This defines the contract that any persistence implementation must fulfill.
/// The domain layer depends only on this trait, never on concrete implementations.
#[async_trait]
pub trait UserRepository: Send + Sync {
    /// Find a user by their unique identifier.
    async fn find_by_id(&self, id: Uuid) -> Result<Option<User>, DomainError>;

    /// Find a user by their email address.
    async fn find_by_email(&self, email: &str) -> Result<Option<User>, DomainError>;

    /// Retrieve all users.
    async fn find_all(&self) -> Result<Vec<User>, DomainError>;

    /// Persist a new user.
    async fn create(&self, user: User) -> Result<User, DomainError>;

    /// Update an existing user.
    async fn update(&self, user: User) -> Result<User, DomainError>;

    /// Delete a user by their unique identifier.
    async fn delete(&self, id: Uuid) -> Result<(), DomainError>;
}
