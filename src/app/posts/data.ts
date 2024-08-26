import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { globbySync } from "globby";
import type { CompileMDXResult } from "next-mdx-remote/rsc";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { VFile } from "vfile";
import { getMDXComponents } from "./components";
import { __images } from "./__images";
import { rehypePre, remarkHeadings, remarkStaticImage } from "~/lib/MDXPlugins";

export type Category = "blog" | "til";

export interface Frontmatter {
  title: string;
  date: string;
  duration: string;
}

export interface Post extends CompileMDXResult<Frontmatter> {
  url: string;
  slug: string;
  category: Category;
}

export type Posts = Post[];

// eslint-disable-next-line n/prefer-global/process
const cwd = process.cwd();
const rootPath = path.join(cwd, "src/app/posts");
const __imagesPath = path.join(cwd, "src/app/posts/__images.ts");

const isDev = false;
const postsPath = globbySync(`${rootPath}/**/*.md?(x)`).filter(
  (v) => v.includes("playground") || !isDev,
);
const images = globbySync(`${rootPath}/**/*.png`).map((p) => {
  const pathArr = p.split("/");
  const imagesIndex = pathArr.findIndex((d) => d === "images");
  const key =
    `__img_${pathArr[imagesIndex - 1]}_${path.basename(p, ".png")}`.replaceAll(
      "-",
      "_",
    ) as keyof typeof __images;

  const hash = createHash("sha256")
    .update(key)
    .digest("hex")
    .substring(0, 7)
    .padStart(11, "img_") as keyof typeof __images;

  return {
    key: hash,
    path: `./${path.relative(path.join(__imagesPath, ".."), p)}`,
    props: __images[hash],
  };
});

export async function getAllPosts(): Promise<Posts> {
  const isNeedUpdate = images.some((i) => !__images[i.key]);
  if (isNeedUpdate) {
    let str = "// this file is generated automatically\n";
    str += images.map((p) => `import ${p.key} from "${p.path}";`).join("\n");
    str += `\n\nexport const __images = {\n${images.map((i) => `  ${i.key},`).join("\n")}\n};\n`;

    writeFileSync(__imagesPath, str);
  }

  return Promise.all(
    postsPath.map(async (p) => {
      const content = readFileSync(p, "utf8");
      const { name, dir } = path.parse(p);

      const dirArr = dir.split("/");
      const markdownDirIndex = dirArr.findIndex((d) => d === "Markdown");
      const category = dirArr[markdownDirIndex + 1] as Category;

      const vFile = new VFile({
        path: p,
        value: content,
      });

      const mdxSource = await compileMDX<Frontmatter>({
        source: vFile,
        options: {
          mdxOptions: {
            remarkPlugins: [
              [remarkHeadings, { isRemoteContent: false }],
              remarkGfm,
              remarkStaticImage,
            ],
            rehypePlugins: [rehypePre],
            format: "mdx",
            baseUrl: dir,
          },
          parseFrontmatter: true,
          scope: {
            images,
          },
        },
        components: getMDXComponents(),
      });

      return {
        ...mdxSource,
        slug: name,
        url: `/posts/${name}`,
        category,
      };
    }),
  );
}

export const allPosts = await getAllPosts();
