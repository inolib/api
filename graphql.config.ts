import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "./src/modules/**/*.gql",
  extensions: {
    codegen: {
      generates: {
        "./src/modules/": {
          preset: "graphql-modules",
          presetConfig: {
            baseTypesPath: "./types.ts",
            encapsulateModuleTypes: "none",
            filename: "./types.ts",
          },
          plugins: ["typescript", "typescript-resolvers"],
          config: {
            contextType: "../types#Context",
            mapperTypeSuffix: "Model",
            mappers: {
              ContactCategory: "@prisma/client#ContactCategory",
              ContactRequest: "@prisma/client#ContactRequest",
              Customer: "@prisma/client#Customer",
            },
            maybeValue: "T | null | void",
            useTypeImports: true,
          },
        },
      },
    },
  },
};

export default config;
