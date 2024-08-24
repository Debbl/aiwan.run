import { getMDXComponent } from "mdx-bundler/client";
import type { Metadata } from "next";
import { format } from "date-fns";
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
    <main className="px-40 py-10">
      <article>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {post.frontmatter.title}
        </h1>
        <p className="mt-2 text-gray-600">
          <span>{format(post.frontmatter.date, "MMM-dd")}</span>
          {" · "}
          <span>{post.frontmatter.duration}</span>
        </p>
        <Component components={getMDXComponents()} />
      </article>
      <footer>
        <span className="font-bold opacity-50">&gt; </span>
        <a href="/posts" className="font-mono opacity-50 hover:opacity-75">
          cd ..
        </a>
      </footer>
    </main>
  );
}
