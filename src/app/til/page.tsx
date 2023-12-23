import Link from "next/link";
import { getPostsByCategory } from "~/utils";
import { format } from "~/utils/time";

export default function BlogPage() {
  const posts = getPostsByCategory("TIL");

  return (
    <main className="mt-20 flex flex-col items-center">
      <div className="mt-10">
        <ul>
          {posts.map((post) => (
            <li key={post._id} className="text-xl hover:text-primary">
              <Link href={post.url}>
                <span>{post.title}</span>
                <span className="ml-6 text-sm">
                  <span>{format(new Date(post.date), "yyyy-MM-dd")}</span>
                  <span>{" · "}</span>
                  <span>{`${post.duration}min`}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
