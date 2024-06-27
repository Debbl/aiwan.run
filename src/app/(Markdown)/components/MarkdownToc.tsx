import type { TocSlug } from "~/lib/markdown";
import { getTocJson } from "~/lib/markdown";

export default function MarkdownToc({ content }: { content: string }) {
  const tocJson = getTocJson(content);

  function renderToc(toc: TocSlug) {
    return toc.map((item) => {
      return (
        <li key={item.slug}>
          <a href={`#${item.slug}`} className="hover:underline">
            {item.slug}
          </a>
          {item.children && (
            <ul className="pl-4">{renderToc(item.children)}</ul>
          )}
        </li>
      );
    });
  }

  if (!tocJson) return null;

  return <ul className="text-sm text-gray-500">{renderToc(tocJson)}</ul>;
}
