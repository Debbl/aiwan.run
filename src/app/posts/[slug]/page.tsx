import { format } from "date-fns";
import Link from "next/link";
import { allPosts } from "../data";
import type { Metadata } from "next";

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

export type Params = Promise<{ slug: string }>;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  const post = allPosts.find((p) => p.slug === slug)!;
  const { title, date, duration } = post.frontmatter;

  return (
    <main className="px-60 py-10">
      <article>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="mt-2 text-gray-600">
          <span>{format(date, "MMM-dd")}</span>
          {" · "}
          <span>{duration}</span>
        </p>
        {post.content}
      </article>
      <footer>
        <span className="font-bold opacity-50">&gt; </span>
        <Link href="/posts" className="font-mono opacity-50 hover:opacity-75">
          cd ..
        </Link>
      </footer>
    </main>
  );
}
