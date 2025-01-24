"use server";
import { rendererClassic, transformerTwoslash } from "@shikijs/twoslash";
import parse from "html-react-parser";
import { bundledLanguages, createHighlighter } from "shiki";
import { cn } from "~/lib/utils";
import CopyButton from "./CopyButton";
import type { JSX } from "react";

const highlighter = await createHighlighter({
  themes: ["one-dark-pro"],
  langs: Object.keys(bundledLanguages),
});

function parseMeta(meta?: string) {
  if (!meta) return {};

  const filenameRegex = /filename="(.+)"/;
  const isTwoslash = /twoslash/.test(meta);

  return {
    filename: filenameRegex.test(meta) ? meta.match(filenameRegex)![1] : "",
    isTwoslash,
  };
}

export async function Pre({
  lang,
  meta = "",
  value,
}: {
  lang: string;
  meta: string;
  value: string;
}) {
  // console.log("🚀 ~ lang:", lang);

  const { filename, isTwoslash } = parseMeta(meta);

  const _TwoslashTransformer = isTwoslash
    ? [
        transformerTwoslash({
          renderer: rendererClassic(),
        }),
      ]
    : [];

  const renderedHTML = highlighter.codeToHtml(value, {
    lang,
    theme: "one-dark-pro",
    transformers: [],
  });

  const preJSXElement = parse(renderedHTML) as JSX.Element;

  return (
    <div className="relative mt-6 overflow-hidden rounded-xl first:mt-0">
      <div className="top-0 z-[1] flex w-full items-center justify-between truncate bg-gray-200/80 px-4 py-2 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-200">
        <span>{filename}</span>

        <span>{lang}</span>
      </div>

      <div className={cn(`language-${lang}`, "relative")}>
        <CopyButton
          className="absolute right-2 top-2 rounded-md p-1 text-gray-300 transition-opacity hover:bg-gray-700"
          lang={lang}
          code={value}
        />
        <figure>
          <pre
            {...preJSXElement.props}
            className="max-h-[300px] overflow-scroll p-4 text-xs"
          />
        </figure>
      </div>
    </div>
  );
}
