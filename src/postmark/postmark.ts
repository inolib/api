import Postmark from "postmark";

export const postmark = new Postmark.ServerClient(
  process.env.POSTMARK_API_KEY ?? "",
);
