import type { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Mutation: {
    createContactRequest: async (_, args, context) => {
      const contactRequest = await context.prisma.contactRequest.create({
        data: {
          category: args.category,
          email: args.email,
          familyName: args.familyName,
          givenName: args.givenName,
          message: args.message,
          organization: args.organization,
          tel: args.tel,
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
