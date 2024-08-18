import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { rehypePicture, remarkHeadings } from "~/lib/MDXPlugins";

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      [remarkHeadings, { isRemoteContent: false }],
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
    ],
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
