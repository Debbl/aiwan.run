import { generatePostOpenGraphImage } from '~/app/[lang]/posts/og/[...slug]/route.index'
import { posts } from '~/lib/source'

export async function generateStaticParams() {
  return posts.map((post) => {
    const slugs = post.slugs
    return { slug: [...slugs.slice(0, -1), `${slugs.at(-1)}.png`] }
  })
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params

  const slugs = slug.map((s) => s.replace('.png', ''))

  return generatePostOpenGraphImage(slugs, 'en')
}
