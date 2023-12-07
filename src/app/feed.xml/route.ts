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
    const data: RSS.ItemOptions = {
      title: p.title,
      guid: p._id,
      author: p.author ?? "me@aiwan.run (Brendan Dash)",
      url: WEBSITE.domain + p.url,
      description: p.description,
      date: p.date,
      categories: [p.category],
      custom_elements: [
        {
          "content:encoded": {
            _cdata: p.html,
          },
        },
      ],
    };

    if (p.coverImgUrl) data.enclosure = { url: p.coverImgUrl };

    feed.item(data);
  });

  return new Response(feed.xml(), {
    headers: {
      "content-type": "application/xml",
    },
  });
}
