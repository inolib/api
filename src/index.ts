/* eslint-disable react-hooks/rules-of-hooks */

import { useGraphQLModules } from "@envelop/graphql-modules";
import cors from "cors";
import express from "express";
import { createApplication } from "graphql-modules";
import { createYoga } from "graphql-yoga";

import "dotenv/config";

import { modules } from "./modules";
import { postmark } from "./postmark/postmark";
import { prisma } from "./prisma/prisma";
import { stripe } from "./stripe/stripe";
import { webhook as stripeWebhook } from "./stripe/webhook";

const yoga = createYoga({
  plugins: [useGraphQLModules(createApplication({ modules }))],
  context: {
    postmark,
    prisma,
    stripe,
  },
  graphiql: process.env.VERCEL_ENV !== "production",
  landingPage: false,
});

const app = express();

app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use("/graphql", yoga);

if (process.env.VERCEL_ENV === "development") {
  app.post("/stripe/webhook", stripeWebhook);
} else {
  app.post(
    "/stripe/webhook",
    express.json({ type: "application/json" }),
    stripeWebhook,
  );
}

export const viteNodeApp = app;
export default app;
