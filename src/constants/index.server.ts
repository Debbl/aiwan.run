import { t } from 'best-i18n/macro'
import { setRequestLocale } from 'best-i18n/next/server'
import type { Lang } from '~/types'

export function getServerWebsiteConstants(lang: Lang = 'en') {
  // Callers hand the locale in explicitly (route handlers, manifest), so pin
  // it rather than trusting the ambient render to agree.
  setRequestLocale(lang)

  const baseUrl =
    lang === 'en' ? 'https://aiwan.run' : `https://aiwan.run/${lang}`

  return {
    baseUrl,
    name: t`Brendan Dash's Blog`,
    title: t`Brendan Dash's Blog, a place to share my thoughts and ideas`,
    description: t`Brendan Dash's personal website, a place to share my thoughts and ideas`,
    keywords: [
      t`Brendan Dash`,
      t`Debbl`,
      t`Blog`,
      t`Personal Website`,
      t`TIL`,
      t`react`,
      t`nextjs`,
      t`ai`,
      t`ai-sdk`,
      t`tailwindcss`,
      t`typescript`,
      t`javascript`,
      t`html`,
      t`css`,
    ],
  }
}
