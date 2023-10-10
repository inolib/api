/* eslint-disable react-hooks/rules-of-hooks */

import { useGraphQLModules } from "@envelop/graphql-modules";
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
  cors: {
    allowedHeaders: ["Content-Type"],
    methods: ["POST"],
    origin: process.env.CORS_ORIGIN ?? "*",
  },
  graphiql: process.env.VERCEL_ENV !== "production",
  landingPage: false,
});

const app = express();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use("/graphql", yoga);

app.post(
  "/stripe/webhook",
  express.json({ type: "application/json" }),
  stripeWebhook,
);

export const viteNodeApp = app;
export default app;
