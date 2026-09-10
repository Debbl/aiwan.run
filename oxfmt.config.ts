import { oxfmt } from '@debbl/oxc-config'

export default oxfmt({
  tailwind: './src/styles/tailwindcss/index.css',
  ignorePatterns: ['content/**/*.md', 'content/**/*.mdx'],
})
