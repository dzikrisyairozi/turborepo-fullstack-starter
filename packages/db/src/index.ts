export * from './client';
export * from './generated';

// Re-export commonly used types for convenience
export type { User, Post, Role, Prisma } from './generated';

// Re-export the PrismaClient class
export { PrismaClient } from './generated';

// Export the configured client instance
export { db } from './client';
