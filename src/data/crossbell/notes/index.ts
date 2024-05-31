import MarkdownIt from "markdown-it";
import { endpoint, headers } from "../constants";
import type { TAG } from "~/types";

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

async function getNotes() {
  const response = await fetch(`${endpoint}/characters/59630/notes`, {
    headers,
  });

  const _data: {
    list: {
      noteId: number;
      createdAt: string;
      updatedAt: string;
      metadata: {
        uri: string;
        content: {
          name: string;
          tags: string[];
          title: string;
          content: string;
          attributes: {
            value: string;
            trait_type: string;
          }[];
          summary: string;
        };
      };
    }[];
  } = await response.json();

  const data = {
    ..._data,
    list: await Promise.all(
      _data.list.map(async (note) => {
        const content = note.metadata.content.content;
        const duration = Math.ceil(content.length / 246);

        let summary = note.metadata.content.summary;
        if (!summary) {
          const res = await fetch(
            `https://xlog.app/api/summary?cid=${note.metadata.uri.slice(
              7,
            )}&lang=zh`,
          );
          const { data } = await res.json();
          summary = data;
        }

        const slug =
          note.metadata.content.attributes.find(
            (a) => a.trait_type === "xlog_slug",
          )?.value ?? "";

        const html = md.render(content);

        return {
          ...note,
          metadata: {
            ...note.metadata,
            content: {
              ...note.metadata.content,
              duration,
              summary,
              slug,
              html,
            },
          },
        };
      }),
    ),
  };

  return data;
}

async function getNotesByTag(tag: TAG) {
  const notes = await getNotes();

  return {
    ...notes,
    list: notes.list.filter((note) => note.metadata.content.tags.includes(tag)),
  };
}

export { getNotes, getNotesByTag };
