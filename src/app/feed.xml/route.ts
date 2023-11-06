import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "Brendan Dash",
    description: "Brendan Dash's Blog",
    site_url: "https://aiwan.run/",
    feed_url: "https://aiwan.run/feed.xml",
    language: "zh-CN",
    generator: "PHP 9.0",
  });

  return new Response(feed.xml(), {
    headers: {
      "content-type": "application/xml",
    },
  });
}
