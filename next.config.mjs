import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import reamrkHeaderify from "remark-headerify";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      reamrkHeaderify,
      [remarkMdxFrontmatter, { name: "metadata" }],
    ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
