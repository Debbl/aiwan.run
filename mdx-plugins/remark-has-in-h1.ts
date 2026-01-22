import { visit } from 'unist-util-visit'
import type { Heading as MDASTHeading, Root } from 'mdast'
import type { Plugin } from 'unified'

export interface Heading {
  depth: MDASTHeading['depth']
  value: string
  id: string
}

export const remarkHasInH1: Plugin<[], Root> = () => {
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
            tree.children.splice(index, 1)
          }
        }
      },
    )

    done()
  }
}
