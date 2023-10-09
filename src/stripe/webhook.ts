import type { RequestHandler } from "express";
import { isPossiblePhoneNumber } from "libphonenumber-js";
// import type Stripe from "stripe";
import {
  custom,
  email,
  minLength,
  object,
  // safeParse,
  string,
  toTrimmed,
  type Input,
} from "valibot";

// import { prisma } from "../prisma/prisma";

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
    custom(isPossiblePhoneNumber, "Numéro de téléphone invalide."),
  ]),
});

export const webhook: RequestHandler = (request, response) => {
  void (() => {
    console.log(request.body);

    // const event = JSON.parse(JSON.stringify(request.body)) as Stripe.Event;

    // switch (event.type) {
    //   case "payment_intent.succeeded": {
    //     const paymentIntent = event.data.object as Stripe.PaymentIntent;

    //     const result = safeParse(BookingSchema, paymentIntent.metadata);

    //     if (result.success) {
    //       const booking = await prisma.booking.create({
    //         data: {
    //           datetime: result.output.datetime,
    //           email: result.output.email,
    //           firstName: result.output.firstName,
    //           lastName: result.output.lastName,
    //           organization: result.output.organization,
    //           organizationTitle: result.output.organizationTitle,
    //           tel: result.output.tel,
    //         },
    //       });

    //       // TODO: send email
    //     }

    //     break;
    //   }
    // }

    response.send();
  })();
};
