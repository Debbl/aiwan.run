import parse from "html-react-parser";
import { bundledLanguages, createHighlighter } from "shiki";
import { cn } from "~/lib/utils";
import { ScrollArea } from "../ui/ScrollArea";
import CopyButton from "./CopyButton";
import type { JSX } from "react";

const highlighter = await createHighlighter({
  themes: ["one-dark-pro"],
  langs: Object.keys(bundledLanguages),
});

function parseMeta(meta?: string) {
  if (!meta) return {};

  const filenameRegex = /filename="(.+)"/;

  return {
    filename: filenameRegex.test(meta) ? meta.match(filenameRegex)![1] : "",
  };
}

export function Pre({
  lang,
  meta = "",
  value,
}: {
  lang: string;
  meta: string;
  value: string;
}) {
  const { filename } = parseMeta(meta);

  const renderedHTML = highlighter.codeToHtml(value, {
    lang,
    theme: "one-dark-pro",
  });

  const preJSXElement = parse(renderedHTML) as JSX.Element;

  return (
    <div className="relative my-6 overflow-hidden rounded-xl first:mt-0">
      <div className="top-0 z-1 flex w-full items-center justify-between truncate bg-gray-200/80 px-4 py-2 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-200">
        <span>{filename}</span>

        <span>{lang}</span>
      </div>

      <div className={cn(`language-${lang}`, "relative")}>
        <CopyButton
          className="absolute top-2 right-2 z-10 rounded-md p-1 text-gray-300 transition-opacity hover:bg-gray-700"
          lang={lang}
          code={value}
        />
        <figure>
          <ScrollArea
            style={preJSXElement.props.style}
            className="max-h-[300px]"
          >
            <pre {...preJSXElement.props} className="p-4 text-xs" />
          </ScrollArea>
        </figure>
      </div>
    </div>
  );
}
