import type { Post } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";

function getPostsByCategory(category: "blog" | "TIL") {
  return allPosts.filter((post) => post.category === category);
}

function getPostBySlug(posts: Post[], slug: string) {
  return posts.find((post) => post.slug === slug);
}

function postUtils(category: "blog" | "TIL") {
  const posts = getPostsByCategory(category);
  return {
    posts,
    getPostBySlug: (slug: string) => getPostBySlug(posts, slug),
  };
}

export { getPostsByCategory, getPostBySlug, postUtils };
