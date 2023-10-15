import type { MDXComponents } from "mdx/types";
import Header from "~/components/Header";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Header: (props: { title: string }) => {
      const { title = "" } = props;

      return <Header title={title} />;
    },
    ...components,
  };
}
