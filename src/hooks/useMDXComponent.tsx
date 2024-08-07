import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import CodeHighlight from "~/components/CodeHighlight";
import MDXSandpack from "~/components/MDXSandpack";
import { MarkdownImage } from "~/components/MarkdownImage";
import rehypePicture from "~/lib/plugins/rehype-picture";
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
    pre: (props: any) => {
      return <CodeHighlight {...props} />;
    },
    img: (props: any) => {
      const src = `/images/${props.src.slice(7)}.png`;

      return <MarkdownImage {...props} src={src} />;
    },
  };

  const MDXContent = () => (
    <MDXRemote
      components={components}
      source={source}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypePicture, rehypeSlug],
        },
      }}
    />
  );

  return {
    MDXContent,
  };
}

export { useMDXComponent };
