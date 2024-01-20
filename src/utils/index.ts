import type { Metadata } from "next/types";
import type { TAG } from "~/types";
import { getNotesByTag } from "~/data/crossbell/notes";

async function generateMDXPageConfig(tag: TAG) {
  const { list } = await getNotesByTag(tag);

  async function generateMetadata({
    params,
  }: {
    params: { slug: string };
  }): Promise<Metadata> {
    const note = list.find(
      (note) =>
        note.metadata.content.attributes.find(
          (a) => a.trait_type === "xlog_slug",
        )?.value === params.slug,
    );

    if (!note) return {};

    return {
      title: note.metadata.content.title,
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

  function getCurrentNote(slug: string) {
    const note = list.find(
      (note) =>
        note.metadata.content.attributes.find(
          (a) => a.trait_type === "xlog_slug",
        )?.value === slug,
    );
    return note;
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

export { generateMDXPageConfig };
