import data from "./data.json";
import type { TAG } from "~/types";

export interface ListItem {
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
}

export type List = ListItem[];

export interface Notes {
  list: List;
}

export function getNotes() {
  return data as any as Notes;
}

export function getNotesByTag(tag: TAG) {
  const notes = getNotes();

  return {
    ...notes,
    list: notes.list.filter((note) => note.metadata.content.tags.includes(tag)),
  };
}
