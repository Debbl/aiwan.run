/* eslint-disable @next/next/no-img-element */
import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeHighlight } from "~/components/CodeHighlight";
import MDXSandpack from "~/components/MDXSandpack";
import { MagicCard } from "~/components/magicui/MagicCard";
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

      return (
        <MagicCard className="p-2">
          <img {...props} src={src} />
        </MagicCard>
      );
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
