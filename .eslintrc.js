/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: [
      "./web/tsconfig.json",
      "./scripts/tsconfig.json",
      "./api/tsconfig.json",
    ],
    tsconfigRootDir: __dirname,
  },
  rules: {},
  overrides: [
    {
      files: ["*.js", "vite.config.ts", "graphql.d.ts"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
  ],
  root: true,
};
