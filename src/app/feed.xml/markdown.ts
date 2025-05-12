/**
 * parse Markdown file to html for rss feed
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import loaderUtils from 'loader-utils'
import MarkdownIt from 'markdown-it'
import { WEBSITE } from '~/constants'

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx]

  const src = token.attrGet('src') as string
  const mdPath = env.path
  const imagePath = path.join(path.dirname(mdPath), src)

  const fileContent = readFileSync(imagePath)

  // https://github.com/vercel/next.js/blob/60903439560f3f6f0d1fdd782800a9ff05558afb/packages/next/src/build/webpack/loaders/next-image-loader/index.ts#L23
  const interpolatedName = loaderUtils.interpolateName(
    {
      resourcePath: imagePath,
    } as any,
    '/_next/static/media/[name].[hash:8].[ext]',
    {
      context: path.dirname(imagePath),
      content: fileContent,
    },
  )

  const url = `${WEBSITE.domain}${interpolatedName}`

  token!.attrs![token.attrIndex('src')][1] = url

  token!.attrs![token.attrIndex('alt')][1] = self.renderInlineAsText(token.children!, options, env)

  return self.renderToken(tokens, idx, options)
}

export function markdownToHtml(markdown: string, path: string) {
  const { content } = matter(markdown)

  return md.render(content, { path })
}

export { md }
