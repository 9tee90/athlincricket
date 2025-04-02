import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('password123', 10);

  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@athlin.com' },
    update: {},
    create: {
      email: 'admin@athlin.com',
      name: 'Admin User',
      password,
      role: 'admin',
      isAdmin: true,
    },
  });

  // Create xpro user
  await prisma.user.upsert({
    where: { email: 'xpro@athlin.com' },
    update: {},
    create: {
      email: 'xpro@athlin.com',
      name: 'XPro User',
      password,
      role: 'xpro',
      isAdmin: false,
    },
  });

  // Create sponsor user
  await prisma.user.upsert({
    where: { email: 'sponsor@athlin.com' },
    update: {},
    create: {
      email: 'sponsor@athlin.com',
      name: 'Sponsor User',
      password,
      role: 'sponsor',
      isAdmin: false,
    },
  });

  // Create player user
  await prisma.user.upsert({
    where: { email: 'player@athlin.com' },
    update: {},
    create: {
      email: 'player@athlin.com',
      name: 'Player User',
      password,
      role: 'player',
      isAdmin: false,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 