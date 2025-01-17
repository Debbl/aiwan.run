import RSS from "rss";
import { WEBSITE } from "~/constants";
import { getPosts } from "../posts/_data";
import { markdownToHtml } from "./markdown";

export const dynamic = "force-static";

export async function GET() {
  const feed = new RSS({
    title: "Brendan Dash",
    description: "Brendan Dash's Blog",
    categories: ["blog", "TIL"],
    site_url: WEBSITE.domain,
    feed_url: `${WEBSITE.domain}/feed.xml`,
    language: "zh-CN",
    generator: "PHP 9.0",
    custom_elements: [
      {
        follow_challenge: [
          {
            feedId: "67028040212142080",
          },
          {
            userId: "55825808031657984",
          },
        ],
      },
    ],
  });
  const { posts } = await getPosts();

  posts.forEach((post) => {
    const slug = post.slug;

    const data: RSS.ItemOptions = {
      title: post.title,
      guid: `${post.slug}`,
      author: "me@aiwan.run (Brendan Dash)",
      url: `${WEBSITE.domain}/posts/${slug}`,
      description: post.title,
      date: post.date,
      categories: [post.category],
      custom_elements: [
        {
          "content:encoded": {
            _cdata: markdownToHtml(post.content, post.path),
          },
        },
      ],
    };

    // if (p.coverImgUrl) data.enclosure = { url: p.coverImgUrl };

    feed.item(data);
  });

  return new Response(feed.xml(), {
    headers: {
      "content-type": "application/xml", // this header set by netlify.toml
    },
  });
}
