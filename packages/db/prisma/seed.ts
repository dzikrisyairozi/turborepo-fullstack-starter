import { PrismaClient } from '../src/generated';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create example users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      role: 'USER',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create example posts
  await prisma.post.upsert({
    where: { id: 'example-post-1' },
    update: {},
    create: {
      id: 'example-post-1',
      title: 'Welcome to the Blog',
      content: 'This is an example blog post created during database seeding.',
      published: true,
      authorId: user1.id,
    },
  });

  await prisma.post.upsert({
    where: { id: 'example-post-2' },
    update: {},
    create: {
      id: 'example-post-2',
      title: 'Getting Started with Prisma',
      content: 'Learn how to use Prisma with this comprehensive guide.',
      published: false,
      authorId: user2.id,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('👤 Created users:', { user1: user1.email, user2: user2.email });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
