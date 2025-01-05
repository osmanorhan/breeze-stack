// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });