use axum::http::HeaderName;
use tower_http::request_id::{MakeRequestUuid, PropagateRequestIdLayer, SetRequestIdLayer};
use tower_http::trace::TraceLayer;

/// The header used to propagate request IDs.
static X_REQUEST_ID: HeaderName = HeaderName::from_static("x-request-id");

/// Build the shared middleware stack.
///
/// Order (outermost → innermost):
/// 1. Set a unique `x-request-id` on every request.
/// 2. Tracing span per request (uses the request-id).
/// 3. Propagate the `x-request-id` to the response.
pub fn middleware_stack(
) -> (
    SetRequestIdLayer<MakeRequestUuid>,
    TraceLayer<tower_http::classify::SharedClassifier<tower_http::classify::ServerErrorsAsFailures>>,
    PropagateRequestIdLayer,
) {
    (
        SetRequestIdLayer::new(X_REQUEST_ID.clone(), MakeRequestUuid),
        TraceLayer::new_for_http(),
        PropagateRequestIdLayer::new(X_REQUEST_ID.clone()),
    )
}
