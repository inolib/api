import { IGraphQLConfig } from "graphql-config";

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
              Payment: "@prisma/client#Payment",
              PaymentStatus: "@prisma/client#PaymentStatus",
              Product: "@prisma/client#Product",
              ProductCategory: "@prisma/client#ProductCategory",
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
