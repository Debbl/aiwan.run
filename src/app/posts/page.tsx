import { format } from "date-fns";
import { Meteors } from "~/components/magicui/Meteors";
import { getAllPosts } from "./_data";
import type { Posts } from "./_data/types";

export type PostsByCategory = {
  title: string;
  posts: Posts;
}[];

export default async function Page() {
  const allPosts = (await getAllPosts()).sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  const blogPosts = allPosts.filter((p) => p.category === "blog");
  const tilPosts = allPosts.filter((p) => p.category === "til");

  const postsByCategory: PostsByCategory = [
    {
      title: "Blog",
      posts: blogPosts,
    },
    {
      title: "TIL",
      posts: tilPosts,
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
                    <a
                      className="opacity-60 hover:opacity-100"
                      href={post.url}
                      key={post.slug}
                    >
                      <li
                        className="text-gray-900 hover:text-primary dark:text-gray-50 dark:hover:text-primary"
                        data-umami-event={`click-posts-${post.slug}`}
                      >
                        <span>{post.frontmatter.title}</span>
                        <span className="ml-4 text-xs text-gray-500">
                          {format(post.frontmatter.date, "MMM-dd")}
                          {" · "}
                          {post.frontmatter.duration}
                        </span>
                      </li>
                    </a>
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
