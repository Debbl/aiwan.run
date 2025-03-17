import { getMDXComponents } from "~/components/mdx";
import type { MDXComponents } from "mdx/types";

// eslint-disable-next-line react-hooks-extra/no-useless-custom-hooks
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...getMDXComponents(),
  };
}
