import { visit } from 'unist-util-visit'
import type { Code } from 'mdast'
import type { Plugin } from 'unified'

const remarkMdxPre: Plugin = () => {
  return (tree) => {
    visit(tree, 'code', (node: Code) => {
      const getAttribute = (name: string, value: any) => {
        return {
          type: 'mdxJsxAttribute',
          name,
          value: {
            type: 'mdxJsxAttributeValueExpression',
            value,
            data: {
              estree: {
                type: 'Program',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Literal',
                      value,
                    },
                  },
                ],
              },
            },
          },
        }
      }

      const preNode = {
        type: 'mdxJsxFlowElement',
        name: 'Pre',
        attributes: Object.entries(node).map(([key, value]) =>
          getAttribute(key, value),
        ),
      }

      Object.assign(node, preNode)
    })
  }
}

export { remarkMdxPre }
