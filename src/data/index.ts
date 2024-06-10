import data from "./data.json";
import type { TAG } from "~/types";

export function getNotes() {
  return data as any as {
    list: {
      noteId: number;
      createdAt: string;
      updatedAt: string;
      metadata: {
        uri: string;
        content: {
          name?: string;
          duration: number;
          tags: string[];
          title: string;
          content: string;
          attributes: {
            value: string;
            trait_type: string;
          }[];
          summary: string;
          slug: string;
          html: string;
        };
      };
    }[];
  };
}

export function getNotesByTag(tag: TAG) {
  const notes = getNotes();

  return {
    ...notes,
    list: notes.list.filter((note) => note.metadata.content.tags.includes(tag)),
  };
}
