import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";
import { rehypePicture, remarkHeadings } from "~/lib/MarkdownPlugins";

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX({
  options: {
    remarkPlugins: [[remarkHeadings, { isRemoteContent: false }], remarkGfm],
    rehypePlugins: [rehypePicture],
  },
});

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["shiki"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  cleanDistDir: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["shiki"],
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
