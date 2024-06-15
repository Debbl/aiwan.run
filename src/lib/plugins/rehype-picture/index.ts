import type { Root } from "hast";
import { visit } from "unist-util-visit";

/**
 * Cover the paragraph to a picture element if it contains an image.
 */
export default function rehypePicture() {
  return function (tree: Root) {
    visit(tree, "element", (node, index, parent) => {
      if (
        parent &&
        index &&
        node.tagName === "p" &&
        node.children.some(
          (child) => (child as any as Element).tagName === "img",
        )
      ) {
        parent.children[index] = {
          type: "element",
          tagName: "picture",
          properties: {},
          children: node.children,
        };
      }
    });
  };
}
