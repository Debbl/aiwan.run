import { notFound } from "next/navigation";
import MarkdownToc from "./MarkdownToc";
import type { ListItem } from "~/data";
import { useMDXComponent } from "~/hooks/useMDXComponent";
import { format } from "~/utils/time";

export function MarkdownPost({ note }: { note?: ListItem }) {
  // 404 if the post does not exist.
  if (!note) notFound();

  const { createdAt, metadata } = note;

  const { content } = metadata;
  const { content: source, duration } = content;

  const time = new Date(createdAt);
  const dateStr = format(time, "yyyy-MM-dd");

  const { MDXContent } = useMDXComponent(source);

  return (
    <>
      <div className="px-8 md:px-10 lg:px-32 xl:px-64">
        <header className="text-center">
          <h1 className="text-4xl">{content.title}</h1>
          <div className="pt-3 text-gray-400">
            <span>{dateStr}</span>
            <span>{" · "}</span>
            <span>{`${duration}min`}</span>
          </div>

          {content.summary && (
            <div className="rounded-md border p-3 text-left text-sm text-gray-400">
              <div className=" text-black">AI 生成的摘要</div>
              <h3 className="pt-1">{content.summary}</h3>
            </div>
          )}
        </header>

        <main className="mt-3">
          <aside className="fixed left-4">
            <MarkdownToc content={source} />
          </aside>
          <article className="markdown-body">
            <MDXContent />
          </article>
        </main>
      </div>
    </>
  );
}
