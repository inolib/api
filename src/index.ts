import { useGraphQLModules } from "@envelop/graphql-modules";
import { PrismaClient } from "@prisma/client";
import { createApplication } from "graphql-modules";
import { createYoga } from "graphql-yoga";
import { createTransport } from "nodemailer";
import Stripe from "stripe";

import { modules } from "./modules";

const yoga = createYoga({
  plugins: [useGraphQLModules(createApplication({ modules }))],
  context: {
    mailer: createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      service: "Outlook365",
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    }),
    prisma: new PrismaClient(),
    stripe: new Stripe(
      "sk_test_51Nuz8EK4mWBX9EWw2LRndsz6eOfYkf3wqsvuLPe7QJxq3Bti8d7YEMsPRIRdNw7wVPX7N3GitJSsaVFqqQSBXbw4006i6DrqnF",
      {
        apiVersion: "2023-08-16",
      },
    ),
  },
  cors: {
    allowedHeaders: ["Content-Type"],
    methods: ["OPTIONS", "POST"],
    origin: process.env.CORS_ORIGIN ?? "*",
  },
  graphiql: process.env.VERCEL_ENV !== "production",
  graphqlEndpoint: "/",
  landingPage: false,
});

export const viteNodeApp = yoga;
export default yoga;
