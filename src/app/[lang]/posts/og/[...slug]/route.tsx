import { posts } from '~/lib/source'
import { generatePostOpenGraphImage } from './route.index'
import type { Lang } from '~/types'

export async function generateStaticParams() {
  return posts.map((post) => {
    const slugs = post.slugs
    return { lang: 'zh', slug: [...slugs.slice(0, -1), `${slugs.at(-1)}.png`] }
  })
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: Lang; slug: string[] }> },
) {
  const { lang, slug } = await params

  const slugs = slug.map((s) => s.replace('.png', ''))

  return generatePostOpenGraphImage(slugs, lang)
}
