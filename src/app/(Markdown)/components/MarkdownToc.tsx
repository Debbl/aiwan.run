import type { TocSlug } from "~/lib/markdown";
import { getTocJson } from "~/lib/markdown";

export default function MarkdownToc({ content }: { content: string }) {
  const tocJson = getTocJson(content);

  function renderToc(toc: TocSlug) {
    return toc.map((item) => {
      return (
        <li key={item.slug} className="hover:underline">
          <a href={`#${item.slug}`}>{item.slug}</a>
          {item.children && <ul>{renderToc(item.children)}</ul>}
        </li>
      );
    });
  }

  if (!tocJson) return null;

  return <ul>{renderToc(tocJson)}</ul>;
}
