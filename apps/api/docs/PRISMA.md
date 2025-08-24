# Prisma Guide

This guide covers everything you need to know about using Prisma in this monorepo starter with shared database package.

## 🗄️ Database Setup

### 1. Choose Your Database

This starter supports multiple databases. Update your `packages/db/prisma/schema.prisma` provider if needed:

```prisma
datasource db {
  provider = "postgresql" // or "mysql", "sqlite", "mongodb"
  url      = env("DATABASE_URL")
}
```

### 2. Environment Configuration

Configure your database in both `apps/api/.env` and `packages/db/.env`:

**apps/api/.env:**

```bash
# PostgreSQL (Recommended for production)
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

**packages/db/.env:**

```bash
# PostgreSQL (Recommended for production)
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

# MySQL
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# SQLite (Great for development)
DATABASE_URL="file:./dev.db"
```

### 3. Database Connection

The starter uses a shared database package (`@repo/db`) with `PrismaService` that handles connection lifecycle:

```typescript
// Import from shared package
import { PrismaService } from '@repo/db';

// Automatically connects when app starts
// Automatically disconnects when app shuts down
```

## 📋 Schema Management

### Example Models

The starter includes example models you can modify or remove:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  posts Post[]

  @@map("users")
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId String

  @@map("posts")
}

enum Role {
  USER
  ADMIN
}
```

### Adding New Models

1. **Add model to schema** in `packages/db/prisma/schema.prisma`:

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  price       Float
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}
```

2. **Generate client** (from project root):

```bash
pnpm db:generate
```

3. **Create migration** (from project root):

```bash
pnpm db:migrate
```

## 🚀 Workflow Commands

### Development Workflow

```bash
# 1. Make schema changes in packages/db/prisma/schema.prisma
# 2. Generate Prisma client (from project root)
pnpm db:generate

# 3a. For prototyping - push schema directly
pnpm db:push

# 3b. For production - create proper migration
pnpm db:migrate

# 4. Seed with example data (optional)
pnpm db:seed
```

### Production Workflow

```bash
# 1. Create migration (from project root)
pnpm db:migrate

# 2. Deploy migration to production
# This happens automatically in CI/CD or run manually:
pnpm db:deploy
```

## 💾 Service Examples

### Basic CRUD Service

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/db';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Find all users with posts
  async findAll() {
    return this.prisma.user.findMany({
      include: { posts: true },
    });
  }

  // Find user by ID
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  // Create new user
  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  // Update user
  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete user
  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

### Advanced Queries

```typescript
// Complex filtering
async findPublishedPosts() {
  return this.prisma.post.findMany({
    where: {
      published: true,
      author: {
        role: 'USER',
      },
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

// Aggregations
async getUserStats() {
  return this.prisma.user.aggregate({
    _count: {
      posts: true,
    },
    _avg: {
      posts: {
        _count: true,
      },
    },
  });
}

// Transactions
async createUserWithPost(userData: any, postData: any) {
  return this.prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: userData,
    });

    const post = await tx.post.create({
      data: {
        ...postData,
        authorId: user.id,
      },
    });

    return { user, post };
  });
}
```

## 🔧 Customization

### Environment Variables

```bash
# Database connection
DATABASE_URL="your_database_url"

# Prisma Studio port
PRISMA_STUDIO_PORT=5555
```

### Schema Configuration

```prisma
generator client {
  provider      = "prisma-client-js"
  // For Docker support
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🧪 Testing

### Test Database Setup

1. **Create test database**:

```bash
# Add to packages/db/.env.test
DATABASE_URL="postgresql://username:password@localhost:5432/test_db"
```

2. **Test helper**:

```typescript
// test/helpers/database.ts
import { PrismaService } from '@repo/db';

export async function cleanDatabase(prisma: PrismaService) {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
}
```

3. **Integration test example**:

```typescript
import { Test } from '@nestjs/testing';
import { PrismaService } from '@repo/db';

describe('UsersService', () => {
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    await cleanDatabase(prisma);
  });

  // Your tests here...
});
```

## 🚀 Production Deployment

### Environment Variables

```bash
# Production database
DATABASE_URL="postgresql://username:password@host:5432/prod_db"

# Disable query logging in production
# Update prisma.service.ts constructor:
log: process.env.NODE_ENV === 'development' ? ['query'] : ['error']
```

### CI/CD Integration

The starter includes automatic Prisma client generation in CI/CD:

```yaml
# .github/workflows/ci.yml includes:
- name: Generate Prisma Client
  run: pnpm db:generate
```

### Migration Deployment

```bash
# In production deployment script:
pnpm db:deploy
```

## 🔍 Debugging

### Enable Query Logging

```typescript
// prisma.service.ts
super({
  log: ['query', 'info', 'warn', 'error'],
});
```

### Prisma Studio

```bash
# Open database GUI
pnpm db:studio
```

### Common Issues

1. **Connection Issues**:
   - Check DATABASE_URL format
   - Verify database is running
   - Check network connectivity

2. **Migration Issues**:
   - Run `pnpm db:generate` after schema changes
   - Check migration status: `pnpm db:status`

3. **Type Issues**:
   - Regenerate client: `pnpm db:generate`
   - Restart TypeScript server in IDE

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [NestJS + Prisma Guide](https://docs.nestjs.com/recipes/prisma)
- [Prisma Examples](https://github.com/prisma/prisma-examples)
