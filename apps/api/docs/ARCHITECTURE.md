# Architecture Documentation

## Overview

This project implements **Domain-Driven Design (DDD)** architecture to provide a robust, maintainable, and scalable foundation for complex business applications. The architecture is organized into distinct layers with clear separation of concerns and dependency direction.

## Domain-Driven Design (DDD) Architecture

### Architecture Layers

The project follows a 4-layer DDD architecture:

```
┌─────────────────────────────────────┐
│           Presentation Layer        │  ← Controllers, DTOs, HTTP concerns
├─────────────────────────────────────┤
│           Application Layer         │  ← Use cases, orchestration, events
├─────────────────────────────────────┤
│             Domain Layer            │  ← Business logic, entities, rules
├─────────────────────────────────────┤
│         Infrastructure Layer        │  ← Database, external services
└─────────────────────────────────────┘
```

### 1. Domain Layer (`src/users/domain/`)

The **core** of the application containing pure business logic.

#### Components:

- **Entities** (`entities/`): Rich domain objects with business logic and invariants
  - `User`: Core business entity with validation and business rules
- **Value Objects** (`value-objects/`): Immutable objects representing domain concepts
  - `UserId`: Unique identifier with validation
  - `Email`: Email address with format validation
  - `UserName`: User name with business rules
  - `UserRole`: User role enumeration
- **Repository Interfaces** (`repositories/`): Contracts for data persistence
  - `UserRepositoryInterface`: Defines data access operations
- **Domain Services** (`services/`): Complex business logic that doesn't belong to entities
  - `UserDomainService`: Email uniqueness validation, business rule enforcement
- **Domain Events** (`events/`): Events representing important business occurrences
  - `UserCreated`, `UserUpdated`, `UserDeleted`: Domain state changes

#### Key Principles:

- **No dependencies** on outer layers
- Contains **pure business logic**
- **Framework agnostic**
- **Highly testable**

### 2. Application Layer (`src/users/application/`)

Orchestrates domain operations and coordinates between layers.

#### Components:

- **Application Services** (`services/`): Use case implementations
  - `UserApplicationService`: Coordinates user operations, handles transactions
- **DTOs** (`dtos/`): Data transfer objects for application boundaries
  - Input/output contracts for use cases
- **Event Handlers** (`event-handlers/`): Handle domain events
  - `UserCreatedHandler`, `UserUpdatedHandler`, `UserDeletedHandler`

#### Responsibilities:

- **Use case orchestration**
- **Transaction management**
- **Event handling**
- **Cross-cutting concerns**

### 3. Infrastructure Layer (`src/users/infrastructure/`)

Provides concrete implementations of domain contracts.

#### Components:

- **Repository Implementations** (`repositories/`)
  - `PrismaUserRepository`: Database persistence using Prisma ORM
  - `MockUserRepository`: In-memory implementation for testing

#### Responsibilities:

- **Data persistence**
- **External service integration**
- **Framework-specific implementations**

### 4. Presentation Layer (`src/users/presentation/`)

Handles HTTP requests and user interface concerns.

#### Components:

- **Controllers**: HTTP request/response handling
  - `UsersController`: REST API endpoints
- **DTOs**: Request/response data structures
  - `CreateUserDto`, `UpdateUserDto`, `UserResponseDto`

#### Responsibilities:

- **HTTP request handling**
- **Input validation**
- **Response formatting**
- **API documentation**

## Dependency Direction

```
Presentation → Application → Domain ← Infrastructure
```

- **Presentation** depends on **Application**
- **Application** depends on **Domain**
- **Infrastructure** depends on **Domain** (implements domain contracts)
- **Domain** has **no dependencies** on other layers

## Benefits of DDD Architecture

### 1. **Separation of Concerns**

- Clear boundaries between business logic and technical concerns
- Each layer has a single responsibility

### 2. **Testability**

- Domain logic is framework-agnostic and easily testable
- Mock implementations for testing without database

### 3. **Maintainability**

- Changes in one layer don't affect others
- Business logic is centralized and protected

### 4. **Flexibility**

- Easy to swap implementations (e.g., database, external services)
- Framework independence

### 5. **Scalability**

- Clear structure for growing complex applications
- Event-driven architecture for loose coupling

## Implementation Example

### User Creation Flow

1. **Presentation**: `UsersController` receives HTTP POST request
2. **Application**: `UserApplicationService.createUser()` orchestrates the operation
3. **Domain**:
   - `UserDomainService` validates business rules (email uniqueness)
   - `User.create()` creates domain entity with validation
   - `UserCreated` event is raised
