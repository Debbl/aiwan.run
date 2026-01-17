import { linguiConfig } from '~/i18n/config'
import 'server-only'
import type { Messages } from '@lingui/core'
import type { Locale } from './config'

export const { locales, sourceLocale } = linguiConfig

export async function loadCatalog(locale: Locale): Promise<{
  [k: string]: Messages
}> {
  const { messages } = await import(`../locales/${locale}/messages.mjs`)
  return {
    [locale]: messages,
  }
}
