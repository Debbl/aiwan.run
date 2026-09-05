import { defineI18nConfig } from 'best-i18n/next/config'

// The locale lives in the `[lang]` route segment; the `(main)` tree has no
// segment and falls back to `baseLocale`, which is exactly the unprefixed
// English tree.
export const i18n = defineI18nConfig({
  locales: ['en', 'zh'],
  baseLocale: 'en',
  localeParam: 'lang',
})
