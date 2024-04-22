import { prisma } from "./prisma";

const main = async () => {
  // TODO
};

try {
  await main();
} catch (error) {
  console.error(error);
} finally {
  await prisma.$disconnect();
}
