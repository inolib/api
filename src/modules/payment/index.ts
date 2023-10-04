import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { createModule } from "graphql-modules";

import { resolvers } from "./resolvers";
import typeDefs from "./typeDefs.gql";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const paymentModule = createModule({
  id: "payment",
  dirname: __dirname,
  resolvers,
  typeDefs,
});
