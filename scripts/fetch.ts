/**
 * fetch blog data from https://debbl.xlog.app/
 */

import { writeFile } from "node:fs/promises";
import MarkdownIt from "markdown-it";

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

const endpoint = "https://indexer.crossbell.io/v1";

const headers = new Headers();
// eslint-disable-next-line n/prefer-global/process
const CROSSBELL_TOKEN = process.env.CROSSBELL_TOKEN;
headers.set("Authorization", `Bearer ${CROSSBELL_TOKEN}`);

async function getSummary({ cid, lang }: { cid: string; lang: string }) {
  const res = await fetch(
    `https://xlog.app/api/summary?cid=${cid}&lang=${lang}`,
    {
      method: "GET",
      headers: new Headers({
        "referer": `https://link.bilibili.com/p/center/index?visit_id=22ast2mb9zhc`,
        "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Shiro`,
      }),
    },
  );
  const data = (await res.json()) as { summary?: string };
  return data.summary ?? "";
}

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
          summary = await getSummary({
            cid: note.metadata.uri.slice(7),
            lang: "zh",
          });
        }

        const slug =
          note.metadata.content.attributes.find(
            (a) => a.trait_type === "xlog_slug",
          )?.value ?? "";

        const html = md.render(content);

        console.log("fetch:", note.metadata.content.title);

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

  writeFile("src/data/data.json", JSON.stringify(data, null, 2));
}

getNotes();
