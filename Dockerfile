# Build stage for Rust API
FROM rust:1.80-slim AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y pkg-config libssl-dev

WORKDIR /usr/src/app
# Copy the entire monorepo
COPY . .

# Build the Rust API
WORKDIR /usr/src/app/apps/api
RUN cargo build --release

# Production stage
FROM debian:bookworm-slim AS production

# Install OpenSSL and ca-certificates for network requests
RUN apt-get update && apt-get install -y openssl ca-certificates curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the compiled binary from builder
COPY --from=builder /usr/src/app/apps/api/target/release/api ./api

# Create non-root user
RUN groupadd -g 1001 appuser && \
    useradd -r -u 1001 -g appuser appuser

# Change ownership of the app directory
RUN chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Start the API application
CMD ["./api"]