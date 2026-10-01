import { defineI18nConfig } from 'best-i18n/next/config'

// `[lang]` owns the routes; the static export plugin generates `(unprefixed)`
// with params.lang pinned to baseLocale for the English URLs.
export const i18n = defineI18nConfig({
  locales: ['en', 'zh'],
  baseLocale: 'en',
  localeParam: 'lang',
})
