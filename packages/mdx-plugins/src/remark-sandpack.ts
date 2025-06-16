import { visit } from 'unist-util-visit'
import type { BlockContent, DefinitionContent, Root } from 'mdast'
import type { Plugin } from 'unified'

export const remarkSandpack: Plugin<[], Root> = () => {
  return (tree, _file, done) => {
    visit(tree, 'mdxJsxFlowElement', (node, _index, _parent) => {
      if (node.name !== 'Sandpack') return

      const children = node.children
      const files: Record<string, string> = {}

      const fn = (node: BlockContent | DefinitionContent) => {
        if (node.type !== 'code') return

        const filename = node.meta?.split('=')[1] || 'index.js'
        const fileContent = node.value
        files[filename] = fileContent
      }

      if (Array.isArray(children)) {
        children.forEach((child) => {
          fn(child)
        })
      } else {
        fn(children)
      }

      Object.assign(node, {
        attributes: [
          ...node.attributes,
          {
            type: 'mdxJsxAttribute',
            name: 'files',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              value: JSON.stringify(files),
              data: {
                estree: {
                  type: 'Program',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ObjectExpression',
                        properties: Object.entries(files).map(
                          ([key, value]) => ({
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: key,
                            },
                            value: {
                              type: 'Literal',
                              value,
                            },
                            kind: 'init',
                          }),
                        ),
                      },
                    },
                  ],
                  sourceType: 'module',
                },
              },
            },
          },
        ],
        children: [],
      })
    })

    done()
  }
}
