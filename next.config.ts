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
  reactCompiler: true,
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },
  typedRoutes: false,
  serverExternalPackages: ['typescript', 'twoslash'],
  transpilePackages: ['@workspace/mdx-plugins'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: '@lingui/loader',
      },
    })

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
          {
            from: '~/components/link.tsx',
            imports: ['Link'],
          },
        ],
        dts: true,
      }),
    )

    return config
  },
}

export default [withBundleAnalyzer, withSerwist, withMDX].reduce(
  (config, fn) => fn(config),
  nextConfig,
)
