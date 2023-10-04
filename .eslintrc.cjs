module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/recommended-stylistic-type-checked",
    "prettier",
  ],
  env: {
    node: true,
  },
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    project: ["./.config/tsc/eslint/tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ["*.ts"],
      processor: "@graphql-eslint/graphql",
    },
    {
      files: ["*.graphql"],
      extends: "plugin:@graphql-eslint/schema-recommended",
    },
  ],
};
