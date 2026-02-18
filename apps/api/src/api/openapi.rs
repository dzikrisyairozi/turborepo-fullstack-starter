use utoipa::OpenApi;

use crate::api::handlers::health::{self, HealthResponse};
use crate::api::handlers::user_handler;
use crate::application::dto::user_dto::{CreateUserRequest, UpdateUserRequest, UserResponse};

/// Root OpenAPI documentation struct.
///
/// All handler paths and schema types must be registered here
/// so they appear in the generated spec and the Scalar UI.
#[derive(OpenApi)]
#[openapi(
    info(
        title = "Turborepo Fullstack Starter API",
        version = "0.1.0",
        description = "A clean, DDD-driven REST API built with Axum and Rust.",
        license(name = "MIT")
    ),
    paths(
        health::health_check,
        user_handler::list_users,
        user_handler::get_user,
        user_handler::create_user,
        user_handler::update_user,
        user_handler::delete_user,
    ),
    components(
        schemas(
            HealthResponse,
            UserResponse,
            CreateUserRequest,
            UpdateUserRequest,
        )
    ),
    tags(
        (name = "Health", description = "Liveness & readiness probes"),
        (name = "Users", description = "User management endpoints"),
    )
)]
pub struct ApiDoc;
