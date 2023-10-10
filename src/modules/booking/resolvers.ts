import type { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    readBooking: async (_, args, context) => {
      return await context.prisma.booking.findUnique({
        where: {
          clientSecret: args.clientSecret,
        },
      });
    },
  },
};
