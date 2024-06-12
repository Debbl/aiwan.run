import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
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
    img: (props: any) => {
      const src = `/images/${props.src.slice(7)}.png`;
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...props} src={src} />;
    },
  };

  const MDXContent = () => (
    <MDXRemote
      components={components}
      source={source}
      options={{
        mdxOptions: {
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: "one-dark-pro",
              },
            ],
          ],
        },
      }}
    />
  );

  return {
    MDXContent,
  };
}

export { useMDXComponent };
