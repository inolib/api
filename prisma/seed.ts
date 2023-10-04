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

  // PaymentStatus
  await prisma.paymentStatus.deleteMany();

  await prisma.paymentStatus.create({
    data: {
      name: "Completed",
    },
  });

  await prisma.paymentStatus.create({
    data: {
      name: "Pending",
    },
  });

  await prisma.paymentStatus.create({
    data: {
      name: "Refunded",
    },
  });

  await prisma.paymentStatus.create({
    data: {
      name: "Rejected",
    },
  });

  // Payment
  await prisma.payment.deleteMany();

  // ProductCategory
  await prisma.productCategory.deleteMany();

  const productCategory = await prisma.productCategory.create({
    data: {
      name: "Conférence",
    },
  });

  // Product
  await prisma.product.deleteMany();

  await prisma.product.create({
    data: {
      categoryId: productCategory.id,
      name: "SEEPH 2023 - L’accessibilité numérique, un monde d’opportunités",
      price: 70,
      currency: "EUR",
    },
  });
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
