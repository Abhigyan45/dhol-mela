import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "ranjeetabhigyan2001@gmail.com"; // change this
  const plainPassword = "123@Rank"; // change this, then delete it after running

  const hashed = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, password: hashed },
  });

  console.log("Admin created:", admin.email);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());