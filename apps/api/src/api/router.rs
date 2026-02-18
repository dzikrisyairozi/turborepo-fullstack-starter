use axum::response::Html;
use axum::routing::get;
use axum::{Json, Router};
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};
use utoipa::OpenApi;

use crate::api::handlers::{health, user_handler};
use crate::api::middleware::middleware_stack;
use crate::api::openapi::ApiDoc;
use crate::application::services::user_service::UserService;

/// Build the complete Axum router with all routes, middleware, and OpenAPI docs.
pub fn create_router(user_service: Arc<UserService>) -> Router {
    // CORS configuration — permissive for local dev, tighten for production.
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // User CRUD routes.
    let user_routes = Router::new()
        .route(
            "/",
            get(user_handler::list_users).post(user_handler::create_user),
        )
        .route(
            "/{id}",
            get(user_handler::get_user)
                .put(user_handler::update_user)
                .delete(user_handler::delete_user),
        )
        .with_state(user_service);

    // Middleware layers.
    let (set_request_id, trace, propagate_request_id) = middleware_stack();

    // Merge everything.
    Router::new()
        // Health probe (no state needed).
        .route("/health", get(health::health_check))
        // User routes nested under /api/users.
        .nest("/api/users", user_routes)
        // OpenAPI spec endpoint.
        .route("/api-docs/openapi.json", get(openapi_json))
        // Scalar docs UI.
        .route("/docs", get(scalar_docs))
        // Middleware stack (request-id, tracing, etc.).
        .layer(set_request_id)
        .layer(trace)
        .layer(propagate_request_id)
        // CORS.
        .layer(cors)
}

/// Serve the OpenAPI JSON spec.
async fn openapi_json() -> Json<utoipa::openapi::OpenApi> {
    Json(ApiDoc::openapi())
}

/// Serve the Scalar API docs UI via CDN.
async fn scalar_docs() -> Html<&'static str> {
    Html(
        r#"<!doctype html>
<html>
  <head>
    <title>API Docs — Scalar</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script id="api-reference" data-url="/api-docs/openapi.json"></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>"#,
    )
}
