import { readFileSync } from "node:fs";
import path from "node:path";
import { globbySync } from "globby";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { VFile } from "vfile";
import { rehypePre, remarkHeadings, remarkStaticImage } from "~/lib/MDXPlugins";
import { getMDXComponents } from "../components";
import { postRootPath } from "./constants";
import { images } from "./generateImages";
import type { Category, Frontmatter, Posts } from "./types";

const isDev = false;
const postsPath = globbySync(`${postRootPath}/**/*.md?(x)`).filter(
  (v) => v.includes("playground") || !isDev,
);

export async function getAllPosts(): Promise<Posts> {
  return Promise.all(
    postsPath.map(async (p) => {
      const content = readFileSync(p, "utf8");
      const { name, dir } = path.parse(p);

      const dirArr = dir.split("/");
      const markdownDirIndex = dirArr.findIndex((d) => d === "Markdown");
      const category = dirArr[markdownDirIndex + 1] as Category;

      const vFile = new VFile({
        path: p,
        value: content,
      });

      const mdxSource = await compileMDX<Frontmatter>({
        source: vFile,
        options: {
          mdxOptions: {
            remarkPlugins: [
              [remarkHeadings, { isRemoteContent: false }],
              remarkGfm,
              remarkStaticImage,
            ],
            rehypePlugins: [rehypePre],
            format: "mdx",
            baseUrl: dir,
          },
          parseFrontmatter: true,
          scope: {
            images,
          },
        },
        components: getMDXComponents(),
      });

      return {
        ...mdxSource,
        path: p,
        source: content,
        slug: name,
        url: `/posts/${name}`,
        category,
      };
    }),
  );
}

export const allPosts = await getAllPosts();
