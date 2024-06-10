import { notFound } from "next/navigation";
import { useMDXComponent } from "~/hooks/useMDXComponent";
import { generateMDXPageConfig } from "~/utils";
import { format } from "~/utils/time";

const { getCurrentNote, generateMetadata, generateStaticParams } =
  await generateMDXPageConfig("blog");

export { generateMetadata, generateStaticParams };

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const note = getCurrentNote(params.slug);

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
      <div className="px-1 md:px-10 lg:px-32 xl:px-64">
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

        <main className="markdown-body mt-3">
          <MDXContent />
        </main>
      </div>
    </>
  );
}
