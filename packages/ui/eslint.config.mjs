import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      // Treat non-breaking issues as warnings
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/prop-types": "off", // Not needed in TypeScript
      "react/no-unknown-property": "warn",
    },
  },
];
