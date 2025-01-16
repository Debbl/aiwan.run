import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import withSerwistInit from "@serwist/next";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import {
  remarkMdxFrontmatter,
  remarkMdxLayout,
  remarkStaticImage,
} from "remark-plugins";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === "true",
});

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
});

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [
        remarkMdxFrontmatter,
        {
          name: "metadata",
          format: (data: any) => {
            return {
              title: `Posts | ${data.title}`,
            };
          },
        },
      ],
      [remarkStaticImage, { importPrefix: "" }],
      remarkMdxLayout,
    ],
  },
});

const nextConfig: NextConfig = {
  output: "export",
  cleanDistDir: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default [withBundleAnalyzer, withSerwist, withMDX].reduce(
  (config, fn) => fn(config),
  nextConfig,
);
