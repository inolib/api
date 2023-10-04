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
              Booking: "@prisma/client#Booking",
              ContactCategory: "@prisma/client#ContactCategory",
              ContactRequest: "@prisma/client#ContactRequest",
            },
            maybeValue: "T | null | void",
            scalars: {
              DateTime: "string",
              EmailAddress: "string",
              PhoneNumber: "string",
            },
            useTypeImports: true,
          },
        },
      },
    },
  },
};

export default config;
