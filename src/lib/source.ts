// .source folder will be generated when you run `next dev`
import { loader } from 'fumadocs-core/source'
import { docs } from '../../.source'

export const source = loader({
  baseUrl: '/posts',
  source: docs.toFumadocsSource(),
})

export const posts = source
  .getPages()
  .toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .map((p) => {
    const category = p.file.dirname.startsWith('(blog)') ? 'blog' : 'til'
    return { ...p, category } as const
  })

export const postsByCategory = [
  {
    title: 'Blog',
    category: '(blog)',
    posts: posts.filter((p) => p.category === 'blog'),
  },
  {
    title: 'TIL',
    category: '(til)',
    posts: posts.filter((p) => p.category === 'til'),
  },
]

export function getRelativePage(slug?: string[]) {
  const currentPage = source.getPage(slug)

  const categoryIndex = currentPage?.file.dirname.startsWith('(blog') ? 0 : 1
  const posts = postsByCategory[categoryIndex].posts

  const currentPageIndex = posts.findIndex((p) => p.file.dirname === currentPage?.file.dirname)

  if (!currentPage) return {}

  const prevPage = posts[currentPageIndex + 1]
  const nextPage = posts[currentPageIndex - 1]

  return { prevPage, nextPage }
}
