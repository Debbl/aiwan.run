import parse from "html-react-parser";
import { isValidElement } from "react";
import { bundledLanguages, createHighlighter } from "shiki";
import { cn } from "twl";
import CopyButton from "./CopyButton";
import type { ComponentProps, JSX, ReactElement } from "react";

const languagePrefix = "language-";
const highlighter = await createHighlighter({
  themes: ["one-dark-pro"],
  langs: Object.keys(bundledLanguages),
});
const langs = [...highlighter.getLoadedLanguages(), "text", "plain"];

function getLang(className?: string) {
  if (!className) return "plain";

  const classes: string[] = className.split(" ");
  const languageClass = classes.find(
    (d) => typeof d === "string" && d.startsWith(languagePrefix),
  );
  const lang =
    typeof languageClass === "string"
      ? languageClass.slice(languagePrefix.length)
      : "plain";
  return lang;
}

function parseMeta(meta?: string) {
  if (!meta) return {};

  const filenameRegex = /filename="(.+)"/;

  return {
    filename: filenameRegex.test(meta) ? meta.match(filenameRegex)![1] : "",
  };
}

export function Pre({
  children,
  ...props
}: ComponentProps<"pre"> & {
  meta?: string;
}): ReactElement {
  if (!children || !isValidElement(children)) return <pre {...props} />;

  const code = (children as JSX.Element).props.children as string;
  const lang = getLang((children as JSX.Element).props.className);

  const { filename } = parseMeta(props.meta);

  if (!langs.includes(lang)) return <pre {...props} />;

  const renderedHTML = highlighter.codeToHtml(code, {
    lang,
    theme: "one-dark-pro",
  });

  const preJSXElement = parse(renderedHTML) as JSX.Element;

  return (
    <div className="relative mt-6 overflow-hidden rounded-xl first:mt-0">
      {filename && (
        <div className="top-0 z-[1] w-full truncate bg-gray-200/80 px-4 py-2 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-200">
          {filename}
        </div>
      )}
      <div className={cn(`language-${lang}`, "group relative")}>
        <span className="absolute right-2 top-2 text-xs text-gray-300 transition-opacity group-hover:opacity-0">
          {lang}
        </span>
        <CopyButton
          className="absolute right-2 top-2 rounded-md p-1 text-gray-300 opacity-0 transition-opacity hover:bg-gray-700 group-hover:opacity-100"
          lang={lang}
          code={code}
        />
        <figure className="max-h-[300px] overflow-y-scroll text-xs">
          <pre {...preJSXElement.props} className="p-4" />
        </figure>
      </div>
    </div>
  );
}
