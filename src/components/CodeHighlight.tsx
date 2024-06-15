import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { bundledLanguages, getHighlighter } from "shiki";
import { CopyButton } from "./CopyButton";

const languagePrefix = "language-";
const highlighter = await getHighlighter({
  themes: ["one-dark-pro"],
  langs: Object.keys(bundledLanguages),
});
const langs = highlighter.getLoadedLanguages();

function getLang(className?: string) {
  if (!className) return "text";

  const classes: string[] = className.split(" ");
  const languageClass = classes.find(
    (d) => typeof d === "string" && d.startsWith(languagePrefix),
  );
  const lang =
    typeof languageClass === "string"
      ? languageClass.slice(languagePrefix.length)
      : "text";
  return lang;
}

export function CodeHighlight(
  props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
    children: ReactElement;
  },
) {
  if (props?.children?.type !== "code") return <pre {...props} />;

  const codeElement = props.children;

  const code: string = codeElement.props.children;
  const lang = getLang(codeElement.props.className);

  if (!langs.includes(lang)) return <pre {...props} />;

  const renderedHTML = highlighter.codeToHtml(code, {
    lang,
    theme: "one-dark-pro",
  });

  return (
    <div className="group relative">
      <span className="absolute right-2 top-2 text-xs text-gray-300 transition-opacity group-hover:opacity-0">
        {lang}
      </span>
      <CopyButton
        className="absolute right-2 top-2 rounded-md p-1 text-gray-300 opacity-0 transition-opacity hover:bg-gray-700 group-hover:opacity-100"
        lang={lang}
        code={code}
      />
      <figure dangerouslySetInnerHTML={{ __html: renderedHTML }} />
    </div>
  );
}
