import { allPosts } from "~/data";

export default function Page() {
  const posts = allPosts.filter((p) => p.category === "posts");

  return (
    <main className="flex h-full items-center justify-center">
      <ul>
        {posts.map((p) => (
          <li key={p.frontmatter.title}>
            <a href={p.url}>{p.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
