import { MarkdownPost } from "../../components/MarkdownPost";
import { generateMDXPageConfig } from "~/utils";

const { getCurrentNote, generateMetadata, generateStaticParams } =
  await generateMDXPageConfig("blog");

export { generateMetadata, generateStaticParams };

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const note = getCurrentNote(params.slug);

  return <MarkdownPost note={note} />;
}
