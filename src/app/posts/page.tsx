import { format } from "date-fns";
import Link from "~/components/Link";
import { Meteors } from "~/components/magicui/Meteors";
import { getPosts } from "./_data";

export default async function Page() {
  const { posts } = await getPosts();

  const postsByCategory = [
    {
      title: "Blog",
      posts: posts.filter((p) => p.category === "blog"),
    },
    {
      title: "TIL",
      posts: posts.filter((p) => p.category === "TIL"),
    },
  ];

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 size-full overflow-hidden">
        <Meteors number={30} />
      </div>

      <main className="relative flex-1 overflow-y-scroll">
        <div className="flex min-h-full w-full items-center justify-center">
          <div className="flex w-fit flex-col items-start justify-center gap-y-8 py-8">
            {postsByCategory.map((category) => (
              <div key={category.title} title={category.title}>
                <h2 className="text-3xl font-bold">{category.title}</h2>
                <ul className="mt-4 flex flex-col gap-y-2">
                  {category.posts.map((post) => (
                    <Link
                      className="opacity-60 hover:opacity-100"
                      href={post.slug}
                      key={post.slug}
                    >
                      <li
                        className="text-gray-900 hover:text-primary dark:text-gray-50 dark:hover:text-primary"
                        data-umami-event={`click-posts-${post.slug}`}
                      >
                        <span>{post.title}</span>
                        <span className="ml-4 text-xs text-gray-500">
                          {format(post.date, "MMM-dd")}
                          {" · "}
                          {post.duration}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
