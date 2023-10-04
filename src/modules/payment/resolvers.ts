import type { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Mutation: {
    createBooking: async (_, args, context) => {
      const booking = await context.prisma.booking.upsert({
        where: {
          id: args.id ?? "",
        },
        update: {
          datetime: args.datetime,
          firstName: args.firstName,
          lastName: args.lastName,
          organization: args.organization,
          organizationTitle: args.organizationTitle,
          email: args.email,
          tel: args.tel,
        },
        create: {
          datetime: args.datetime,
          firstName: args.firstName,
          lastName: args.lastName,
          organization: args.organization,
          organizationTitle: args.organizationTitle,
          email: args.email,
          tel: args.tel,
        },
      });

      console.log("createBooking", booking.id);

      return booking;
    },

    deleteBooking: async (_, args, context) => {
      const booking = await context.prisma.booking.delete({
        where: {
          id: args.id,
        },
      });

      console.log("deleteBooking", booking.id);

      return booking;
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
