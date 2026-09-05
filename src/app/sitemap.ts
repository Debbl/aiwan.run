import { WEBSITE } from '~/constants'
import { posts, source } from '~/lib/source'
import type { MetadataRoute } from 'next'
import type { Lang } from '~/types'

export const dynamic = 'force-static'

const langs = ['en', 'zh'] as const

/** English stays unprefixed (and doubles as x-default), Chinese lives under /zh. */
function localize(path: string, lang: Lang) {
  return lang === 'en'
    ? `${WEBSITE.domain}${path}`
    : `${WEBSITE.domain}/zh${path}`
}

/**
 * The hreflang cluster for one page. Google requires reciprocity, so every
 * language version carries the same full set, itself included.
 */
function alternates(path: string, available: readonly Lang[] = langs) {
  return {
    languages: {
      ...Object.fromEntries(
        available.map((lang) => [lang, localize(path, lang)]),
      ),
      'x-default': localize(path, 'en'),
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  // `posts` is sorted newest-first.
  const lastModified = posts[0]?.data.date

  const pages: MetadataRoute.Sitemap = ['', '/posts'].flatMap((path) =>
    langs.map((lang) => ({
      url: localize(path, lang),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.9,
      alternates: alternates(path),
    })),
  )

  // `posts` holds every locale's pages; one entry per post is enough, the
  // translations hang off it as alternates.
  const basePosts = posts.filter((post) => post.locale === 'en')

  const postPages: MetadataRoute.Sitemap = basePosts.flatMap((rawPost) => {
    // Only claim the language versions that actually exist.
    const available = langs.filter((lang) =>
      source.getPage(rawPost.slugs, lang),
    )
    const ogPath = [
      ...rawPost.slugs.slice(0, -1),
      `${rawPost.slugs.at(-1)}/opengraph-image`,
    ].join('/')

    return available.map((lang) => ({
      url: localize(rawPost.url, lang),
      lastModified: rawPost.data.date,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: alternates(rawPost.url, available),
      images: [localize(`/posts/og/${ogPath}`, lang)],
    }))
  })

  return [...pages, ...postPages]
}
