import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  output: "export",
  experimental: {
    webpackBuildWorker: true,
  },
};

export default withContentlayer(nextConfig);
