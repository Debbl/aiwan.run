import Link from "next/link";
import { getTilsData } from "~/utils/getTilsData";
import { format } from "~/utils/time";

export default function BlogPage() {
  const postsData = getTilsData();

  return (
    <main className="mt-20 flex flex-col items-center">
      <h1 className="text-3xl">Posts</h1>
      <div className="mt-10">
        <ul>
          {postsData.map((post) => (
            <li key={post.url} className="text-xl hover:text-primary">
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