import type { PrismaClient } from "@prisma/client";
import type Postmark from "postmark";

export type Context = {
  postmark: Postmark.ServerClient;
  prisma: PrismaClient;
};
