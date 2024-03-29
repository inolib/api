export const toLocaleDateString = (datetime: Date | string) =>
  (datetime instanceof Date ? datetime : new Date(datetime))
    .toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Paris",
    })
    .replace(" ", " ");

export const toLocaleTimeString = (datetime: Date | string) =>
  (datetime instanceof Date ? datetime : new Date(datetime))
    .toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      timeZone: "Europe/Paris",
    })
    .replace(" ", " ");
