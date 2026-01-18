import { WEBSITE } from '~/constants'
import { posts, source } from '~/lib/source'
import type { MetadataRoute } from 'next'
import type { Lang } from '~/types'

export function withGenerateStaticParams(lang: Lang) {
  if (lang === 'en') return []
  return [{ lang }]
}

function getPostSitemap(lang: 'en' | 'zh' = 'en'): MetadataRoute.Sitemap {
  return posts
    .map((rawPost) => {
      const post = source.getPage(rawPost.slugs, lang)

      if (!post) return null

      const url = `${WEBSITE.domain}${lang === 'zh' ? post.url : post.url.slice(3)}`
      return {
        url,
        lastModified: post.data.date,
        changeFrequency: 'weekly',
        priority: 0.8,
      } as const satisfies MetadataRoute.Sitemap[number]
    })
    .filter(Boolean)
}

function withGenerateStaticSitemap(
  lang: 'en' | 'zh' = 'en',
): MetadataRoute.Sitemap {
  const lastModified = posts.at(-1)?.data.date

  const postsSitemap = getPostSitemap(lang)

  if (lang === 'zh') {
    return [
      {
        url: `${WEBSITE.domain}/zh`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${WEBSITE.domain}/zh/posts`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.95,
      },
      {
        url: `${WEBSITE.domain}/zh/feed.xml`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `https://tools.aiwan.run`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `https://slides.aiwan.run`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `https://game.aiwan.run`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `https://emoji.aiwan.run`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      ...postsSitemap,
      {
        url: `${WEBSITE.domain}/zh/posts`,
        lastModified: posts.at(-1)?.data.date,
        changeFrequency: 'weekly',
        priority: 0.75,
        images: posts.map((post) => {
          const slugs = post.slugs
          const ogImgPath = [...slugs.slice(0, -1), `${slugs.at(-1)}.png`].join(
            '/',
          )

          return `${WEBSITE.domain}/posts/og/${ogImgPath}`
        }),
      },
    ]
  }

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
      url: `https://tools.aiwan.run`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `https://slides.aiwan.run`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `https://game.aiwan.run`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `https://emoji.aiwan.run`,
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
        const ogImgPath = [...slugs.slice(0, -1), `${slugs.at(-1)}.png`].join(
          '/',
        )

        return `${WEBSITE.domain}/posts/og/${ogImgPath}`
      }),
    },
  ]
}

export function withSitemap(lang: Lang) {
  return withGenerateStaticSitemap(lang)
}
