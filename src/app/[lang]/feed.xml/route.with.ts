import { generateStaticFeed } from '~/app/[lang]/feed.xml/generate-static-feed'
import type { Lang } from '~/types'

export const dynamic = 'force-static'

export async function withGET(lang: Lang) {
  return generateStaticFeed(lang)
}
