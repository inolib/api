import config from "../../../prettier.config.js";

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
export default {
  ...config,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "",
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^\\.",
  ],
  importOrderTypeScriptVersion: "5.0.0",
};
