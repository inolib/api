import type { PrismaClient } from "@prisma/client";
import type { Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type Context = {
  mailer: Transporter<SMTPTransport.SentMessageInfo>;
  prisma: PrismaClient;
};
