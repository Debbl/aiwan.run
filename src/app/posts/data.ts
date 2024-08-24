import path from "node:path";
import { globby } from "globby";
import { mdxBundler } from "~/lib";

export type Category = "blog" | "til";
export interface Post {
  code: string;
  frontmatter: {
    date: string;
    title: string;
    duration: string;
  };
  category: Category;
  slug: string;
  url: string;
}
export type Posts = Post[];

// eslint-disable-next-line n/prefer-global/process
const rootPath = path.join(process.cwd(), "src/app/posts");

export async function getAllPosts() {
  const postsPath = await globby(`${rootPath}/**/*.md?(x)`);

  const posts = await Promise.all(
    postsPath
      .map((p) => path.parse(p))
      .map(async (p) => {
        const fileName = p.name;
        const category = p.dir.split("/").at(-1) as Category;
        const url = `/posts/${fileName}`;

        return {
          ...(await mdxBundler(path.resolve(p.dir, p.base))),
          category,
          slug: fileName,
          url,
        };
      }),
  );

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  return posts;
}
