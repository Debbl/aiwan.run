export const linguiConfig = {
  sourceLocale: 'en',
  locales: ['en', 'zh'],
} as const

export type Locale = (typeof linguiConfig.locales)[number]
