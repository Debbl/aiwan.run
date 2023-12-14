import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import MarkdownIt from "markdown-it";

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

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
    timeline: {
      type: "list",
      required: false,
      of: {
        type: "nested",
        def: () => ({
          fields: {
            description: { type: "string", required: true },
            date: { type: "date", required: true },
          },
        }),
      },
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
    html: {
      type: "string",
      resolve: (post) => md.render(post.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeMdxCodeProps as any],
  },
});
