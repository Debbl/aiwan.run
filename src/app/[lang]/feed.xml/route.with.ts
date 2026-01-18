import { generateStaticFeed } from '~/app/[lang]/feed.xml/generate-static-feed'
import type { Lang } from '~/types'

export const dynamic = 'force-static'

export function withGenerateStaticParams(lang: Lang) {
  if (lang === 'en') return []

  return [{ lang: 'zh' }]
}

export async function withGET(lang: Lang) {
  return generateStaticFeed(lang)
}
