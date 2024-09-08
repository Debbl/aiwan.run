/**
 * parse Markdown file to html for rss feed
 */

import path from "node:path";
import MarkdownIt from "markdown-it";
import { WEBSITE } from "~/constants";
import { __images } from "../posts/__images";
import { generateImgPathHash } from "../posts/generateImages";

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];

  const src = token.attrGet("src") as string;
  const mdPath = env.path;
  const imgPath = path.join(path.dirname(mdPath), src);

  const hash = generateImgPathHash(imgPath);

  const url = `${WEBSITE.domain}${__images[hash].src}`;

  token!.attrs![token.attrIndex("src")][1] = url;

  token!.attrs![token.attrIndex("alt")][1] = self.renderInlineAsText(
    token.children!,
    options,
    env,
  );

  return self.renderToken(tokens, idx, options);
};

export function markdownToHtml(markdown: string, path: string) {
  return md.render(markdown, { path });
}

export { md };
