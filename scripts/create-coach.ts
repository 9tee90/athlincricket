import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const coach = await prisma.user.upsert({
    where: { email: 'coach@athlin.com' },
    update: {},
    create: {
      email: 'coach@athlin.com',
      name: 'Test Coach',
      password: hashedPassword,
      role: Role.coach,
      isAdmin: false,
      isVerifiedCoach: false,
    },
  })

  console.log('Coach created:', coach)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 