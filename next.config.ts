import bundleAnalyzer from '@next/bundle-analyzer'
import createMDX from '@next/mdx'
import withSerwistInit from '@serwist/next'
import {
  remarkHeadings,
  remarkMdxFrontmatter,
  remarkMdxLayout,
  remarkMdxPre,
  remarkMdxSlug,
  remarkStaticImage,
} from '@workspace/remark-plugins'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkGithub from 'remark-github'
import AutoImport from 'unplugin-auto-import/webpack'
import { WEBSITE } from '~/constants'
import type { Metadata, NextConfig } from 'next'
import type { VFile } from 'vfile'
import type { Frontmatter } from '~/app/posts/_data'

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === 'true',
})

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
})

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkHeadings, { isRemoteContent: false }],
      remarkMdxSlug,
      remarkGfm,
      [remarkGithub, {}],
      remarkFrontmatter,
      [
        remarkMdxFrontmatter,
        {
          name: 'metadata',
          format: (data: Frontmatter, file: VFile) => {
            const title = `Posts | ${data.title}`

            return {
              title,
              authors: WEBSITE.authors,
              description: title,
              openGraph: {
                url: `${WEBSITE.domain}/posts`,
                title: data.title,
                description: title,
                type: 'website',
                images: [
                  {
                    alt: `og-image-${file.data.slug}`,
                    url: `/posts/og/${file.data.slug}.png`,
                    width: 800,
                    height: 400,
                  },
                ],
                emails: [WEBSITE.email],
              },
            } satisfies Metadata
          },
        },
      ],
      remarkMdxPre,
      [remarkStaticImage, { importPrefix: '' }],
      remarkMdxLayout,
    ],
    rehypePlugins: [rehypeGithubAlerts],
  },
})

const nextConfig: NextConfig = {
  output: 'export',
  cleanDistDir: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack: (config) => {
    config.plugins.push(
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        ],
        imports: [
          'react',
          {
            twl: ['cn'],
          },
          {
            from: 'motion/react-m',
            imports: [['*', 'm']],
          },
        ],
        dts: true,
      }),
    )

    return config
  },
}

export default [withBundleAnalyzer, withSerwist, withMDX].reduce((config, fn) => fn(config), nextConfig)
