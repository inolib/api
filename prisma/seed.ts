import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // ContactCategory
  await prisma.contactCategory.deleteMany();

  await prisma.contactCategory.create({
    data: {
      name: "Audit",
    },
  });

  await prisma.contactCategory.create({
    data: {
      name: "Développement",
    },
  });

  await prisma.contactCategory.create({
    data: {
      name: "Formation",
    },
  });

  // ContactRequest
  await prisma.contactRequest.deleteMany();

  // Customer
  await prisma.customer.deleteMany();
};

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Done.");
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    console.error(error);
    process.exit(1);
  });
