import { MDXRemote } from "next-mdx-remote/rsc";
import MDXSandpack from "~/components/MDXSandpack";
import type { SandpackProps } from "~/types";

function useMDXComponent(source: string) {
  const components = {
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

      return <MDXSandpack files={files} {..._props} />;
    },
  };

  const MDXContent = () => (
    <MDXRemote components={components} source={source} />
  );

  return {
    MDXContent,
  };
}

export { useMDXComponent };
