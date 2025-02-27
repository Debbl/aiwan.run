import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import withSerwistInit from "@serwist/next";
import {
  remarkHeadings,
  remarkMdxFrontmatter,
  remarkMdxLayout,
  remarkMdxPre,
  remarkMdxSlug,
  remarkStaticImage,
} from "@workspace/remark-plugins";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import { WEBSITE } from "~/constants";
import type { Metadata, NextConfig } from "next";
import type { VFile } from "vfile";

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
      remarkMdxSlug,
      remarkGfm,
      [remarkGithub, {}],
      remarkFrontmatter,
      [
        remarkMdxFrontmatter,
        {
          name: "metadata",
          format: (data: any, file: VFile) => {
            const title = `Posts | ${data.title}`;

            return {
              title,
              openGraph: {
                url: `${WEBSITE.domain}/posts`,
                title: `${file.data.title}` || title,
                description: WEBSITE.description,
                type: "website",
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
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default [withBundleAnalyzer, withSerwist, withMDX].reduce(
  (config, fn) => fn(config),
  nextConfig,
);
