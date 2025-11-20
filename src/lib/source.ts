// .source folder will be generated when you run `next dev`
import { loader } from 'fumadocs-core/source'
import { docs } from '../../.source/server'
import { i18n } from './i18n'

export const source = loader({
  i18n,
  baseUrl: '/posts',
  source: docs.toFumadocsSource(),
})

export const posts = source
  .getPages()
  .toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .map((p) => {
    const category = p.path.startsWith('(blog)') ? 'blog' : 'til'
    const url = p.url.startsWith('/en') ? p.url.slice(3) : p.url
    return { ...p, category, url } as const
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

export function getRelativePage(slugs?: string[], lang = 'en') {
  const currentPage = source.getPage(slugs, lang)

  const categoryIndex = currentPage?.path.startsWith('(blog)') ? 0 : 1
  const posts = postsByCategory[categoryIndex].posts

  const currentPageIndex = posts.findIndex((p) => p.path === currentPage?.path)

  if (!currentPage) return {}

  const prevPageSlugs = posts[currentPageIndex + 1]?.slugs
  const nextPageSlugs = posts[currentPageIndex - 1]?.slugs

  const prevPage = prevPageSlugs ? source.getPage(prevPageSlugs, lang) : null
  const nextPage = nextPageSlugs ? source.getPage(nextPageSlugs, lang) : null

  return { prevPage, nextPage }
}
