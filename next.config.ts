import { fileURLToPath } from 'node:url'
import bundleAnalyzer from '@next/bundle-analyzer'
import { createI18nPlugin } from 'best-i18n/next'
import { createMDX } from 'fumadocs-mdx/next'
import { createAutoImport } from 'next-auto-import'
import { i18n } from './src/i18n'
import type { NextConfig } from 'next'

const withI18n = createI18nPlugin({
  // locales and baseLocale are described once, in src/i18n.ts
  ...i18n,
  messagesDir: fileURLToPath(new URL('./messages', import.meta.url)),
})

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
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  serverExternalPackages: ['typescript', 'twoslash'],
}

export default [withBundleAnalyzer, withMDX, withAutoImport, withI18n].reduce(
  (config, fn) => fn(config),
  nextConfig,
)
