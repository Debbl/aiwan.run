import { generateStaticSitemap } from '../../(main)/sitemap'

export const dynamic = 'force-static'

export default function sitemap() {
  return generateStaticSitemap('zh')
}
