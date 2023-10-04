import type { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Mutation: {
    createCustomer: async (_, args, context) => {
      console.log("createCustomer");

      const customer = await context.prisma.customer.create({
        data: {
          firsName: args.firsName,
          lastName: args.lastName,
          organization: args.organization,
          organizationTitle: args.organizationTitle,
          email: args.email,
          tel: args.tel,
        },
      });

      return customer;
    },

    createPaymentIntent: async (_, args, context) => {
      console.log("createPaymentIntent");

      const customer = await context.stripe.customers.create();

      const paymentIntent = await context.stripe.paymentIntents.create({
        amount: 7000,
        currency: "EUR",
        customer: customer.id,
        setup_future_usage: "off_session",
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    },
  },
};
