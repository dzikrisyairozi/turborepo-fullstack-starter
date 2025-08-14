<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  
  <h1>NestJS TypeScript Prisma Starter</h1>
  
  <p>🚀 A production-ready starter template with NestJS, TypeScript, Prisma, and comprehensive development tools</p>

  <p>
    <a href="https://github.com/dzikrisyairozi/nest-ts-prisma-starter/actions/workflows/ci.yml">
    </a>
    <a href="https://github.com/dzikrisyairozi/nest-ts-prisma-starter/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
    </a>
    <a href="https://nodejs.org">
      <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg" alt="Node.js Version" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="TypeScript" />
    </a>
    <a href="https://nestjs.com">
      <img src="https://img.shields.io/badge/nestjs-11.x-red.svg" alt="NestJS" />
    </a>
    <a href="https://www.prisma.io">
      <img src="https://img.shields.io/badge/prisma-5.x-brightgreen.svg" alt="Prisma" />
    </a>
    <a href="https://pnpm.io">
      <img src="https://img.shields.io/badge/pnpm-8.x-orange.svg" alt="pnpm" />
    </a>
  </p>
</div>

A production-ready [NestJS](https://github.com/nestjs/nest) starter template with TypeScript, Prisma, and comprehensive development tools. Built for modern web applications with best practices, automated quality checks, and complete CI/CD pipeline.

## ✨ Features

- 🚀 **NestJS** - Progressive Node.js framework
- 🔷 **TypeScript** - Type-safe development
- 🗄️ **Prisma** - Modern database toolkit with PostgreSQL/MySQL/SQLite support
- 📚 **Swagger/OpenAPI** - Auto-generated API documentation
- 🎨 **Prettier** - Code formatting
- 🔍 **ESLint** - Code linting with TypeScript support
- 🐕 **Husky** - Git hooks for automated quality checks
- 📝 **Commitlint** - Conventional commit message linting
- 🚀 **Lint-staged** - Run linters on staged files
- ⚡ **pnpm** - Fast, disk space efficient package manager
- 🔧 **VSCode** - Pre-configured settings and extensions
- 🧪 **Jest** - Testing framework with E2E tests
- 🔄 **GitHub Actions** - Comprehensive CI/CD pipeline
- 🐳 **Docker** - Container support

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Database** (PostgreSQL/MySQL/SQLite)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dzikrisyairozi/nest-ts-prisma-starter.git
   cd nest-ts-prisma-starter
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment**:

   ```bash
   cp env.example .env
   # Edit .env with your database configuration
   ```

4. **Set up database**:

   ```bash
   # Generate Prisma client
   pnpm run db:generate

   # Push schema to database
   pnpm run db:push

   # Seed with example data (optional)
   pnpm run db:seed
   ```

5. **Start development**:

   ```bash
   # Development mode with hot reload
   pnpm run start:dev
   ```

6. **Access the application**:
   - **API**: http://localhost:3000
   - **Swagger UI**: http://localhost:3000/api

### Additional Commands

````bash
# Production build
pnpm run build

# Production mode
pnpm run start:prod

# Development mode
pnpm run start:dev

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
````

## Database (Prisma)

This starter includes a complete Prisma setup with PostgreSQL as the default database. You can easily switch to other databases.

### 🗄️ **Database Setup**

1. **Create a database** (PostgreSQL, MySQL, or SQLite)
2. **Copy environment file**:
   ```bash
   cp .env.example .env
   ```
3. **Update DATABASE_URL** in `.env`:

   ```bash
   # PostgreSQL (recommended)
   DATABASE_URL="postgresql://username:password@localhost:5432/nest_starter?schema=public"

   # MySQL
   DATABASE_URL="mysql://username:password@localhost:3306/nest_starter"

   # SQLite (for development)
   DATABASE_URL="file:./dev.db"
   ```

### 🚀 **Prisma Commands**

```bash
# Generate Prisma client
$ pnpm run db:generate

# Push schema changes to database (for prototyping)
$ pnpm run db:push

# Create and run migrations (for production)
$ pnpm run db:migrate

# Open Prisma Studio (database GUI)
$ pnpm run db:studio

# Seed database with example data
$ pnpm run db:seed

# Reset database (⚠️ deletes all data)
$ pnpm run db:reset
```

### 📋 **Example Models**

The starter includes example `User` and `Post` models with relationships:

```typescript
// Example usage in a service
async findUsers() {
  return this.prisma.user.findMany({
    include: {
      posts: true,
    },
  });
}
```

See `src/users/users.service.ts` for complete CRUD examples.

### 🔧 **Customizing the Schema**

1. **Edit** `prisma/schema.prisma`
2. **Add your models** (follow the examples)
3. **Generate client**: `pnpm run db:generate`
4. **Create migration**: `pnpm run db:migrate`

## API Documentation (Swagger/OpenAPI)

This starter includes a comprehensive Swagger OpenAPI setup for automatic API documentation generation.

### 📚 **Quick Access**

- **Swagger UI**: http://localhost:3000/api (when running locally)
- **OpenAPI JSON**: http://localhost:3000/api-json

### ✨ **Features**

- 🔄 **Automatic Documentation**: All endpoints are automatically documented
- 🖥️ **Interactive UI**: Test APIs directly from the browser
- 🔐 **Authentication Support**: JWT Bearer token and API Key authentication
- 📝 **Response Examples**: Comprehensive examples for all responses
- ✅ **Validation Integration**: DTOs with validation automatically documented
- 🌍 **Multi-Environment**: Adapts to development, staging, and production

### 🚀 **Example Usage**

```typescript
// Controller with Swagger decorators
@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}

// DTO with validation and documentation
export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'dzikri@syairozi.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Dzikri Syairozi',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
}
```

### 🧪 **Try It Out**

1. Start the application: `pnpm run start:dev`
2. Open http://localhost:3000/api in your browser
3. Explore the Users API endpoints
4. Click "Authorize" to test protected endpoints
5. Try the example requests with provided data

For detailed documentation, examples, and customization guide, see [docs/SWAGGER.md](docs/SWAGGER.md).

## Development Tools

### Code Quality & Formatting

```bash
# Format code with Prettier
$ pnpm run format

# Check formatting without fixing
$ pnpm run format:check

# Lint and fix code with ESLint
$ pnpm run lint

# Check linting without fixing
$ pnpm run lint:check

# Type checking
$ pnpm run type-check
```

### Git Hooks (Husky)

This project includes several automated git hooks:

- **commit-msg**: Validates commit messages using commitlint
- **pre-commit**: Runs lint-staged (formatting and linting on staged files)
- **pre-push**: Runs type checking, linting, and tests before pushing
- **post-merge**: Automatically installs dependencies if package files changed

### Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools
- `perf`: A code change that improves performance
- `ci`: Changes to CI configuration files and scripts
- `build`: Changes that affect the build system or external dependencies
- `revert`: Reverts a previous commit

**Examples:**

```bash
feat: add user authentication
fix: resolve memory leak in data processing
docs: update API documentation
```

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline using GitHub Actions:

### 🔄 **Single CI/CD Pipeline** (.github/workflows/ci.yml)

- **Triggers**: Push to main branch, Pull requests
- **All-in-One**: Quality checks, testing, security, build, and deploy in single job
- **Quality Checks**: Type checking, linting, formatting validation
- **Testing**: Unit tests, E2E tests, coverage reports
- **Security**: Dependency audit, CodeQL analysis
- **Build**: Application build and artifact upload
- **Deploy**: Staging and production deployments

### 🚀 **Release Management** (.github/workflows/release.yml)

- **Triggers**: Git tags (v\*)
- **Automated Releases**: GitHub releases with changelogs
- **Docker Images**: Container builds for deployment
- **Production Deploy**: Automatic production deployment

### 🤖 **Dependency Management** (.github/dependabot.yml)

- **Weekly Updates**: Single PR per week with all updates
- **Comprehensive**: All dependencies updated together
- **Security Updates**: Automatic security patches

### 🛡️ **Security Features**

- CodeQL security scanning
- Dependency vulnerability checks
- Branch protection rules
- Environment-based deployments with approvals

### 📊 **Monitoring & Notifications**

- Test coverage reports (Codecov integration)
- Slack notifications for deployments
- Build status badges
- Performance tracking

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- 🐛 Reporting bugs
- 💡 Suggesting enhancements
- 🔀 Submitting pull requests
- 📝 Improving documentation

### Contributors

Thanks to all the amazing contributors who help make this project better! 🙏

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Contact

- **Author**: [Dzikri Syairozi](https://github.com/dzikrisyairozi)
- **Email**: dzikrisyairozi@gmail.com
- **Issues**: [GitHub Issues](https://github.com/dzikrisyairozi/nest-ts-prisma-starter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dzikrisyairozi/nest-ts-prisma-starter/discussions)

## ⭐ Show Your Support

If this project helped you, please give it a ⭐! It helps others discover this project.

---

**Built with ❤️ by [Dzikri Syairozi](https://github.com/dzikrisyairozi)**
