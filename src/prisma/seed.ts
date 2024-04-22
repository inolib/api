import { prisma } from "./prisma";

const main = async () => {
  // ContactCategory
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
};

try {
  await main();
} catch (error) {
  console.error(error);
} finally {
  await prisma.$disconnect();
}
