import path from 'node:path'
import type { Plugin } from 'unified'

const remarkMdxSlug: Plugin = () => {
  return (_tree, file) => {
    const dirname = file.dirname || ''
    const slug = path.basename(dirname)

    file.data.slug = slug
  }
}

export { remarkMdxSlug }
