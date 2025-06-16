import { remarkHasInH1, remarkSandpack } from '@workspace/mdx-plugins'
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins'
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config'
import { transformerTwoslash } from 'fumadocs-twoslash'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import { z } from 'zod'

export const docs = defineDocs({
  dir: 'content/posts',
  docs: {
    schema: frontmatterSchema.extend({
      duration: z.string().optional().default('1m'),
      date: z.date().transform((val) => new Date(val)),
    }),
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    format: 'mdx',
    remarkPlugins: [remarkSandpack, remarkHasInH1],
    rehypePlugins: [rehypeGithubAlerts],
    rehypeCodeOptions: {
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
      ],
    },
  },
})
