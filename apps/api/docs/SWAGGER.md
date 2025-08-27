# Swagger OpenAPI Documentation

This starter project includes a comprehensive Swagger OpenAPI setup for automatic API documentation generation.

## 🚀 Quick Start

1. **Start the application:**

   ```bash
   pnpm run start:dev
   ```

2. **Access Swagger UI:**
   Open your browser and navigate to: http://localhost:3000/docs

3. **View OpenAPI JSON:**
   Get the raw OpenAPI specification at: http://localhost:3000/api-json

## 📋 Features

### Core Setup

- **Automatic Documentation**: All endpoints are automatically documented
- **Interactive UI**: Test APIs directly from the browser
- **Authentication Support**: JWT Bearer token and API Key authentication
- **Response Examples**: Comprehensive examples for all responses
- **Validation Integration**: DTOs with validation automatically documented

### Authentication

The Swagger UI includes two authentication methods:

1. **JWT Bearer Token** (`JWT-auth`)
   - Click the "Authorize" button in Swagger UI
   - Enter your JWT token (without "Bearer " prefix)
   - All requests will include the Authorization header

2. **API Key** (`api-key`)
   - Custom header: `X-API-Key`
   - For external integrations and service-to-service communication

### Environment Configuration

The Swagger setup adapts to different environments:

- **Development**: Shows all servers and features
- **Production**: Restricts CORS and shows production servers only
- **Customizable**: Easy to modify server URLs and settings

## 🏗️ Architecture

### File Structure

```
src/
├── main.ts                    # Swagger configuration
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts # Input validation + Swagger
│   │   ├── update-user.dto.ts # Partial type with Swagger
│   │   └── user-response.dto.ts # Response documentation
│   ├── users.controller.ts    # API endpoints with Swagger decorators
│   └── users.service.ts       # Business logic (mock implementation)
└── common/
    └── dto/
        └── pagination.dto.ts  # Reusable pagination DTO
```

### Key Decorators

#### Controller Level

```typescript
@ApiTags('Users')              // Groups endpoints in Swagger UI
@ApiBearerAuth('JWT-auth')     // Requires JWT authentication
@Controller('users')
```

#### Method Level

```typescript
@ApiOperation({
  summary: 'Create a new user',
  description: 'Creates a new user in the system'
})
@ApiCreatedResponse({
  description: 'User created successfully',
  type: UserResponseDto
})
@ApiBadRequestResponse({
  description: 'Invalid input data'
})
```

#### DTO Level

```typescript
@ApiProperty({
  description: 'User email address',
  example: 'dzikri@syairozi.com',
  format: 'email'
})
@IsEmail()
email: string;
```

## 📚 Examples

### Basic Endpoint Documentation

```typescript
@Get(':id')
@ApiOperation({
  summary: 'Get user by ID',
  description: 'Retrieves a specific user by their ID'
})
@ApiParam({
  name: 'id',
  description: 'User ID',
  example: 1,
  type: 'number'
})
@ApiOkResponse({
  description: 'User found successfully',
  type: UserResponseDto
})
@ApiNotFoundResponse({
  description: 'User not found',
  schema: {
    example: {
      statusCode: 404,
      message: 'User with ID 1 not found',
      error: 'Not Found'
    }
  }
})
findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
  return this.usersService.findOne(id);
}
```

### DTO with Validation

```typescript
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

### Pagination Response

```typescript
@ApiOkResponse({
  description: 'Users retrieved successfully',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/UserResponseDto' }
      },
      meta: {
        type: 'object',
        properties: {
          total: { type: 'number', example: 100 },
          page: { type: 'number', example: 1 },
          limit: { type: 'number', example: 10 },
          totalPages: { type: 'number', example: 10 }
        }
      }
    }
  }
})
```

## 🔧 Customization

### Changing Server URLs

Update the servers in `src/main.ts`:

```typescript
.addServer('http://localhost:3000', 'Development server')
.addServer('https://your-staging-api.com', 'Staging server')
.addServer('https://your-production-api.com', 'Production server')
```

### Custom Styling

Modify the `customCss` in `src/main.ts` to change the Swagger UI appearance:

```typescript
customCss: `
  .swagger-ui .topbar { background-color: #your-color; }
  .swagger-ui .info .title { color: #your-color; }
`;
```

### Adding New Authentication Methods

```typescript
.addApiKey({
  type: 'apiKey',
  name: 'X-Custom-Header',
  in: 'header',
  description: 'Custom authentication header'
}, 'custom-auth')
```

## 🧪 Testing with Swagger UI

1. **Navigate to the Swagger UI**: http://localhost:3000/api

2. **Try the Users API**:
   - Expand the "Users" section
   - Try the GET `/users` endpoint to see paginated results
   - Try POST `/users` to create a new user
   - Use the example payloads provided

3. **Test Authentication**:
   - Click "Authorize" button
   - Enter a test JWT token (the mock service doesn't validate it)
   - Notice the lock icons appear on protected endpoints

## 🚀 Next Steps

### Replace Mock Data with Prisma

Replace the mock implementation in `UsersService` with actual Prisma calls:

```typescript
// Instead of mock data
async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
  return this.prisma.user.create({
    data: createUserDto
  });
}

async findAll(paginationDto: PaginationDto) {
  const { page, limit, skip } = paginationDto;

  const [data, total] = await Promise.all([
    this.prisma.user.findMany({
      skip,
      take: limit
    }),
    this.prisma.user.count()
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}
```

### Add Real Authentication

Implement JWT authentication with guards and decorators:

```typescript
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  // Your endpoints here
}
```

### Schema Validation

Add more sophisticated validation with custom decorators:

```typescript
@ApiProperty({
  description: 'Strong password',
  example: 'MyStr0ngP@ssw0rd',
  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
})
@IsString()
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  message: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'
})
password: string;
```

## 📖 Additional Resources

- [NestJS OpenAPI Documentation](https://docs.nestjs.com/openapi/introduction)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
- [Class Validator Decorators](https://github.com/typestack/class-validator)
- [Class Transformer Documentation](https://github.com/typestack/class-transformer)
