import type { MDXComponents } from "mdx/types";
import Main from "./app/blog/(posts)/components/Main";
import Header from "~/app/blog/(posts)/components/Header";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Header: (props: {
      title: string;
      description: string;
      date: string;
      duration: number;
    }) => {
      return <Header {...props} />;
    },

    Main: ({ children }: { children: React.ReactNode }) => {
      return <Main>{children}</Main>;
    },

    ...components,
  };
}
