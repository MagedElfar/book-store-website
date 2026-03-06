import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactCompiler from "eslint-plugin-react-compiler";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "dist/**"],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "react-compiler": reactCompiler,
      "import": importPlugin,
      "@typescript-eslint": typescriptEslint,
      "react-hooks": reactHooks,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-compiler/recommended": "error",
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // --- React Compiler ---
      "react-compiler/recommended": "error",

      // --- TypeScript Rules ---
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "prefer-const": "error",

      // --- Import Ordering ---
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          "pathGroups": [
            {
              "pattern": "react",
              "group": "builtin",
              "position": "before"
            },
            {
              "pattern": "@/**",
              "group": "internal"
            }
          ],
          "pathGroupsExcludedImportTypes": ["react"],
          "newlines-between": "always",
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        }
      ],

      "no-restricted-imports": [
        "error",
        {
          "patterns": [
            {
              "group": ["@/features/*/*"],
              "message": "Direct access to internal feature files is forbidden. Use the public API (index.ts) of the feature instead."
            }
          ]
        }
      ]
    },
  },
];

export default eslintConfig;