import { visit } from 'unist-util-visit'
import type { Heading as MDASTHeading, Root } from 'mdast'
import type { Plugin } from 'unified'

export interface Heading {
  depth: MDASTHeading['depth']
  value: string
  id: string
}

// const getFlattenedValue = (node: Parent): string =>
//   node.children
//     .map((child) => ('children' in child ? getFlattenedValue(child as Parent) : 'value' in child ? child.value : ''))
//     .join('')

export const remarkHasInH1: Plugin<[], Root> = () => {
  // let title: string = ''
  // let hasJsxInH1: boolean = false

  return (tree, file, done) => {
    visit(
      tree,
      [
        'heading',
        // push partial component's __toc export name to headings list
        'mdxJsxFlowElement',
        // verify .md/.mdx exports and attach named __toc export
        'mdxjsEsm',
      ],
      (node, index, _parent) => {
        if (node.type === 'heading') {
          if (node.depth === 1 && typeof index === 'number') {
            // const hasJsx = node.children.some((child: { type: string }) => child.type === 'mdxJsxTextElement')
            // if (hasJsx) {
            //   hasJsxInH1 = true
            // }
            // title = getFlattenedValue(node)
            // tree.children.splice(index, 1)
          }
        }
      },
    )

    done()
  }
}
