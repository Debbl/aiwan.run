import path from "node:path";
import { globby } from "globby";
import { mdxBundler } from "~/utils/mdxBundler";

export type Category = "posts" | "til";

// eslint-disable-next-line n/prefer-global/process
const rootPath = path.join(process.cwd(), "src/app/\\(MDX\\)");

export async function getAllPosts() {
  const postsPath = await globby(`${rootPath}/**/*.mdx`);

  const posts = await Promise.all(
    postsPath.map(async (p) => {
      const pathArr = p.split("/");
      const markdownIndex = pathArr.indexOf("Markdown");

      const fileName = pathArr[markdownIndex + 1];
      const category = pathArr[markdownIndex - 1] as Category;
      const url = `/${category}/${fileName}`;

      return {
        ...(await mdxBundler(p)),
        category,
        slug: fileName,
        url,
      };
    }),
  );

  return posts;
}

export const allPosts = await getAllPosts();
