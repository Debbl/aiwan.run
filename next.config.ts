import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import withSerwistInit from "@serwist/next";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import {
  remarkHeadings,
  remarkMdxFrontmatter,
  remarkMdxLayout,
  remarkMdxPre,
  remarkStaticImage,
} from "remark-plugins";
import { WEBSITE } from "~/constants";
import type { Metadata, NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === "true",
});

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
});

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkHeadings, { isRemoteContent: false }],
      remarkGfm,
      [remarkGithub, {}],
      remarkFrontmatter,
      [
        remarkMdxFrontmatter,
        {
          name: "metadata",
          format: (data: any) => {
            const title = `Posts | ${data.title}`;

            return {
              title,
              openGraph: {
                url: `${WEBSITE.domain}/posts`,
                title,
                description: WEBSITE.description,
                images: ["/apple-touch-icon.png"],
                emails: [WEBSITE.email],
              },
            } satisfies Metadata;
          },
        },
      ],
      remarkMdxPre,
      [remarkStaticImage, { importPrefix: "" }],
      remarkMdxLayout,
    ],
    rehypePlugins: [rehypeGithubAlerts],
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
