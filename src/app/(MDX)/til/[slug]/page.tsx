import { getMDXComponent } from "mdx-bundler/client";
import { getMDXComponents } from "~/components/MDX";
import { allPosts } from "~/data";

const posts = allPosts.filter((p) => p.category === "til");

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)!;

  const Component = getMDXComponent(post.code || "");

  return (
    <article className="px-40">
      <Component components={getMDXComponents()} />
    </article>
  );
}
