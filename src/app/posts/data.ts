import path from "node:path";
import { readFileSync } from "node:fs";
import { globbySync } from "globby";
import type { CompileMDXResult } from "next-mdx-remote/rsc";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { remarkHeadings } from "~/lib/MDXPlugins";
import { getMDXComponents } from "~/components/MDX";

export type Category = "blog" | "til";

export interface Frontmatter {
  title: string;
  date: string;
  duration: string;
}

export interface Post extends CompileMDXResult<Frontmatter> {
  url: string;
  slug: string;
  category: Category;
}

export type Posts = Post[];

// eslint-disable-next-line n/prefer-global/process
const rootPath = path.join(process.cwd(), "src/app/posts");

export async function getAllPosts(): Promise<Posts> {
  const postsPath = globbySync(`${rootPath}/**/*.md?(x)`);

  return Promise.all(
    postsPath.map(async (p) => {
      const content = readFileSync(p, "utf8");
      const { name, dir } = path.parse(p);

      const category = dir.split("/").pop() as Category;

      const mdxSource = await compileMDX<Frontmatter>({
        source: content,
        options: {
          mdxOptions: {
            remarkPlugins: [
              [remarkHeadings, { isRemoteContent: false }],
              remarkGfm,
            ],
            rehypePlugins: [],
            format: "mdx",
          },
          parseFrontmatter: true,
        },
        components: getMDXComponents(),
      });

      return {
        ...mdxSource,
        slug: name,
        url: `/posts/${name}`,
        category,
      };
    }),
  );
}

export const allPosts = await getAllPosts();
