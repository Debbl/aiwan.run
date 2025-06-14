import RSS from 'rss'
import { WEBSITE } from '~/constants'
import { posts } from '~/lib/source'
import { markdownToHtml } from './markdown'

export const dynamic = 'force-static'

export async function GET() {
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

  posts.forEach((post) => {
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
      categories: [post.category],
      custom_elements: [
        {
          'content:encoded': {
            _cdata: markdownToHtml(
              post.data.content,
              post.data._file.absolutePath,
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
