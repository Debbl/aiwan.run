// @ts-check
import { defineConfig } from '@debbl/eslint-config'

export default defineConfig({
  ignores: {
    files: ['content/**/*.{md,mdx}'],
  },
  typescript: true,
  react: {
    next: true,
  },
  tailwindcss: 'prettier',
})
