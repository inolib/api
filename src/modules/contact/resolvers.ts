import type { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    contactCategories: (_, args, context) =>
      context.prisma.contactCategory.findMany(),
  },

  Mutation: {
    newContactRequest: async (_, args, context) => {
      const contactRequest = await context.prisma.contactRequest.create({
        data: {
          categoryId: args.categoryId,
          companyName: args.companyName,
          lastName: args.lastName,
          firstName: args.firstName,
          email: args.email,
          phone: args.phone,
          message: args.message,
        },
      });

      // try {
      //   await context.mailer.sendMail({
      //     from: "matthieu.meignan@inolib.com",
      //     to: "matthieu.meignan@inolib.com",
      //     subject: "TEST",
      //     text: JSON.stringify(contactRequest),
      //   });
      // } catch (error) {
      //   console.error(error);
      // }

      return contactRequest;
    },
  },
};
