import { visit } from "unist-util-visit";
import type { Image } from "mdast";
import type { Plugin } from "unified";

interface RemarkStaticImageOptions {
  importPrefix?: string;
}

const remarkStaticImage: Plugin = (options: RemarkStaticImageOptions = {}) => {
  const { importPrefix = "." } = options;

  return (tree, _file) => {
    const imports = new Map<string, string>();
    let imageCounter = 0;

    visit(tree, "image", (node: Image) => {
      // Skip external images (starting with http:// or https://)
      if (node.url.startsWith("http://") || node.url.startsWith("https://")) {
        return;
      }

      let variableName = `__image${imageCounter++}`;
      const importPath = `${importPrefix}${node.url}`;

      if (imports.has(importPath)) {
        variableName = imports.get(importPath)!;
      } else {
        imports.set(importPath, variableName);
      }

      // Convert node to MDX JSX element
      const mdxNode = {
        type: "mdxJsxFlowElement",
        name: "Image",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "src",
            value: {
              type: "mdxJsxAttributeValueExpression",
              value: variableName,
              data: {
                estree: {
                  type: "Program",
                  sourceType: "module",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "Identifier",
                        name: variableName,
                      },
                    },
                  ],
                },
              },
            },
          },
          {
            type: "mdxJsxAttribute",
            name: "alt",
            value: node.alt || "",
          },
        ],
      };

      Object.assign(node, mdxNode);
    });

    // Add imports to the top of the file
    if (imports.size > 0) {
      const importNodes = [];
      for (const [importPath, variableName] of imports.entries()) {
        importNodes.push({
          type: "mdxjsEsm",
          data: {
            estree: {
              type: "Program",
              sourceType: "module",
              body: [
                {
                  type: "ImportDeclaration",
                  specifiers: [
                    {
                      type: "ImportDefaultSpecifier",
                      local: {
                        type: "Identifier",
                        name: variableName,
                      },
                    },
                  ],
                  source: {
                    type: "Literal",
                    value: importPath,
                  },
                },
              ],
            },
          },
        });
      }

      // Ensure next/image is imported first
      // const nextImageImport = {
      //   type: "mdxjsEsm",
      //   value: 'import Image from "next/image";',
      //   data: {
      //     estree: {
      //       type: "Program",
      //       sourceType: "module",
      //       body: [
      //         {
      //           type: "ImportDeclaration",
      //           specifiers: [
      //             {
      //               type: "ImportDefaultSpecifier",
      //               local: {
      //                 type: "Identifier",
      //                 name: "Image",
      //               },
      //             },
      //           ],
      //           source: {
      //             type: "Literal",
      //             value: "next/image",
      //           },
      //         },
      //       ],
      //     },
      //   },
      // };

      (tree as any).children.unshift(...importNodes);
    }
  };
};

export { remarkStaticImage };
