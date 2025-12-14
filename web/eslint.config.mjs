import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "semi": ["error", "always"],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", "always"],
      "array-bracket-spacing": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "react/jsx-curly-spacing": ["error", { "when": "always" }],
      "space-in-parens": ["error", "always"],
      "indent": ["error", 4, { "SwitchCase": 1 }],
      "react/jsx-indent": ["error", 4],
      "quotes": ["error", "double"],
      "space-infix-ops": "error",
      "no-multiple-empty-lines": ["error", { "max": 2 }],
      "eqeqeq": ["error", "always"],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "react/jsx-tag-spacing": ["error", { "beforeSelfClosing": "always" }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "always"],
      "computed-property-spacing": ["error", "always"],

    },
  },
];

export default eslintConfig;
