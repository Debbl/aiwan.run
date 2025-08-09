import { msg } from '@lingui/core/macro'
import { getI18nInstance } from '~/i18n'
import type { Lang } from '~/types'

export async function getServerWebsiteConstants(lang: Lang = 'en') {
  const i18n = await getI18nInstance(lang)

  const baseUrl =
    lang === 'en' ? 'https://aiwan.run' : `https://aiwan.run/${lang}`

  return {
    i18n,
    baseUrl,
    name: i18n.t(msg`Brendan Dash's Blog`),
    title: i18n.t(
      msg`Brendan Dash's Blog, a place to share my thoughts and ideas`,
    ),
    description: i18n.t(
      msg`Brendan Dash's personal website, a place to share my thoughts and ideas`,
    ),
    keywords: [
      i18n.t(msg`Brendan Dash`),
      i18n.t(msg`Debbl`),
      i18n.t(msg`Blog`),
      i18n.t(msg`Personal Website`),
      i18n.t(msg`TIL`),
      i18n.t(msg`react`),
      i18n.t(msg`nextjs`),
      i18n.t(msg`ai`),
      i18n.t(msg`ai-sdk`),
      i18n.t(msg`tailwindcss`),
      i18n.t(msg`typescript`),
      i18n.t(msg`javascript`),
      i18n.t(msg`html`),
      i18n.t(msg`css`),
    ],
  }
}
