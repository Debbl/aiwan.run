import { bundleMDX } from "mdx-bundler";

export interface Frontmatter {
  title: string;
  date: string;
  duration: string;
}

export async function mdxBundler(file: string) {
  return await bundleMDX<Frontmatter>({
    file,
  });
}
