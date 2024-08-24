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
                <ul>
                  {category.posts.map((post) => (
                    <li
                      data-umami-event={`click-posts-${post.slug}`}
                      key={post.slug}
                    >
                      <a href={post.url}>{post.frontmatter.title}</a>
                    </li>
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
