import bundleAnalyzer from '@next/bundle-analyzer'
import withSerwistInit from '@serwist/next'
import { createMDX } from 'fumadocs-mdx/next'
import AutoImport from 'unplugin-auto-import/webpack'
import type { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === 'true',
})

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
})

const withMDX = createMDX()

const nextConfig: NextConfig = {
  output: 'export',
  cleanDistDir: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
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
          {
            from: '~/components/icons/index.ts',
            imports: ['Icon'],
          },
          {
            from: '~/components/icons/index.ts',
            imports: ['IconType', 'IconBaseProps'],
            type: true,
          },
        ],
        dts: true,
      }),
    )

    return config
  },
}

export default [withBundleAnalyzer, withSerwist, withMDX].reduce((config, fn) => fn(config), nextConfig)
