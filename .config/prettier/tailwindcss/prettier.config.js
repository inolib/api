import config from "../../../prettier.config.js";

/** @type {import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  ...config,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cn", "twMerge"],
};
