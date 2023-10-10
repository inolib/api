export const toLocaleDateString = (datetime: Date | string) =>
  (datetime instanceof Date ? datetime : new Date(datetime))
    .toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(" ", " ");

export const toLocaleTimeString = (datetime: Date | string) =>
  (datetime instanceof Date ? datetime : new Date(datetime))
    .toLocaleTimeString("fr-FR", { hour: "2-digit" })
    .replace(" ", " ");
