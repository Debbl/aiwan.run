import * as Twoslash from 'fumadocs-twoslash/ui'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Sandpack } from './components/mdx/sandpack'
import type { MDXComponents } from 'mdx/types'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: (props) => <ImageZoom {...(props as any)} />,
    ...Twoslash,
    // HTML `ref` attribute conflicts with `forwardRef`
    pre: ({ ref: _ref, ...props }) => {
      return (
        <CodeBlock {...props} keepBackground>
          <Pre>{props.children}</Pre>
        </CodeBlock>
      )
    },
    Sandpack,
    ...components,
  }
}
