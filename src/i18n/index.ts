import { setupI18n } from '@lingui/core'
import { cache } from 'react'
import { linguiConfig } from './config'
import { loadCatalog } from './load'
import type { I18n } from '@lingui/core'
import type { Locale } from './config'

export const { locales, sourceLocale } = linguiConfig

type AllI18nInstances = { [K in Locale]: I18n }

export interface PageLocaleParam {
  params: Promise<{ locale: Locale }>
}

export const getAllI18nInstances = cache(
  async (): Promise<AllI18nInstances> => {
    const catalogs = await Promise.all(locales.map(loadCatalog))

    return locales.reduce((acc, locale) => {
      const allMessages = catalogs.reduce((acc, oneCatalog) => {
        return { ...acc, ...oneCatalog }
      }, {})

      const messages = allMessages[locale] ?? {}
      const i18n = setupI18n({
        locale,
        locales: [...locales],
        messages: { [locale]: messages },
      })

      return { ...acc, [locale]: i18n }
    }, {} as AllI18nInstances)
  },
)

export const getI18nInstance = cache(async (locale?: Locale): Promise<I18n> => {
  const allI18nInstances = await getAllI18nInstances()

  const realLocale = (locale ?? sourceLocale) as Locale

  if (!allI18nInstances[realLocale]) {
    console.warn(`No i18n instance found for locale "${realLocale}"`)
  }
  return allI18nInstances[realLocale]!
})

export const generateMetadataWithI18n = cache(
  async (params: Promise<{ locale: Locale }>) => {
    const { locale = 'en' } = await params

    const i18n = await getI18nInstance(locale)

    if (!i18n) {
      throw new Error('no set i18n')
    }

    return i18n
  },
)
