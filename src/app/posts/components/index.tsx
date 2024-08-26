import type { MDXComponents } from "mdx/types";
import { cn } from "twl";
import { Link } from "./Link";
import { Code } from "./Code";
import { Image } from "./Image";
import { HeadingLink } from "./HeadingLink";
import { Pre } from "./Pre";
import { Sandpack } from "./Sandpack";
import type { SandpackProps } from "~/types";

export function getMDXComponents(): MDXComponents {
  return {
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
          "mt-6 border-gray-300 mb-4 italic px-4 border-l-2 text-gray-700 dark:border-gray-700 dark:text-gray-400",
          "first:mt-0 ltr:border-l-2 ltr:pl-6 rtl:border-r-2 rtl:pr-6",
        )}
        {...props}
      />
    ),
    hr: (props) => <hr {...props} />,
    a: Link,
    p: (props) => <p className="mt-6 leading-7 first:mt-0" {...props} />,
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
    Image,
    pre: (props: any) => <Pre {...props} />,
    code: Code,
  };
}
