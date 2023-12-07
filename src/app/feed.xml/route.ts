import { allPosts } from "contentlayer/generated";
import RSS from "rss";
import { WEBSITE } from "~/constants";

export async function GET() {
  const feed = new RSS({
    title: "Brendan Dash",
    description: "Brendan Dash's Blog",
    categories: ["blog", "TIL"],
    site_url: WEBSITE.domain,
    feed_url: `${WEBSITE.domain}/feed.xml`,
    language: "zh-CN",
    generator: "PHP 9.0",
  });

  allPosts.forEach((p) => {
    feed.item({
      title: p.title,
      guid: p._id,
      author: p.author ?? "me@aiwan.run (Brendan Dash)",
      url: WEBSITE.domain + p.url,
      description: p.description,
      date: p.date,
      enclosure: {
        url: p.url,
      },
      categories: [p.category],
      custom_elements: [
        {
          "content:encoded": {
            _cdata: p.body.raw,
          },
        },
      ],
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "content-type": "application/xml",
    },
  });
}
