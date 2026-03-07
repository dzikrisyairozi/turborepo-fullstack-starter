# 🚀 Monorepo Full-Stack Starter

A modern, production-ready full-stack starter built with Turborepo, featuring Next.js, NestJS, and a comprehensive shadcn/ui component library.

## ✨ Features

- 🏗️ **Turborepo** - High-performance build system for JavaScript/TypeScript monorepos
- ⚡ **Next.js 15** - React framework with App Router for Web & Docs
- 🦀 **Rust** - High-performance backend API with Actix-Web and SQLx
- 🛠️ **Vite & React** - Fast admin dashboard
- 🎨 **shadcn/ui** - Beautiful, accessible UI components built with Radix UI and Tailwind CSS
- 🎯 **TypeScript** - Full type safety across all frontend applications
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach with dark/light mode support
- 🔧 **Developer Experience** - ESLint, Prettier, Husky, and Commitlint pre-configured
- 🐳 **Docker Ready** - Containerization support for easy deployment
- 🔄 **CI/CD** - GitHub Actions workflows included

## 📦 What's Inside?

This Monorepo includes the following packages and apps:

### Apps

- **`api`** - Rust backend API (Actix-Web + SQLx)
- **`dashboard`** - Admin dashboard (Vite + React)
- **`docs`** - Documentation site (Next.js + Fumadocs)
- **`web`** - Premium landing page (Next.js + React Three Fiber)

### Packages

- **`@repo/api-types`** - Auto-generated TS types from the Rust API
- **`@repo/ui`** - Shared React component library
- **`@repo/eslint-config`** - Shared ESLint configurations
- **`@repo/tailwind-config`** - Shared Tailwind CSS theme
- **`@repo/typescript-config`** - Shared TypeScript configurations

### Tools & Configuration

- **TypeScript** - Static type checking across all packages
- **ESLint** - Code linting with custom rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **Commitlint** - Conventional commit message linting
- **Tailwind CSS** - Utility-first styling
- **Rust/Cargo** - Backend language and package manager
- **Docker** - Containerization support

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22+
- **pnpm** (recommended package manager)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd monorepo-fullstack-starter
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy environment files
   cp apps/api/.env.example apps/api/.env
   # Make sure to update your DATABASE_URL in apps/api/.env
   ```

4. **Set up the database** (if using the API)
   ```bash
   cd apps/api
   cargo sqlx database setup
   cd ../..
   ```

### Development

**Start all applications:**

```bash
pnpm dev
```

**Start specific applications:**

```bash
# Frontend only
pnpm dev:web

# Dashboard only
pnpm dev:dashboard

# Backend only
pnpm dev:api

# Documentation
pnpm dev:docs
```

**Access your applications:**

- 🌐 **Web App**: http://localhost:3000
- 🔧 **API**: http://localhost:3001
- 📚 **Docs**: http://localhost:3002
- 📊 **Dashboard**: http://localhost:5174

### Build

**Build all packages:**

```bash
pnpm build
```

**Build specific packages:**

```bash
pnpm build --filter=web
pnpm build --filter=@repo/dashboard
pnpm build --filter=api
pnpm build --filter=docs
```

## 🧩 Component Library

The `@repo/ui` package includes 40+ pre-built components from shadcn/ui:

### Layout Components

- **Card** - Flexible content containers
- **Separator** - Visual dividers
- **Aspect Ratio** - Maintain aspect ratios
- **Container** - Responsive containers

### Form Components

- **Button** - Various button styles and sizes
- **Input** - Text inputs with validation
- **Textarea** - Multi-line text inputs
- **Select** - Dropdown selections
- **Checkbox** - Boolean inputs
- **Radio Group** - Single selection from options
- **Switch** - Toggle switches
- **Slider** - Range inputs

### Navigation

- **Navigation Menu** - Complex navigation structures
- **Breadcrumb** - Hierarchical navigation
- **Pagination** - Page navigation
- **Menubar** - Application menus

### Feedback

- **Alert** - Important messages
- **Toast** - Temporary notifications
- **Progress** - Loading indicators
- **Skeleton** - Loading placeholders

### Overlay

- **Dialog** - Modal dialogs
- **Drawer** - Slide-out panels
- **Popover** - Contextual overlays
- **Tooltip** - Helpful hints
- **Sheet** - Side panels
- **Hover Card** - Rich hover content

### Data Display

- **Table** - Data tables
- **Badge** - Status indicators
- **Avatar** - User representations
- **Calendar** - Date selection
- **Chart** - Data visualizations

## 🛠️ Development Scripts

```bash
# Development
pnpm dev              # Start all apps in development
pnpm dev:web          # Start web app only
pnpm dev:dashboard    # Start dashboard only
pnpm dev:api          # Start API only
pnpm dev:docs         # Start docs only

# Building
pnpm build            # Build all packages
pnpm build:web        # Build web app only
pnpm build:dashboard  # Build dashboard only
pnpm build:api        # Build API only
pnpm build:docs       # Build docs only

# Code Quality
pnpm lint             # Lint all packages
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code with Prettier
pnpm type-check       # Run TypeScript checks

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode

# Database (API)
cd apps/api
cargo sqlx database setup # Run migrations
cargo sqlx prepare        # Prepare query metadata
cd ../..
```

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build Docker image
docker build -t turborepo-starter .

# Run container
docker run -p 3000:3000 turborepo-starter
```

## 🔧 Configuration

### Environment Variables

**Web App (`apps/web/.env`)**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Database/API (`apps/api/.env`)**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="your-jwt-secret"
```

### Customization

- **Theme**: Modify `packages/tailwind-config/theme.css` for custom themes (if configured)
- **Components**: Add new components to `packages/ui/src/`
- **API Routes**: Add endpoints in `apps/api/src/`
- **Database**: Update schema via migrations in `apps/api/migrations`

## 🚢 Deployment

### Vercel (Recommended for Frontend)

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `pnpm build --filter=web`
   - Output Directory: `apps/web/.next`
3. **Set environment variables** in Vercel dashboard
4. **Deploy** 🚀

### Docker Deployment

```bash
# Build production image
docker build -t turborepo-starter .

# Run in production
docker run -p 3000:3000 -e NODE_ENV=production turborepo-starter
```

### Railway/Render (API)

1. **Connect your repository**
2. **Environment**: Select Rust
3. **Set build command**: `cargo build --release`
4. **Set start command**: `./target/release/api`
5. **Configure environment variables**

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feat/amazing-feature`
3. **Make your changes**
4. **Run tests**: `pnpm test`
5. **Commit**: `git commit -m "feat: add amazing feature"`
6. **Push**: `git push origin feat/amazing-feature`
7. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turborepo.com/) - The build system that powers this monorepo
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible UI components
- [Next.js](https://nextjs.org/) - The React framework for production
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Actix-Web](https://actix.rs/) - A powerful, pragmatic, and extremely fast web framework for Rust
- [SQLx](https://github.com/launchbadge/sqlx) - The Rust SQL Toolkit
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

## 📚 Learn More

### Documentation

- [Turborepo Docs](https://turborepo.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vite Docs](https://vitejs.dev/guide/)
- [Actix-Web Docs](https://actix.rs/docs/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Turborepo Features

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)

---

<div align="center">

**[⭐ Star this repo](https://github.com/dzikrisyairozi/monorepo-fullstack-starter)** • **[🐛 Report Bug](https://github.com/dzikrisyairozi/monorepo-fullstack-starter/issues)** • **[✨ Request Feature](https://github.com/dzikrisyairozi/monorepo-fullstack-starter/issues)**

Made with ❤️ by @dzikrisyairozi

</div>
