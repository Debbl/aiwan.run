import { withGenerateStaticParams, withSitemap } from './sitemap.with'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return withGenerateStaticParams('zh')
}

export default function sitemap() {
  return withSitemap('zh')
}
