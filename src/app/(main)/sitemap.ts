import { withSitemap } from '../[lang]/sitemap.with'

export const dynamic = 'force-static'

export default function sitemap() {
  return withSitemap('en')
}
