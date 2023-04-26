import { useGraphQLModules } from "@envelop/graphql-modules";
import { PrismaClient } from "@prisma/client";
import { createModule, createApplication } from "graphql-modules";
import { createYoga } from "graphql-yoga";
import { createTransport } from "nodemailer";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { resolvers as resolvers$3 } from "graphql-scalars";
const resolvers$2 = {
  Query: {
    contactCategories: (_, args, context) => context.prisma.contactCategory.findMany()
  },
  Mutation: {
    newContactRequest: async (_, args, context) => {
      const contactRequest = await context.prisma.contactRequest.upsert({
        where: { id: "" },
        update: {},
        create: {
          categoryId: args.categoryId,
          companyName: args.companyName,
          lastName: args.lastName,
          firstName: args.firstName,
          email: args.email,
          phone: args.phone,
          message: args.message
        }
      });
      await context.mailer.sendMail({
        from: "matthieu.meignan@inolib.com",
        to: "matthieu.meignan@inolib.com",
        subject: "Avec from",
        text: JSON.stringify(contactRequest)
      });
      return contactRequest;
    }
  }
};
var doc$3 = { "kind": "Document", "definitions": [{ "kind": "ObjectTypeDefinition", "name": { "kind": "Name", "value": "Query" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "name": { "kind": "Name", "value": "contactCategories" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContactCategory" } } } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "name": { "kind": "Name", "value": "Mutation" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "name": { "kind": "Name", "value": "newContactRequest" }, "arguments": [{ "kind": "InputValueDefinition", "name": { "kind": "Name", "value": "categoryId" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "InputValueDefinition", "name": { "kind": "Name", "value": "companyName" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "InputValueDefinition", "name": { "kind": "Name", "value": "firstName" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "InputValueDefinition", "name": { "kind": "Name", "value": "lastName" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "InputValueDefinition", "name": { "kind": "Name", "value": "email" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "InputValueDefinition", "name": { "kind": "Name", "value": "phone" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "InputValueDefinition", "name": { "kind": "Name", "value": "message" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContactRequest" } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "name": { "kind": "Name", "value": "ContactCategory" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "name": { "kind": "Name", "value": "id" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Cuid" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "name" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "requests" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContactRequest" } } } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "name": { "kind": "Name", "value": "ContactRequest" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "name": { "kind": "Name", "value": "id" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Cuid" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "categoryId" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Cuid" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "category" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContactCategory" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "companyName" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "firstName" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "lastName" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "email" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "EmailAddress" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "phone" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "PhoneNumber" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "message" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "createdAt" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "DateTime" } } }, "directives": [] }] }], "loc": { "start": 0, "end": 591 } };
doc$3.loc.source = { "body": "type Query {\n  contactCategories: [ContactCategory!]!\n}\n\ntype Mutation {\n  newContactRequest(\n    categoryId: String!\n    companyName: String!\n    firstName: String!\n    lastName: String!\n    email: String!\n    phone: String!\n    message: String!\n  ): ContactRequest\n}\n\ntype ContactCategory {\n  id: Cuid!\n  name: String!\n  requests: [ContactRequest!]!\n}\n\ntype ContactRequest {\n  id: Cuid!\n  categoryId: Cuid!\n  category: ContactCategory!\n  companyName: String!\n  firstName: String!\n  lastName: String!\n  email: EmailAddress!\n  phone: PhoneNumber!\n  message: String!\n  createdAt: DateTime!\n}\n", "name": "GraphQL request", "locationOffset": { "line": 1, "column": 1 } };
const __dirname$3 = dirname(fileURLToPath(import.meta.url));
const contactModule = createModule({
  id: "contact",
  dirname: __dirname$3,
  resolvers: resolvers$2,
  typeDefs: doc$3
});
const resolvers$1 = {
  Query: {
    documents: (_, args, context) => context.prisma.document.findMany()
  }
};
var doc$2 = { "kind": "Document", "definitions": [{ "kind": "ObjectTypeExtension", "name": { "kind": "Name", "value": "Query" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "name": { "kind": "Name", "value": "documents" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Document" } } } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "name": { "kind": "Name", "value": "Document" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "name": { "kind": "Name", "value": "id" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Cuid" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "name" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "type" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "category" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "date" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "DateTime" } } }, "directives": [] }] }], "loc": { "start": 0, "end": 264 } };
doc$2.loc.source = { "body": "extend type Query {\n  documents: [Document!]!\n}\n\n# type Mutation {\n#   newDocument(Name: String!, category: String!, date: DateTime!, type: String!): Document\n# }\n\ntype Document {\n  id: Cuid!\n  name: String!\n  type: String!\n  category: String!\n  date: DateTime!\n}\n", "name": "GraphQL request", "locationOffset": { "line": 1, "column": 1 } };
const __dirname$2 = dirname(fileURLToPath(import.meta.url));
const documentsModule = createModule({
  id: "documents",
  dirname: __dirname$2,
  resolvers: resolvers$1,
  typeDefs: doc$2
});
var doc$1 = { "kind": "Document", "definitions": [{ "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Date" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Time" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "DateTime" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Timestamp" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "TimeZone" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "UtcOffset" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Duration" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "ISO8601Duration" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "LocalDate" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "LocalTime" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "LocalEndTime" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "EmailAddress" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "NegativeFloat" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "NegativeInt" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "NonEmptyString" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "NonNegativeFloat" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "NonNegativeInt" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "NonPositiveFloat" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "NonPositiveInt" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "PhoneNumber" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "PositiveFloat" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "PositiveInt" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "PostalCode" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "UnsignedFloat" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "UnsignedInt" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "URL" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "BigInt" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Long" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Byte" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "UUID" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "GUID" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Hexadecimal" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "HexColorCode" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "HSL" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "HSLA" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "IP" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "IPv4" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "IPv6" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "ISBN" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "JWT" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Latitude" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Longitude" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "MAC" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Port" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "RGB" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "RGBA" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "SafeInt" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "USCurrency" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Currency" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "JSON" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "JSONObject" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "IBAN" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "ObjectID" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Void" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "DID" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "CountryCode" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Locale" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "RoutingNumber" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "AccountNumber" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "Cuid" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "SemVer" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "DeweyDecimal" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "LCCSubclass" }, "directives": [] }, { "kind": "ScalarTypeDefinition", "name": { "kind": "Name", "value": "IPCPatent" }, "directives": [] }], "loc": { "start": 0, "end": 1031 } };
doc$1.loc.source = { "body": "scalar Date\nscalar Time\nscalar DateTime\nscalar Timestamp\nscalar TimeZone\nscalar UtcOffset\nscalar Duration\nscalar ISO8601Duration\nscalar LocalDate\nscalar LocalTime\nscalar LocalEndTime\nscalar EmailAddress\nscalar NegativeFloat\nscalar NegativeInt\nscalar NonEmptyString\nscalar NonNegativeFloat\nscalar NonNegativeInt\nscalar NonPositiveFloat\nscalar NonPositiveInt\nscalar PhoneNumber\nscalar PositiveFloat\nscalar PositiveInt\nscalar PostalCode\nscalar UnsignedFloat\nscalar UnsignedInt\nscalar URL\nscalar BigInt\nscalar Long\nscalar Byte\nscalar UUID\nscalar GUID\nscalar Hexadecimal\nscalar HexColorCode\nscalar HSL\nscalar HSLA\nscalar IP\nscalar IPv4\nscalar IPv6\nscalar ISBN\nscalar JWT\nscalar Latitude\nscalar Longitude\nscalar MAC\nscalar Port\nscalar RGB\nscalar RGBA\nscalar SafeInt\nscalar USCurrency\nscalar Currency\nscalar JSON\nscalar JSONObject\nscalar IBAN\nscalar ObjectID\nscalar Void\nscalar DID\nscalar CountryCode\nscalar Locale\nscalar RoutingNumber\nscalar AccountNumber\nscalar Cuid\nscalar SemVer\nscalar DeweyDecimal\nscalar LCCSubclass\nscalar IPCPatent", "name": "GraphQL request", "locationOffset": { "line": 1, "column": 1 } };
const __dirname$1 = dirname(fileURLToPath(import.meta.url));
const scalarsModule = createModule({
  id: "scalars",
  dirname: __dirname$1,
  resolvers: resolvers$3,
  typeDefs: doc$1
});
const resolvers = {
  Query: {
    users: (_, args, context) => context.prisma.user.findMany()
  },
  Mutation: {
    newSignUpRequest: (_, args, context) => {
      return context.prisma.user.upsert({
        where: { id: "" },
        update: {},
        create: {
          email: args.email,
          password: args.password
        }
      });
    }
  }
};
var doc = { "kind": "Document", "definitions": [{ "kind": "ObjectTypeExtension", "name": { "kind": "Name", "value": "Query" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "name": { "kind": "Name", "value": "users" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "User" } } } } }, "directives": [] }] }, { "kind": "ObjectTypeDefinition", "name": { "kind": "Name", "value": "User" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "name": { "kind": "Name", "value": "id" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Cuid" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "firstName" }, "arguments": [], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "lastName" }, "arguments": [], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "email" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "phone" }, "arguments": [], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "FieldDefinition", "name": { "kind": "Name", "value": "password" }, "arguments": [], "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }] }, { "kind": "ObjectTypeExtension", "name": { "kind": "Name", "value": "Mutation" }, "interfaces": [], "directives": [], "fields": [{ "kind": "FieldDefinition", "name": { "kind": "Name", "value": "newSignUpRequest" }, "arguments": [{ "kind": "InputValueDefinition", "name": { "kind": "Name", "value": "email" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "InputValueDefinition", "name": { "kind": "Name", "value": "password" }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "User" } }, "directives": [] }] }], "loc": { "start": 0, "end": 245 } };
doc.loc.source = { "body": "extend type Query {\n  users: [User!]!\n}\n\ntype User {\n  id: Cuid!\n  firstName: String\n  lastName: String\n  email: String!\n  phone: String\n  password: String!\n}\n\nextend type Mutation {\n  newSignUpRequest(email: String!, password: String!): User\n}\n", "name": "GraphQL request", "locationOffset": { "line": 1, "column": 1 } };
const __dirname = dirname(fileURLToPath(import.meta.url));
const userModule = createModule({
  id: "user",
  dirname: __dirname,
  resolvers,
  typeDefs: doc
});
const modules = [contactModule, documentsModule, scalarsModule, userModule];
const yoga = createYoga({
  plugins: [useGraphQLModules(createApplication({ modules }))],
  context: {
    mailer: createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      service: "Outlook365",
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    }),
    prisma: new PrismaClient()
  },
  cors: {
    allowedHeaders: ["Content-Type"],
    methods: ["POST"],
    origin: process.env.CORS_ORIGIN ?? "*"
  },
  graphiql: process.env.VERCEL_ENV !== "production",
  graphqlEndpoint: "/",
  landingPage: false
});
const viteNodeApp = yoga;
export {
  yoga as default,
  viteNodeApp
};
