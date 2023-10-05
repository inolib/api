import type { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Mutation: {
    createPaymentIntent: async (_, args, context) => {
      const paymentIntent = await context.stripe.paymentIntents.create({
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
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    },
  },
};
