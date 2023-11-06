import RSS from "rss";
import { website } from "~/constants";
import { getPostsData } from "~/utils/getPostsData";

export async function GET() {
  const feed = new RSS({
    title: "Brendan Dash",
    description: "Brendan Dash's Blog",
    site_url: "https://aiwan.run/",
    feed_url: "https://aiwan.run/feed.xml",
    language: "zh-CN",
    generator: "PHP 9.0",
  });

  const postsData = getPostsData();
  postsData.forEach((data) => {
    feed.item({
      title: data.title,
      guid: website.domain + data.guid,
      url: website.domain + data.url,
      description: data.description,
      date: data.date,
      enclosure: {
        url: data.enclosure.url,
      },
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "content-type": "application/xml",
    },
  });
}
