import { fromMarkdown } from "mdast-util-from-markdown";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import Slugger from "github-slugger";

const slugs = new Slugger();

interface MapItem {
  slug: string;
  depth: number;
}

export interface Item {
  slug: string;
  children?: Item[];
}

export type TocSlug = Item[];

function mapToTree(map: MapItem[]) {
  const root: { children?: TocSlug } = { children: [] };
  const stack = [root];

  const startIndex = Math.min(...map.map((i) => i.depth));
  const adjustedDepthMap = map.map((i) => ({
    ...i,
    depth: i.depth - startIndex + 1,
  }));

  adjustedDepthMap.forEach((item) => {
    const node: Item = { slug: item.slug };
    while (stack.length > item.depth) {
      stack.pop();
    }

    if (!stack[stack.length - 1].children)
      stack[stack.length - 1].children = [];
    stack[stack.length - 1].children!.push(node);

    stack.push(node);
  });

  return root.children;
}

export function getTocJson(content: string) {
  slugs.reset();
  const tree = fromMarkdown(content);

  const map: MapItem[] = [];

  visit(tree, "heading", (node) => {
    const value = toString(node, { includeImageAlt: false });
    const id = (node.data &&
      node.data.hProperties &&
      node.data.hProperties.id) as string;
    const slug = slugs.slug(id || value);

    map.push({ slug, depth: node.depth });
  });

  return mapToTree(map);
}
