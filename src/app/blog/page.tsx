import Link from "next/link";
import { getPostsData } from "~/utils/getPostsData";

export default function BlogPage() {
  const postsData = getPostsData();

  return (
    <main className="mt-20 px-20">
      <ul>
        {postsData.map((post) => (
          <li key={post.url}>
            <Link href={post.url}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
