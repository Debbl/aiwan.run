import { notFound } from 'next/navigation'
import { generatePostOpenGraphImage } from '~/app/[lang]/posts/route.index'
import { source } from '~/lib/source'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return source
    .generateParams('slug', 'lang')
    .filter((s) => s.lang === 'zh')
    .map((s) => ({ slug: s.slug, lang: 'zh' }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params

  if (!slug) notFound()

  return generatePostOpenGraphImage(slug, 'en')
}
