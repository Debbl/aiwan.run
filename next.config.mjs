import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import reamrkHeaderify from "remark-headerify";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  output: "export",
  experimental: {
    webpackBuildWorker: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      reamrkHeaderify,
      [remarkMdxFrontmatter, { name: "metadata" }],
    ],
    rehypePlugins: [rehypeMdxCodeProps],
  },
});

export default withMDX(nextConfig);
