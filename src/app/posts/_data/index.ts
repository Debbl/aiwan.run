import { readFile } from "node:fs/promises";
import path from "node:path";
import { globby } from "globby";
import matter from "gray-matter";
import { postsRootPath } from "./constants";

interface Frontmatter {
  title: string;
  date: string;
  duration: string;
}

export async function getPosts() {
  const blogPaths = await globby(`${postsRootPath}/\\(blog\\)/**/*.md?(x)`);
  const TILPaths = await globby(`${postsRootPath}/\\(TIL\\)/**/*.md?(x)`);

  const getPost = async (postPath: string) => {
    const file = await readFile(postPath, "utf-8");
    const { data, content } = matter(file) as any as {
      data: Frontmatter;
      content: string;
    };

    const pageName = path.basename(path.parse(postPath).dir);
    const slug = `/posts/${pageName}`;

    return { ...data, path: postPath, slug, content };
  };

  const getPosts = async (paths: string[], category: string) => {
    return await Promise.all(
      paths.map(async (p) => ({
        ...(await getPost(p)),
        category,
      })),
    );
  };

  const posts = [
    ...(await getPosts(blogPaths, "blog")),
    ...(await getPosts(TILPaths, "TIL")),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
}
