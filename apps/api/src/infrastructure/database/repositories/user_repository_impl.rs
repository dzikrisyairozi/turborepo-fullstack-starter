use async_trait::async_trait;
use sqlx::PgPool;
use uuid::Uuid;

use crate::domain::entities::user::User;
use crate::domain::errors::DomainError;
use crate::domain::repositories::user_repository::UserRepository;

/// PostgreSQL-backed implementation of `UserRepository`.
///
/// This is the infrastructure adapter that fulfils the domain's port.
#[derive(Clone)]
pub struct PgUserRepository {
    pool: PgPool,
}

impl PgUserRepository {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl UserRepository for PgUserRepository {
    async fn find_by_id(&self, id: Uuid) -> Result<Option<User>, DomainError> {
        let user = sqlx::query_as::<_, User>(
            "SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1",
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await
        .map_err(|e| DomainError::Validation {
            message: e.to_string(),
        })?;

        Ok(user)
    }

    async fn find_by_email(&self, email: &str) -> Result<Option<User>, DomainError> {
        let user = sqlx::query_as::<_, User>(
            "SELECT id, email, name, created_at, updated_at FROM users WHERE email = $1",
        )
        .bind(email)
        .fetch_optional(&self.pool)
        .await
        .map_err(|e| DomainError::Validation {
            message: e.to_string(),
        })?;

        Ok(user)
    }

    async fn find_all(&self) -> Result<Vec<User>, DomainError> {
        let users = sqlx::query_as::<_, User>(
            "SELECT id, email, name, created_at, updated_at FROM users ORDER BY created_at DESC",
        )
        .fetch_all(&self.pool)
        .await
        .map_err(|e| DomainError::Validation {
            message: e.to_string(),
        })?;

        Ok(users)
    }

    async fn create(&self, user: User) -> Result<User, DomainError> {
        let created = sqlx::query_as::<_, User>(
            r#"
            INSERT INTO users (id, email, name, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, name, created_at, updated_at
            "#,
        )
        .bind(user.id)
        .bind(&user.email)
        .bind(&user.name)
        .bind(user.created_at)
        .bind(user.updated_at)
        .fetch_one(&self.pool)
        .await
        .map_err(|e| DomainError::Validation {
            message: e.to_string(),
        })?;

        Ok(created)
    }

    async fn update(&self, user: User) -> Result<User, DomainError> {
        let updated = sqlx::query_as::<_, User>(
            r#"
            UPDATE users
            SET email = $2, name = $3, updated_at = $4
            WHERE id = $1
            RETURNING id, email, name, created_at, updated_at
            "#,
        )
        .bind(user.id)
        .bind(&user.email)
        .bind(&user.name)
        .bind(user.updated_at)
        .fetch_one(&self.pool)
        .await
        .map_err(|e| DomainError::Validation {
            message: e.to_string(),
        })?;

        Ok(updated)
    }

    async fn delete(&self, id: Uuid) -> Result<(), DomainError> {
        sqlx::query("DELETE FROM users WHERE id = $1")
            .bind(id)
            .execute(&self.pool)
            .await
            .map_err(|e| DomainError::Validation {
                message: e.to_string(),
            })?;

        Ok(())
    }
}
