/**
 * parse Markdown file to html for rss feed
 */

import MarkdownIt from "markdown-it";

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

function getImageUrl(ipfs: string) {
  return `https://ipfs.crossbell.io/ipfs/${ipfs}`;
}

const images: string[] = [];
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];

  const src = token.attrGet("src") as string;
  const ipfs = src.slice(7);
  images.push(ipfs);

  const url = getImageUrl(ipfs);

  token!.attrs![token.attrIndex("src")][1] = url;

  token!.attrs![token.attrIndex("alt")][1] = self.renderInlineAsText(
    token.children!,
    options,
    env,
  );

  return self.renderToken(tokens, idx, options);
};

export { md, images, getImageUrl };
