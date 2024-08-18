import type { MDXComponents } from "mdx/types";
import { cn } from "twl";
import { HeadingLink, Image, Pre } from "~/components/MDX";
import MDXSandpack from "~/components/MDX/MDXSandpack";
import type { SandpackProps } from "~/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        {...props}
      />
    ),
    h2: (props) => <HeadingLink tag="h2" {...props} />,
    h3: (props) => <HeadingLink tag="h3" {...props} />,
    h4: (props) => <HeadingLink tag="h4" {...props} />,
    h5: (props) => <HeadingLink tag="h5" {...props} />,
    h6: (props) => <HeadingLink tag="h6" {...props} />,
    ul: (props) => (
      <ul className="mt-6 list-disc first:mt-0 ltr:ml-6 rtl:mr-6" {...props} />
    ),
    ol: (props) => (
      <ol
        className="mt-6 list-decimal first:mt-0 ltr:ml-6 rtl:mr-6"
        {...props}
      />
    ),
    li: (props) => <li className="my-2" {...props} />,
    blockquote: (props) => (
      <blockquote
        className={cn(
          "mt-6 border-gray-300 italic text-gray-700 dark:border-gray-700 dark:text-gray-400",
          "first:mt-0 ltr:border-l-2 ltr:pl-6 rtl:border-r-2 rtl:pr-6",
        )}
        {...props}
      />
    ),
    hr: (props) => <hr {...props} />,
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
      const src = props.src.startsWith("ipfs")
        ? `/images/${props.src.slice(7)}.png`
        : props.src;

      return <Image {...props} src={src} />;
    },
    pre: (props: any) => <Pre {...props} />,
    ...components,
  };
}
