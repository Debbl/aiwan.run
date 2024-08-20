import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import { rehypePicture, remarkHeadings } from "./MDXPlugins";

export interface Frontmatter {
  title: string;
  date: string;
  duration: string;
}

export async function mdxBundler(file: string) {
  return await bundleMDX<Frontmatter>({
    file,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkHeadings, { isRemoteContent: false }],
        remarkGfm,
      ];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePicture];

      return options;
    },
  });
}
