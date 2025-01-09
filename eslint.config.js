// @ts-check
import { defineConfig } from "@debbl/eslint-config";

export default defineConfig({
  ignores: {
    files: ["src/components/ui"],
  },
  typescript: true,
  react: {
    next: true,
  },
  tailwindcss: true,
});
