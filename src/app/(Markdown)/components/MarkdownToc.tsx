import { toc } from "mdast-util-toc";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast } from "mdast-util-to-hast";
import type { Element, ElementContent, Nodes } from "hast";

export default function MarkdownToc({ content }: { content: string }) {
  const hastTree = toHast(toc(fromMarkdown(content)).map!);

  function renderAnchorElement(el: Element, key: number) {
    if (el.children) {
      const firstChild = el.children[0];
      const value = firstChild.type === "text" ? firstChild.value : "";

      return (
        <a key={key} {...el.properties}>
          {value}
        </a>
      );
    }

    return <a key={key} {...el.properties}></a>;
  }

  function renderParagraphElement(el: Element, key: number) {
    if (el.children) {
      return (
        <p key={key}>
          {el.children.map((c, index) => renderElement(c, index))}
        </p>
      );
    }
    return "";
  }

  function renderListItemElement(el: Element, key: number) {
    if (el.children) {
      return (
        <li key={key}>
          {el.children.map((c, index) => renderElement(c, index))}
        </li>
      );
    }
    return "";
  }

  function renderUnorderedListElement(el: Element, key: number) {
    if (el.children) {
      return (
        <ul key={key} className="pl-2">
          {el.children.map((c, index) => renderElement(c, index))}
        </ul>
      );
    }
    return "";
  }

  function renderElement(el: Element | ElementContent, key: number) {
    if (el.type !== "element") return "";

    if (el.tagName === "p") {
      return renderParagraphElement(el, key);
    }
    if (el.tagName === "li") {
      return renderListItemElement(el, key);
    }
    if (el.tagName === "a") {
      return renderAnchorElement(el, key);
    }
    if (el.tagName === "ul") {
      return renderUnorderedListElement(el, key);
    }
  }

  function renderToc(toc: Nodes) {
    if (toc.type !== "element") return "";

    if (toc.children) {
      return toc.children.map((c, index) => renderElement(c, index));
    }
    return "";
  }

  return <ul>{renderToc(hastTree)}</ul>;
}
