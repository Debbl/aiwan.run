import Link from "next/link";
import { getTilData } from "~/utils/getData";
import { format } from "~/utils/time";

export default function BlogPage() {
  const postsData = getTilData();

  return (
    <main className="mt-20 flex flex-col items-center">
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
