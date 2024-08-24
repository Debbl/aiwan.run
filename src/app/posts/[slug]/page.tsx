import { getMDXComponent } from "mdx-bundler/client";
import type { Metadata } from "next";
import { getAllPosts } from "../data";
import { getMDXComponents } from "~/components/MDX";

const allPosts = await getAllPosts();

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = allPosts.find((p) => p.slug === params.slug)!;

  if (!post) return {};

  return {
    title: post.frontmatter.title,
  };
}

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug)!;

  const Component = getMDXComponent(post.code || "");

  return (
    <article className="px-40">
      <Component components={getMDXComponents()} />
    </article>
  );
}
