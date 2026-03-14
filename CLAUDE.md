# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Root (runs across all workspaces via Turborepo)

```bash
pnpm dev              # Start all apps
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm lint:fix         # Auto-fix lint issues
pnpm type-check       # TypeScript type checking
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
pnpm check-all        # type-check + lint + format:check
pnpm test             # Run all tests
pnpm clean            # Clean build artifacts
```

### Per-app dev servers

```bash
pnpm dev:web          # Next.js web → http://localhost:3000
pnpm dev:api          # Rust API → http://localhost:3001
pnpm dev:docs         # Docs → http://localhost:3002
pnpm dev:dashboard    # Dashboard → http://localhost:5174
```

### Rust API (run inside `apps/api`)

```bash
cargo test            # Run tests
cargo test <name>     # Run a single test
cargo clippy -- -D warnings   # Lint
cargo check           # Fast compile check
```

### Database (from root)

```bash
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:reset         # Reset database
pnpm db:studio        # Open DB studio
```

### TypeScript type generation from Rust

```bash
pnpm db:generate      # Regenerates @repo/api-types from Rust structs (via ts-rs)
```

## Architecture

This is a **Turborepo + pnpm workspaces** monorepo with four apps and six shared packages.

### Apps

| App              | Tech                                               | Port |
| ---------------- | -------------------------------------------------- | ---- |
| `apps/web`       | Next.js 16, React 19, Three.js, Framer Motion      | 3000 |
| `apps/api`       | Rust, Axum, SQLx, PostgreSQL                       | 3001 |
| `apps/docs`      | Next.js 16, Fumadocs (MDX)                         | 3002 |
| `apps/dashboard` | Vite, React, TanStack Router, React Query, Zustand | 5174 |

### Shared Packages

| Package                   | Purpose                                                           |
| ------------------------- | ----------------------------------------------------------------- |
| `@repo/ui`                | 40+ shadcn/ui components (Radix UI + Tailwind)                    |
| `@repo/i18n`              | i18next config, provider, and locale files (English + Indonesian) |
| `@repo/api-types`         | TypeScript types auto-generated from Rust via `ts-rs`             |
| `@repo/tailwind-config`   | Shared Tailwind v4 theme and global CSS                           |
| `@repo/eslint-config`     | ESLint configs: `base`, `next-js`, `react-internal`               |
| `@repo/typescript-config` | TSConfigs: `base`, `nextjs`, `react-library`                      |

### Type Safety Pipeline (Rust → TypeScript)

The Rust API uses `ts-rs` macros to derive TypeScript types from Rust structs. Running `pnpm db:generate` exports these to `@repo/api-types`, which all frontend apps consume. When modifying Rust API types, regenerate before updating frontend code.

### Key Design Patterns

- **Frontend data fetching:** React Query for server state; Zustand for local/UI state
- **Routing (dashboard):** TanStack Router (file-based, type-safe)
- **Styling:** Tailwind CSS v4 shared via `@repo/tailwind-config`; components via `@repo/ui`
- **i18n:** Wrap apps in the `@repo/i18n` provider; add translations to both `en` and `id` locale files
- **API CORS:** Configured in Axum middleware; `NEXT_PUBLIC_API_URL` must be set in web `.env`

### Environment Variables

API (`apps/api/.env`):

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/monorepo_starter
HOST=0.0.0.0
PORT=3001
RUST_LOG=api=debug,tower_http=debug,sqlx=warn
```

Web (`apps/web/.env`):

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Commit Convention

This repo enforces [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

Husky runs lint-staged and commitlint on every commit. Do not use `--no-verify`.
