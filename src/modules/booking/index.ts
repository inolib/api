import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { createModule } from "graphql-modules";

import { resolvers } from "./resolvers";
import typeDefs from "./typeDefs.gql";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const bookingModule = createModule({
  id: "booking",
  dirname: __dirname,
  resolvers,
  typeDefs,
});
