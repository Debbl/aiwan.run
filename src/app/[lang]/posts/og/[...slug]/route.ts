import { notFound } from 'next/navigation'
import { generatePostOpenGraphImage } from '~/app/[lang]/posts/og/[...slug]/route.index'
import { source } from '~/lib/source'
import type { NextRequest } from 'next/server'
import type { Lang } from '~/types'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return source
    .generateParams('slug', 'lang')
    .filter((s) => s.lang === 'en')
    .map((s) => ({ lang: 'zh', slug: s.slug.concat(['opengraph-image.png']) }))
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/[lang]/posts/og/[...slug]'>,
) {
  const { slug, lang = 'en' } = await ctx.params

  if (!slug) notFound()

  return generatePostOpenGraphImage(slug.slice(0, -1), lang as Lang)
}
