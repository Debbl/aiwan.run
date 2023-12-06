import RSS from "rss";
import { WEBSITE } from "~/constants";
import { getBlogData, getTilData } from "~/utils/getData";

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

  const blogData = getBlogData();
  const TILData = getTilData();
  blogData.forEach((data) => {
    feed.item({
      title: data.title,
      guid: WEBSITE.domain + data.guid,
      author: data.author ?? "me@aiwan.run (Brendan Dash)",
      url: WEBSITE.domain + data.url,
      categories: ["Blog"],
      description: data.description,
      date: data.date,
      enclosure: {
        url: data.enclosure.url,
      },
      custom_elements: [
        {
          "content:encoded": {
            _cdata: data.content,
          },
        },
      ],
    });
  });
  TILData.forEach((data) => {
    feed.item({
      title: data.title,
      guid: WEBSITE.domain + data.guid,
      author: data.author ?? "me@aiwan.run (Brendan Dash)",
      url: WEBSITE.domain + data.url,
      categories: ["TIL"],
      description: data.description,
      date: data.date,
      enclosure: {
        url: data.enclosure.url,
      },
      custom_elements: [
        {
          "content:encoded": {
            _cdata: data.content,
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
