import { type ComponentProps, type ReactElement, isValidElement } from "react";
import { bundledLanguages, getHighlighter } from "shiki";
import { cn } from "twl";
import parse from "html-react-parser";
import CopyButton from "./CopyButton";

const languagePrefix = "language-";
const highlighter = await getHighlighter({
  themes: ["one-dark-pro"],
  langs: Object.keys(bundledLanguages),
});
const langs = highlighter.getLoadedLanguages();

function getLang(className?: string) {
  if (!className) return "log";

  const classes: string[] = className.split(" ");
  const languageClass = classes.find(
    (d) => typeof d === "string" && d.startsWith(languagePrefix),
  );
  const lang =
    typeof languageClass === "string"
      ? languageClass.slice(languagePrefix.length)
      : "log";
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

  const code: string = children.props.children;
  const lang = getLang(children.props.className);
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
        <div className="top-0 z-[1] w-full truncate bg-gray-300/30 px-4 py-2 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-200">
          {filename}
        </div>
      )}
      <div className={cn(`language-${lang}`, "group relative")}>
        <span className="absolute right-2 top-2 text-xs text-gray-300 transition-opacity group-hover:opacity-0">
          {lang === "log" ? "" : lang}
        </span>
        <CopyButton
          className="absolute right-2 top-2 rounded-md p-1 text-gray-300 opacity-0 transition-opacity hover:bg-gray-700 group-hover:opacity-100"
          lang={lang}
          code={code}
        />
        <figure>
          <pre {...preJSXElement.props} className="p-4" />
        </figure>
      </div>
    </div>
  );
}
