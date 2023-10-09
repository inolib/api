import type { PrismaClient } from "@prisma/client";
import type { Transporter } from "nodemailer";
import type { Stripe } from "stripe";

export type Context = {
  mailer: Transporter;
  prisma: PrismaClient;
  stripe: Stripe;
};
