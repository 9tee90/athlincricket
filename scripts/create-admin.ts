import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@athlin.com" },
    update: {
      name: "Admin User",
      password,
      role: Role.admin,
      isAdmin: true,
    },
    create: {
      email: "admin@athlin.com",
      name: "Admin User",
      password,
      role: Role.admin,
      isAdmin: true,
    },
  })

  console.log("Admin user created/updated:", {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isAdmin: admin.isAdmin,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 