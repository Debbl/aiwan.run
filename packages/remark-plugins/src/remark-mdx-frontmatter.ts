// https://github.com/remcohaszing/remark-mdx-frontmatter/blob/main/src/remark-mdx-frontmatter.ts

import { name as isIdentifierName } from "estree-util-is-identifier-name";
import { valueToEstree } from "estree-util-value-to-estree";
import { parse as parseToml } from "toml";
import { parse as parseYaml } from "yaml";
import type { Literal, Root } from "mdast";
import type { Plugin } from "unified";

type FrontmatterParsers = Record<string, (value: string) => unknown>;

export interface RemarkMdxFrontmatterOptions {
  /**
   * If specified, the YAML data is exported using this name. Otherwise, each
   * object key will be used as an export name.
   */
  name?: string;

  /**
   * A mapping of node types to parsers.
   *
   * Each key represents a frontmatter node type. The value is a function that accepts the
   * frontmatter data as a string, and returns the parsed data.
   *
   * By default `yaml` nodes will be parsed using [`yaml`](https://github.com/eemeli/yaml) and
   * `toml` nodes using [`toml`](https://github.com/BinaryMuse/toml-node).
   */
  parsers?: FrontmatterParsers;

  format?: (data: any) => any;
}

/**
 * A remark plugin to expose frontmatter data as named exports.
 *
 * @param options Optional options to configure the output.
 * @returns A unified transformer.
 */
const remarkMdxFrontmatter: Plugin<[RemarkMdxFrontmatterOptions?], Root> = ({
  name = "frontmatter",
  parsers,
  format,
} = {}) => {
  if (!isIdentifierName(name)) {
    throw new Error(
      `Name should be a valid identifier, got: ${JSON.stringify(name)}`,
    );
  }

  const allParsers: FrontmatterParsers = {
    yaml: parseYaml,
    toml: parseToml,
    ...parsers,
  };

  return (ast) => {
    let data: unknown;
    let formatData: unknown;
    const node = ast.children.find((child) =>
      Object.hasOwn(allParsers, child.type),
    );

    if (node) {
      const parser = allParsers[node.type];

      const { value } = node as Literal;
      data = parser(value);
      if (format) {
        formatData = format(data);
      }

      if (name === "frontmatter") {
        data = formatData ?? data;
      }
    }

    ast.children.unshift({
      type: "mdxjsEsm" as any,
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "frontmatter" },
                    init: valueToEstree(data, { preserveReferences: true }),
                  },
                ],
              },
            },
            ...(name !== "frontmatter"
              ? [
                  {
                    type: "ExportNamedDeclaration",
                    specifiers: [],
                    declaration: {
                      type: "VariableDeclaration",
                      kind: "const",
                      declarations: [
                        {
                          type: "VariableDeclarator",
                          id: { type: "Identifier", name },
                          init: valueToEstree(formatData, {
                            preserveReferences: true,
                          }),
                        },
                      ],
                    },
                  },
                ]
              : []),
          ],
        },
      },
    });
  };
};

export { remarkMdxFrontmatter };
