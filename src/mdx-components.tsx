import { getMDXComponents } from '~/components/mdx'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...getMDXComponents(),
  }
}
