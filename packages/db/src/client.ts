import { PrismaClient } from './generated';

// Global variable to store the Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a single instance of PrismaClient
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  });

// In development, store the client on the global object to prevent
// multiple instances during hot reloads
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// Export a function to connect to the database
export async function connectDb(): Promise<void> {
  await db.$connect();
}

// Export a function to disconnect from the database
export async function disconnectDb(): Promise<void> {
  await db.$disconnect();
}