4. **Infrastructure**: `PrismaUserRepository` persists to database
5. **Application**: `UserCreatedHandler` handles side effects (notifications, etc.)

## File Structure

```
src/users/
├── domain/
│   ├── entities/
│   │   └── user.entity.ts
│   ├── value-objects/
│   │   ├── user-id.value-object.ts
│   │   ├── email.value-object.ts
│   │   ├── user-name.value-object.ts
│   │   └── user-role.value-object.ts
│   ├── repositories/
│   │   └── user.repository.interface.ts
│   ├── services/
│   │   └── user-domain.service.ts
│   └── events/
│       ├── user-created.event.ts
│       ├── user-updated.event.ts
│       └── user-deleted.event.ts
├── application/
│   ├── services/
│   │   └── user-application.service.ts
│   ├── dtos/
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   └── user-response.dto.ts
│   └── event-handlers/
│       ├── user-created.handler.ts
│       ├── user-updated.handler.ts
│       └── user-deleted.handler.ts
├── infrastructure/
│   └── repositories/
│       ├── prisma-user.repository.ts
│       └── mock-user.repository.ts
├── presentation/
│   ├── users.controller.ts
│   └── dtos/
│       ├── create-user.dto.ts
│       ├── update-user.dto.ts
│       ├── user-response.dto.ts
│       └── user-id-param.dto.ts
└── users.module.ts
```

## When to Choose DDD vs Traditional Layered Architecture

### Choose **Domain-Driven Design** when:

✅ **Complex Business Logic**

- Rich business rules and domain concepts
- Complex validation and business invariants
- Multiple business workflows and use cases

✅ **Long-term Projects**

- Applications expected to grow and evolve
- Multiple developers working on the codebase
- Need for maintainability over time

✅ **Domain Expertise Required**

- Business domain is complex and requires deep understanding
- Frequent changes in business requirements
- Need for ubiquitous language between developers and domain experts

✅ **Event-Driven Requirements**

- Need for loose coupling between components
- Integration with multiple systems
- Audit trails and event sourcing

### Choose **Traditional Layered Architecture** when:

✅ **Simple CRUD Operations**

- Basic create, read, update, delete operations
- Minimal business logic
- Straightforward data manipulation

✅ **Small Projects**

- Prototypes or proof-of-concepts
- Small team (1-3 developers)
- Short development timeline

✅ **Limited Resources**

- Tight deadlines
- Junior development team
- Simple requirements that won't change much

✅ **Data-Centric Applications**

- Reporting applications
- Data transformation tools
- Simple APIs with minimal business logic

### Traditional Layered Structure Example:

```
src/users/
├── controllers/
│   └── users.controller.ts
├── services/
│   └── users.service.ts
├── repositories/
│   └── users.repository.ts
├── entities/
│   └── user.entity.ts
└── dtos/
    ├── create-user.dto.ts
    └── update-user.dto.ts
```

## Migration Path

### From Traditional to DDD:

1. **Extract Value Objects** from primitive types
2. **Move Business Logic** from services to domain entities
3. **Create Repository Interfaces** in domain layer
4. **Implement Domain Services** for complex business rules
5. **Add Domain Events** for decoupling
6. **Separate Application Services** from domain services

### From DDD to Traditional:

1. **Flatten Layer Structure** into simple folders
2. **Merge Domain and Application Services**
3. **Convert Value Objects** to primitive types
4. **Remove Domain Events** and event handlers
5. **Simplify Repository Pattern**

## Best Practices

### DDD Implementation:

- Keep domain layer **pure** and framework-agnostic
- Use **dependency injection** for repository implementations
- Implement **domain events** for loose coupling
- Write **comprehensive tests** for domain logic
- Use **value objects** for type safety and validation

### General Guidelines:

- **Start simple** and evolve architecture as complexity grows
- **Measure complexity** before choosing architecture
- **Consider team expertise** and project timeline
- **Document architectural decisions** and rationale
- **Review and refactor** architecture as requirements change

## Conclusion

This project demonstrates a well-structured DDD implementation that provides excellent separation of concerns, testability, and maintainability. However, **architecture choice should always align with project complexity, team expertise, and business requirements**.

For simple applications, traditional layered architecture might be more appropriate. For complex business domains, DDD provides the structure and patterns needed for long-term success.

**Remember**: The best architecture is the one that serves your specific needs and constraints. Start with the simplest approach that works and evolve as complexity demands.
