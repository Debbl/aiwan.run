import { visit } from "unist-util-visit";
import type { Root } from "hast";

export function rehypePre() {
  return function (tree: Root) {
    visit(tree, "element", (node, index, parent) => {
      if (
        parent &&
        index &&
        node.tagName === "pre" &&
        (node.children?.[0] as any).tagName === "code"
      ) {
        const code = node.children[0] as any;
        const data = code.data;
        node.properties = {
          ...node.properties,
          ...data,
        };
      }
    });
  };
}
