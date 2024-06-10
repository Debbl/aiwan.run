import RSS from "rss";
import { WEBSITE } from "~/constants";
import { getNotes } from "~/data";

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
  const { list } = getNotes();

  list.forEach((note) => {
    const { metadata } = note;
    const { content } = metadata;
    const slug =
      content.attributes.find((a) => a.trait_type === "xlog_slug")?.value ?? "";

    const data: RSS.ItemOptions = {
      title: content.title,
      guid: `${note.noteId}`,
      author: content.name ?? "me@aiwan.run (Brendan Dash)",
      url: WEBSITE.domain + slug,
      description: content.summary,
      date: note.createdAt,
      categories: content.tags,
      custom_elements: [
        {
          "content:encoded": {
            _cdata: content.html,
          },
        },
      ],
    };

    // if (p.coverImgUrl) data.enclosure = { url: p.coverImgUrl };

    feed.item(data);
  });

  return new Response(feed.xml(), {
    headers: {
      "content-type": "application/xml",
    },
  });
}
