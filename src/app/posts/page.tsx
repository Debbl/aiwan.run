import { format } from "date-fns";
import type { Posts } from "./data";
import { getAllPosts } from "./data";

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
    <main className="flex h-full items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="flex flex-col">
          <div>
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
                        className="text-gray-900 hover:text-primary"
                        data-umami-event={`click-posts-${post.slug}`}
                      >
                        <span>{post.frontmatter.title}</span>
                        <span className="ml-4 text-xs text-gray-500">
                          {format(post.frontmatter.date, "MM-dd")}
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
      </div>
    </main>
  );
}
