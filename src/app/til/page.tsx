import path from "node:path";
import fs from "node:fs";
import { globby } from "globby";
import { format } from "date-fns";
import { parseFrontmatter } from "~/utils";

// eslint-disable-next-line n/prefer-global/process
const rootPath = path.join(process.cwd(), "src/app/til/\\(MDX\\)");

export default async function Page() {
  const postsPath = await globby(`${rootPath}/**/*.mdx`);

  const posts = (
    await Promise.all(
      postsPath.map(async (p) => {
        const filename = p.split("/").at(-2);
        const url = `/til/${filename}`;
        const metadata = parseFrontmatter(fs.readFileSync(p, "utf-8"));

        return {
          ...metadata,
          url,
          time: format(metadata.frontmatter.date, "MM-dd"),
        };
      }),
    )
  ).sort(
    (a, b) =>
      new Date(a.frontmatter.date).getTime() -
      new Date(b.frontmatter.date).getTime(),
  );

  return (
    <main className="flex h-full items-center justify-center">
      <ul className="flex flex-col gap-y-3">
        {posts.map((post) => (
          <li
            key={post.frontmatter.title}
            className="group flex items-center gap-x-3 hover:text-primary"
          >
            <a href={post.url}>{post.frontmatter.title}</a>
            <div className="flex gap-x-2">
              <span className="group:hover:text-primary text-xs text-gray-400">
                {post.time}
              </span>
              <span className="group:hover:text-primary text-xs text-gray-400">
                {post.frontmatter.duration}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
