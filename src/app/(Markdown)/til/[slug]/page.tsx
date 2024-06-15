import { MarkdownPost } from "../../components/MarkdownPost";
import { generateMDXPageConfig } from "~/utils";

const { getCurrentNote, generateMetadata, generateStaticParams } =
  await generateMDXPageConfig("TIL");

export { generateMetadata, generateStaticParams };

export default async function TILPage({
  params,
}: {
  params: { slug: string };
}) {
  const note = getCurrentNote(params.slug);

  return <MarkdownPost note={note} />;
}
