import { createHash } from "node:crypto";
import path from "node:path";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";

export const remarkStaticImage: Plugin<[], Root> = () => (tree, file, done) => {
  const basename = path.parse(file.history[0]).dir.split("/").pop();

  visit(tree, "image", (node, index, parent) => {
    const imgKey = `__img_${basename}_${path.parse(node.url).name}`.replaceAll(
      "-",
      "_",
    );

    const hash = createHash("sha256")
      .update(imgKey)
      .digest("hex")
      .substring(0, 7)
      .padStart(11, "img_");

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
            value: hash,
          },
        ],
      } as any;
    }
  });

  done();
};
