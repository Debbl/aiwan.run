import path from "node:path";
import process from "node:process";
import { globSync } from "glob";
import Link from "next/link";
import * as grayMatter from "gray-matter";

function getPostsRoutes() {
  const postsRoutes: Array<{ link: string; title: string }> = [];

  const postsPath = path.join(process.cwd(), "src/app/blog/(posts)/**/*.mdx");
  const routerPath = path.join(process.cwd(), "src/app/blog/(posts)");

  const postsFilesPaths = globSync(postsPath);

  postsFilesPaths.forEach((p) => {
    const metadata = grayMatter.read(p).data as { title: string };

    const link = `/blog/${path.relative(routerPath, path.dirname(p))}`;

    postsRoutes.push({ link, title: metadata?.title });
  });

  return postsRoutes;
}

export default function BlogPage() {
  const postsRoutes = getPostsRoutes();

  return (
    <main className="mt-20 px-20">
      <ul>
        {postsRoutes.map((route) => (
          <li key={route.link}>
            <Link href={route.link}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
