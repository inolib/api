import { writeFileSync } from "node:fs";

import { typeDefs } from "graphql-scalars";

try {
  writeFileSync("./src/modules/scalars/typeDefs.gql", typeDefs.join("\n"));
} catch (error) {
  console.error(error);
}
