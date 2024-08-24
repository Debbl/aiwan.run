import path from "node:path";
import { globby } from "globby";
import { mdxBundler } from "~/lib";

export type Category = "posts" | "til";

// eslint-disable-next-line n/prefer-global/process
const rootPath = path.join(process.cwd(), "src/app/\\(MDX\\)");

export async function getAllPosts() {
  const postsPath = await globby(`${rootPath}/**/*.md?(x)`);

  const posts = await Promise.all(
    postsPath
      .map((p) => path.parse(p))
      .map(async (p) => {
        const fileName = p.name;
        const category = p.dir.split("/").at(-2) as Category;
        const url = `/${category}/${fileName}`;

        return {
          ...(await mdxBundler(path.resolve(p.dir, p.base))),
          category,
          slug: fileName,
          url,
        };
      }),
  );

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

export const allPosts = await getAllPosts();
