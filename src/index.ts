/* eslint-disable react-hooks/rules-of-hooks */

import { useGraphQLModules } from "@envelop/graphql-modules";
import cors from "cors";
import express from "express";
import { createApplication } from "graphql-modules";
import { createYoga } from "graphql-yoga";
import nodemailer from "nodemailer";

import "dotenv/config";

import { modules } from "./modules";
import { prisma } from "./prisma/prisma";

const yoga = createYoga({
  plugins: [useGraphQLModules(createApplication({ modules }))],
  context: {
    mailer: nodemailer.createTransport({
      service: "Outlook365",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    }),
    prisma,
  },
  graphiql: process.env.VERCEL_ENV !== "production",
  landingPage: false,
});

const app = express();

app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use("/graphql", yoga);

export const viteNodeApp = app;
export default app;
