"use client";
import { format } from "date-fns";
import Link from "next/link";
import { m, useScroll } from "~/lib/motion";
import type { Post } from "../data/types";

export default function Content({ post }: { post: Post }) {
  const { title, date, duration } = post.frontmatter;

  const { scrollYProgress } = useScroll();

  return (
    <>
      <m.div
        className="fixed inset-x-0 top-0 z-10 h-1 origin-left bg-primary"
        style={{ scaleX: scrollYProgress as any }}
      />
      <main className="px-6 py-10 sm:px-60">
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
    </>
  );
}
