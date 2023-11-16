import {
  // custom,
  email,
  minLength,
  object,
  safeParse,
  string,
  toTrimmed,
  type Input,
} from "valibot";

import { toLocaleDateString, toLocaleTimeString } from "../../helpers";
import type { Resolvers } from "./types";

export type Booking = Input<typeof BookingSchema>;

const BookingSchema = object({
  datetime: string("Veuillez sélectionner une date."),
  firstName: string([
    toTrimmed(),
    minLength(1, "Veuillez entrer votre prénom."),
  ]),
  lastName: string([
    toTrimmed(),
    minLength(1, "Veuillez entrer votre nom de famille."),
  ]),
  organization: string([
    toTrimmed(),
    minLength(1, "Veuillez entrer le nom de votre entreprise."),
  ]),
  organizationTitle: string([
    toTrimmed(),
    minLength(1, "Veuillez entrer votre fonction."),
  ]),
  email: string([
    toTrimmed(),
    minLength(1, "Veuillez entrer votre adresse e-mail."),
    email("Addresse e-mail invalide."),
  ]),
  tel: string([
    toTrimmed(),
    minLength(1, "Veuillez entrer votre numéro de téléphone."),
    // custom(isPossiblePhoneNumber, "Numéro de téléphone invalide."),
  ]),
});

export const resolvers: Resolvers = {
  Mutation: {
    createBooking: async (_, args, context) => {
      const result = safeParse(BookingSchema, args);

      console.log(result);

      if (result.success) {
        const booking = await context.prisma.booking.create({
          data: {
            datetime: new Date(
              Number.parseInt(result.output.datetime) * 1000,
            ).toISOString(),
            email: result.output.email,
            firstName: result.output.firstName,
            lastName: result.output.lastName,
            organization: result.output.organization,
            organizationTitle: result.output.organizationTitle,
            tel: result.output.tel,
          },
        });

        if (process.env.VERCEL_ENV === "production") {
          await context.postmark.sendEmail({
            From: "contact@inolib.com",
            To: booking.email,
            Subject: "Merci pour votre réservation !",
            TextBody:
              `Bonjour ${booking.firstName},\n\n` +
              `Nous vous donnons rendez-vous le ${toLocaleDateString(
                booking.datetime,
              )} à ${toLocaleTimeString(
                booking.datetime,
              )} pour assister à la conférence « L’accessibilité numérique, un monde d’opportunités ».\n\n` +
              `Djebrine ALOUI, fondateur et CEO d’INOLIB, vous présentera les enjeux de l’accessibilité aujourd’hui et vous repartirez avec des directives claires pour entreprendre vos premières démarches vers l’accessibilité numérique.\n\n` +
              `Vous recevrez un e-mail avec un lien de participation à la conférence en ligne la veille de l’événement.\n\n` +
              `Dans l’attente de vous rencontrer, l’équipe d’INOLIB reste à votre disposition, vous pouvez nous écrire à contact@inolib.com ou nous appeler au +33 6 47 21 86 69.`,
            MessageStream: "thanks",
          });

          await context.postmark.sendEmail({
            From: "contact@inolib.com",
            To: "djebrine.aloui@inolib.com",
            Subject: `Nouvelle réservation pour la conférence du ${toLocaleDateString(
              booking.datetime,
            )} à ${toLocaleTimeString(booking.datetime)}`,
            TextBody:
              `Prénom : ${booking.firstName}\n` +
              `Nom de famille : ${booking.lastName}\n` +
              `Entreprise : ${booking.organization}\n` +
              `Fonction : ${booking.organizationTitle}\n` +
              `Adresse e-mail : ${booking.email}\n` +
              `Numéro de téléphone : ${booking.tel}`,
            MessageStream: "notification",
          });
        } else {
          await context.postmark.sendEmail({
            From: "contact@inolib.com",
            To: booking.email,
            Subject: "Merci pour votre réservation !",
            TextBody:
              `Bonjour ${booking.firstName},\n\n` +
              `Nous vous donnons rendez-vous le ${toLocaleDateString(
                booking.datetime,
              )} à ${toLocaleTimeString(
                booking.datetime,
              )} pour assister à la conférence « L’accessibilité numérique, un monde d’opportunités ».\n\n` +
              `Djebrine ALOUI, fondateur et CEO d’INOLIB, vous présentera les enjeux de l’accessibilité aujourd’hui et vous repartirez avec des directives claires pour entreprendre vos premières démarches vers l’accessibilité numérique.\n\n` +
              `Vous recevrez un e-mail avec un lien de participation à la conférence en ligne la veille de l’événement.\n\n` +
              `Dans l’attente de vous rencontrer, l’équipe d’INOLIB reste à votre disposition, vous pouvez nous écrire à contact@inolib.com ou nous appeler au +33 6 47 21 86 69.`,
            MessageStream: "outbound",
          });
        }

        return booking;
      }
    },
  },
};
