import path from "node:path";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const remarkStaticImage: Plugin<[], Root> = () => (tree, file, done) => {
  const basename = path.parse(file.history[0]).dir.split("/").pop();

  visit(tree, "image", (node, index, parent) => {
    const imgKey = `__img_${basename}_${path.parse(node.url).name}`.replaceAll(
      "-",
      "_",
    );

    if (parent && typeof index === "number") {
      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Image",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "images",
            value: {
              type: "mdxJsxAttributeValueExpression",
              value: "images",
              data: {
                estree: {
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: { type: "Identifier", name: "images" },
                    },
                  ],
                },
              },
            },
          },
          {
            type: "mdxJsxAttribute",
            name: "imgKey",
            value: imgKey,
          },
        ],
      } as any;
    }
  });

  done();
};
