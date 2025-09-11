import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Deshabilitar warning de img elements ya que necesitamos usarlos para GitHub Pages
      "@next/next/no-img-element": "off",
      // Asegurar que todas las imágenes tengan alt
      "jsx-a11y/alt-text": "error",
    },
  },
];

export default eslintConfig;
