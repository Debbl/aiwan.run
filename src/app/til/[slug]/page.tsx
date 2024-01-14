import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { getNotesByTag } from "~/data/crossbell/notes";
import { useMDXComponent } from "~/hooks/useMDXComponent";
import { format } from "~/utils/time";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { list } = await getNotesByTag("TIL");
  const note = list.find(
    (note) =>
      note.metadata.content.attributes.find((a) => a.trait_type === "xlog_slug")
        ?.value === params.slug,
  );

  if (!note) return {};

  return {
    title: note.metadata.content.title,
  };
}

export async function generateStaticParams() {
  const { list } = await getNotesByTag("TIL");

  return list.map((note) => ({
    slug:
      note.metadata.content.attributes.find((a) => a.trait_type === "xlog_slug")
        ?.value ?? "",
  }));
}

export default async function TILPage({
  params,
}: {
  params: { slug: string };
}) {
  const { list } = await getNotesByTag("TIL");
  const note = list.find(
    (note) =>
      note.metadata.content.attributes.find((a) => a.trait_type === "xlog_slug")
        ?.value === params.slug,
  );

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
      <header className="text-center">
        <h1 className="text-6xl">{content.title}</h1>
        <h3 className="text-gray-400">{content.summary}</h3>
        <div>
          <span>{dateStr}</span>
          <span>{" · "}</span>
          <span>{`${duration}min`}</span>
        </div>
      </header>

      <main className="markdown-body px-1 md:px-10 lg:px-32 xl:px-64">
        <MDXContent />
      </main>
    </>
  );
}
