use axum::extract::{Path, State};
use axum::Json;
use uuid::Uuid;

use crate::api::responses::{ApiError, ApiResponse};
use crate::application::dto::user_dto::{CreateUserRequest, UpdateUserRequest, UserResponse};
use crate::application::services::user_service::UserService;
use std::sync::Arc;

// ──────────────────────────────────────────────
// Handlers
// ──────────────────────────────────────────────

/// `GET /api/users` — list all users.
#[utoipa::path(
    get,
    path = "/api/users",
    tag = "Users",
    responses(
        (status = 200, description = "List of users", body = Vec<UserResponse>)
    )
)]
pub async fn list_users(
    State(service): State<Arc<UserService>>,
) -> Result<Json<ApiResponse<Vec<UserResponse>>>, ApiError> {
    let users = service.list_users().await?;
    Ok(Json(ApiResponse::success(users)))
}

/// `GET /api/users/:id` — get a single user.
#[utoipa::path(
    get,
    path = "/api/users/{id}",
    tag = "Users",
    params(
        ("id" = Uuid, Path, description = "User ID")
    ),
    responses(
        (status = 200, description = "User found", body = UserResponse),
        (status = 404, description = "User not found")
    )
)]
pub async fn get_user(
    State(service): State<Arc<UserService>>,
    Path(id): Path<Uuid>,
) -> Result<Json<ApiResponse<UserResponse>>, ApiError> {
    let user = service.get_user(id).await?;
    Ok(Json(ApiResponse::success(user)))
}

/// `POST /api/users` — create a new user.
#[utoipa::path(
    post,
    path = "/api/users",
    tag = "Users",
    request_body = CreateUserRequest,
    responses(
        (status = 201, description = "User created", body = UserResponse),
        (status = 409, description = "Email already exists")
    )
)]
pub async fn create_user(
    State(service): State<Arc<UserService>>,
    Json(payload): Json<CreateUserRequest>,
) -> Result<Json<ApiResponse<UserResponse>>, ApiError> {
    let user = service.create_user(payload).await?;
    Ok(Json(ApiResponse::success(user)))
}

/// `PUT /api/users/:id` — update a user.
#[utoipa::path(
    put,
    path = "/api/users/{id}",
    tag = "Users",
    params(
        ("id" = Uuid, Path, description = "User ID")
    ),
    request_body = UpdateUserRequest,
    responses(
        (status = 200, description = "User updated", body = UserResponse),
        (status = 404, description = "User not found"),
        (status = 409, description = "Email already exists")
    )
)]
pub async fn update_user(
    State(service): State<Arc<UserService>>,
    Path(id): Path<Uuid>,
    Json(payload): Json<UpdateUserRequest>,
) -> Result<Json<ApiResponse<UserResponse>>, ApiError> {
    let user = service.update_user(id, payload).await?;
    Ok(Json(ApiResponse::success(user)))
}

/// `DELETE /api/users/:id` — delete a user.
#[utoipa::path(
    delete,
    path = "/api/users/{id}",
    tag = "Users",
    params(
        ("id" = Uuid, Path, description = "User ID")
    ),
    responses(
        (status = 200, description = "User deleted"),
        (status = 404, description = "User not found")
    )
)]
pub async fn delete_user(
    State(service): State<Arc<UserService>>,
    Path(id): Path<Uuid>,
) -> Result<Json<ApiResponse<()>>, ApiError> {
    service.delete_user(id).await?;
    Ok(Json(ApiResponse::success(())))
}
