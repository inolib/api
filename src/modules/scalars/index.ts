import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { createModule } from "graphql-modules";
import { resolvers } from "graphql-scalars";

import typeDefs from "./typeDefs.gql";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const scalarsModule = createModule({
  id: "scalars",
  dirname: __dirname,
  resolvers,
  typeDefs,
});
