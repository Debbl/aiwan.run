import { WEBSITE } from '~/constants'
import { posts } from '~/lib/source'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = posts.at(-1)?.data.date

  const postsSitemap = posts.map((post) => {
    return {
      url: `${WEBSITE.domain}${post.url}`,
      lastModified: post.data.date,
      changeFrequency: 'weekly',
      priority: 0.8,
    } as const satisfies MetadataRoute.Sitemap[number]
  })

  return [
    {
      url: WEBSITE.domain,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${WEBSITE.domain}/posts`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${WEBSITE.domain}/feed.xml`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${WEBSITE.domain}/tools`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${WEBSITE.domain}/slides`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postsSitemap,
    {
      url: `${WEBSITE.domain}/posts`,
      lastModified: posts.at(-1)?.data.date,
      changeFrequency: 'weekly',
      priority: 0.75,
      images: posts.map((post) => {
        const slugs = post.slugs
        const ogImgPath = [...slugs.slice(0, -1), `${slugs.at(-1)}.png`].join('/')

        return `${WEBSITE.domain}/posts/og/${ogImgPath}`
      }),
    },
  ]
}
