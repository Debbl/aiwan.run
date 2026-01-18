import { notFound } from 'next/navigation'
import { generatePostOpenGraphImage } from '~/app/[lang]/posts/og/[...slug]/route.index'
import { source } from '~/lib/source'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return source
    .generateParams('slug', 'lang')
    .filter((s) => s.lang === 'en')
    .map((s) => ({ slug: s.slug.concat(['opengraph-image.png']) }))
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/posts/og/[...slug]'>,
) {
  const { slug } = await ctx.params

  if (!slug) notFound()

  return generatePostOpenGraphImage(slug.slice(0, -1))
}
