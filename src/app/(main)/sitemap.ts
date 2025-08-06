import { generateStaticSitemap } from '../[lang]/sitemap'

export const dynamic = 'force-static'

export default function sitemap() {
  return generateStaticSitemap('zh')
}
