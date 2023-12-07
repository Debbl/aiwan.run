import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehyMdxCodeProps from "rehype-mdx-code-props";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  contentType: "mdx",
  fields: {
    author: {
      type: "string",
      required: false,
    },
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    coverImgUrl: {
      type: "string",
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(/\.md$/, ""),
    },
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath.toLocaleLowerCase()}`,
    },
    duration: {
      type: "string",
      resolve: (post) => {
        return Math.ceil(post.body.raw.length / 246);
      },
    },
    category: {
      type: "string",
      resolve: (post) => post._raw.sourceFileDir,
    },
  },
  mdx: {
    rehypePlugins: [rehyMdxCodeProps],
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
});
