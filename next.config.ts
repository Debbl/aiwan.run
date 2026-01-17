import bundleAnalyzer from '@next/bundle-analyzer'
import { createMDX } from 'fumadocs-mdx/next'
import { createAutoImport } from 'next-auto-import'
import type { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === 'true',
})

const withAutoImport = createAutoImport({
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
  serverExternalPackages: ['typescript', 'twoslash', 'esbuild-wasm'],
  transpilePackages: ['@workspace/mdx-plugins'],
}

export default [withBundleAnalyzer, withMDX, withAutoImport].reduce(
  (config, fn) => fn(config),
  nextConfig,
)
