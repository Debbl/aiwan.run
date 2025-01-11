"use client";
import { format } from "date-fns";
import Link from "next/link";
import { useRef } from "react";
import { DotPattern } from "~/components/magicui/DotPattern";
import { m, useScroll } from "~/lib/motion";
import type { Post } from "../../_data/types";

export default function Content({ post }: { post: Post }) {
  const { title, date, duration } = post.frontmatter;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <m.div
        className="fixed inset-x-0 top-0 z-10 h-0.5 origin-left bg-primary"
        style={{ scaleX: scrollYProgress as any }}
      />

      <DotPattern width={30} height={30} />

      <div className="relative flex-1 overflow-y-scroll" ref={containerRef}>
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
            <Link
              href="/posts"
              className="font-mono opacity-50 hover:opacity-75"
            >
              cd ..
            </Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
