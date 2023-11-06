import type { MDXComponents } from "mdx/types";
import type { SandpackInternal } from "@codesandbox/sandpack-react/types";
import Main from "~/app/blog/(posts)/components/Main";
import Sandpack from "~/app/blog/(posts)/components/Sandpack";
import Header from "~/app/blog/(posts)/components/Header";

interface SandpackChildrenProps {
  filename?: string;
  children: { props: { children: string } };
}

type SandpackInternalParams = Parameters<SandpackInternal>[0];

interface SandpackProps extends SandpackInternalParams {
  children:
    | Array<{
        props: SandpackChildrenProps;
      }>
    | { props: SandpackChildrenProps };
}

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

    Sandpack: (props: SandpackProps) => {
      const { children, ..._props } = props;

      const files: Record<string, string> = {};

      if (Array.isArray(children)) {
        children.forEach((child) => {
          const filename = child.props.filename || "index.js";
          const fileContent = child.props.children.props.children;
          files[filename] = fileContent;
        });
      } else {
        const filename = children.props.filename || "index.js";
        const fileContent = children.props.children.props.children;
        files[filename] = fileContent;
      }

      return <Sandpack files={files} {..._props} />;
    },

    ...components,
  };
}
