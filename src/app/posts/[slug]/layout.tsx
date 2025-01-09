import { allPosts } from "../_data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: post.frontmatter.title,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
