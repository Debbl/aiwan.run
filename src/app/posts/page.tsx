import { format } from "date-fns";
import { Meteors } from "~/components/magicui/Meteors";
import { getAllPosts } from "./_data";
import type { Posts } from "./_data/types";

export type PostsByCategory = {
  title: string;
  posts: Posts;
}[];

export default async function Page() {
  const allPosts = await getAllPosts();
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
      <Meteors number={30} />
      <main className="relative flex-1 overflow-y-scroll">
        <div className="mx-auto w-fit">
          {postsByCategory.map((category) => (
            <div className="mt-8" key={category.title} title={category.title}>
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
      </main>
    </>
  );
}
