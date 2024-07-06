import type { Metadata } from "next/types";
import { getNotesByTag } from "~/data";
import type { TAG } from "~/types";

export async function generateMDXPageConfig(tag: TAG) {
  const { list } = getNotesByTag(tag);

  function getCurrentNote(slug: string) {
    const note = list.find(
      (note) =>
        note.metadata.content.attributes.find(
          (a) => a.trait_type === "xlog_slug",
        )?.value === slug,
    );
    return note;
  }

  async function generateMetadata({
    params,
  }: {
    params: { slug: string };
  }): Promise<Metadata> {
    const note = getCurrentNote(params.slug);

    if (!note) return {};

    return {
      title: note.metadata.content.title,
      description: note.metadata.content.summary,
    };
  }

  async function generateStaticParams() {
    return list.map((note) => ({
      slug:
        note.metadata.content.attributes.find(
          (a) => a.trait_type === "xlog_slug",
        )?.value ?? "",
    }));
  }

  const slugs = list.map(
    (note) =>
      note.metadata.content.attributes.find((a) => a.trait_type === "xlog_slug")
        ?.value ?? "",
  );

  return {
    list,
    slugs,
    getCurrentNote,
    generateMetadata,
    generateStaticParams,
  };
}
