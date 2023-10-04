import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Mutation: {
    createPaymentIntent: async (_, args, context) => {
      const paymentIntent = await context.stripe.paymentIntents.create({
        amount: 7000,
        currency: "EUR",
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    },
  },
};
