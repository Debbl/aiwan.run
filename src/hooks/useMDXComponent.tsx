import { useMDXComponent as _useMDXComponent } from "next-contentlayer/hooks";
import MDXSandpack from "~/components/MDXSandpack";
import type { SandpackProps } from "~/types";

function useMDXComponent(code: string) {
  const MDXContentBase = _useMDXComponent(code);

  const MDXContent = () => (
    <MDXContentBase
      components={{
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
      }}
    />
  );

  return MDXContent;
}

export { useMDXComponent };
