import type { Plugin } from "unified";

const remarkMdxLayout: Plugin = () => {
  return (tree) => {
    // Create layout wrapper node
    const layoutWrapper = {
      type: "mdxjsEsm",
      value:
        "export default function MDXpage({ children }) {\n  return <MdxLayout frontmatter={frontmatter}>{children}</MdxLayout>\n}",
      data: {
        estree: {
          type: "Program",
          body: [
            {
              type: "ExportDefaultDeclaration",
              declaration: {
                type: "FunctionDeclaration",
                id: {
                  type: "Identifier",
                  name: "MDXpage",
                },
                expression: false,
                generator: false,
                async: false,
                params: [
                  {
                    type: "ObjectPattern",
                    properties: [
                      {
                        type: "Property",
                        method: false,
                        shorthand: true,
                        computed: false,
                        key: {
                          type: "Identifier",
                          name: "children",
                        },
                        kind: "init",
                        value: {
                          type: "Identifier",
                          name: "children",
                        },
                      },
                    ],
                  },
                ],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ReturnStatement",
                      argument: {
                        type: "JSXElement",
                        openingElement: {
                          type: "JSXOpeningElement",
                          attributes: [
                            {
                              type: "JSXAttribute",
                              name: {
                                type: "JSXIdentifier",
                                name: "frontmatter",
                              },
                              value: {
                                type: "JSXExpressionContainer",
                                expression: {
                                  type: "Identifier",
                                  name: "frontmatter",
                                },
                              },
                            },
                          ],
                          name: {
                            type: "JSXIdentifier",
                            name: "MdxLayout",
                          },
                          selfClosing: false,
                        },
                        closingElement: {
                          type: "JSXClosingElement",
                          name: {
                            type: "JSXIdentifier",
                            name: "MdxLayout",
                          },
                        },
                        children: [
                          {
                            type: "JSXExpressionContainer",
                            expression: {
                              type: "Identifier",
                              name: "children",
                            },
                          },
                        ],
                        data: {
                          _mdxExplicitJsx: true,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
          sourceType: "module",
          comments: [],
        },
      },
    };

    // Add nodes to the tree
    (tree as any).children.push(layoutWrapper);
  };
};

export { remarkMdxLayout };
