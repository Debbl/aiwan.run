import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === "true",
});

// const withMDX = createMDX({
//   options: {
//     remarkPlugins: [
//       [remarkHeadings, { isRemoteContent: false }],
//       remarkGfm,
//       remarkFrontmatter,
//       remarkMdxFrontmatter,
//     ],
//     rehypePlugins: [rehypePicture],
//   },
// });

const nextConfig: NextConfig = {
  output: "export",
  cleanDistDir: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    reactCompiler: true,
  },
};

export default withBundleAnalyzer(nextConfig);
