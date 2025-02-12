// @ts-check
import { defineConfig } from "@debbl/eslint-config";

export default defineConfig({
  ignores: {
    files: ["src/components/ui", "src/components/magicui"],
  },
  typescript: true,
  react: {
    next: true,
  },
  tailwindcss: "prettier",
});
