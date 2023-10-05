import { useGraphQLModules } from "@envelop/graphql-modules";
import { PrismaClient } from "@prisma/client";
import express from "express";
import { createApplication } from "graphql-modules";
import { createYoga } from "graphql-yoga";
import { createTransport } from "nodemailer";
import Stripe from "stripe";

import { modules } from "./modules";

const prisma = new PrismaClient();

const stripe = new Stripe(
  "sk_test_51Nuz8EK4mWBX9EWw2LRndsz6eOfYkf3wqsvuLPe7QJxq3Bti8d7YEMsPRIRdNw7wVPX7N3GitJSsaVFqqQSBXbw4006i6DrqnF",
  { apiVersion: "2023-08-16" },
);

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
  (request, response) => {
    console.log("hooked");

    void (async () => {
      const event = request.body as Stripe.Event;

      switch (event.type) {
        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;

          await prisma.booking.create({
            data: {
              datetime: paymentIntent.metadata.datetime,
              email: paymentIntent.metadata.email,
              firstName: paymentIntent.metadata.firstName,
              lastName: paymentIntent.metadata.lastName,
              organization: paymentIntent.metadata.organization,
              organizationTitle: paymentIntent.metadata.organizationTitle,
              tel: paymentIntent.metadata.tel,
            },
          });

          break;
        }
      }

      response.send();
    })();
  },
);

export const viteNodeApp = app;
export default app;
