import { remarkHasInH1 } from '@workspace/mdx-plugins'
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config'
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
    remarkPlugins: [remarkHasInH1],
  },
})
