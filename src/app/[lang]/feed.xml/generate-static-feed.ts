import RSS from 'rss'
import { WEBSITE } from '~/constants'
import { posts, source } from '~/lib/source'
import { markdownToHtml } from './markdown'

export async function generateStaticFeed(lang: 'en' | 'zh' = 'en') {
  const feed = new RSS({
    title: 'Brendan Dash',
    description: "Brendan Dash's Blog",
    categories: ['blog', 'TIL'],
    site_url: WEBSITE.domain,
    feed_url: `${WEBSITE.domain}/feed.xml`,
    language: 'zh-CN',
    generator: 'PHP 9.0',
    custom_elements: [
      {
        follow_challenge: [
          {
            feedId: '67028040212142080',
          },
          {
            userId: '55825808031657984',
          },
        ],
      },
    ],
  })

  posts.forEach(async (rawPost) => {
    const post = source.getPage(rawPost.slugs, lang)

    if (!post) return

    const slug = post.url

    const slugs = post.slugs
    const ogImgPath = [...slugs.slice(0, -1), `${slugs.at(-1)}.png`].join('/')

    const data: RSS.ItemOptions = {
      title: post.data.title,
      guid: `${post.url}`,
      author: 'me@aiwan.run (Brendan Dash)',
      url: `${WEBSITE.domain}${slug}`,
      description: post.data.title,
      date: post.data.date,
      categories: [rawPost.category],
      custom_elements: [
        {
          'content:encoded': {
            _cdata: markdownToHtml(
              (await post.data.getText('raw')) || '',
              post.absolutePath,
            ),
          },
        },
      ],

      enclosure: {
        url: `${WEBSITE.domain}/og/${ogImgPath}`,
      },
    }

    feed.item(data)
  })

  return new Response(feed.xml(), {
    headers: {
      'content-type': 'application/xml', // this header set by netlify.toml
    },
  })
}
