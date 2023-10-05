import type { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Mutation: {
    cancelPaymentIntent: async (_, args, context) => {
      return await context.stripe.paymentIntents.cancel(args.id);
    },

    createPaymentIntent: async (_, args, context) => {
      return await context.stripe.paymentIntents.create({
        amount: 8400,
        currency: "eur",
        metadata: {
          datetime: args.datetime,
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          organization: args.organization,
          organizationTitle: args.organizationTitle,
          tel: args.tel,
        },
        receipt_email: args.email,
      });
    },
  },
};
