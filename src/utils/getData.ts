import path from "node:path";
import process from "node:process";
import fs from "node:fs";
import { globSync } from "glob";
import * as grayMatter from "gray-matter";

interface PostsDataItem {
  title: string;
  guid: string;
  url: string;
  content: string;
  author?: string;
  duration: number;
  description: string;
  date: string;
  enclosure: {
    url: "";
  };
}

function parserMDX(_postPath: string, _routerPath: string, _url: string) {
  const postsData: PostsDataItem[] = [];

  const postsPath = path.join(process.cwd(), _postPath);
  const routerPath = path.join(process.cwd(), _routerPath);

  const postsFilesPaths = globSync(postsPath);

  postsFilesPaths.forEach((postPath) => {
    const { data: metadata, content } = grayMatter.read(postPath) as any as {
      data: {
        title: string;
        description?: string;
        date?: string;
        duration?: number;
      };
      content: string;
    };

    const url = `${_url}/${path.relative(routerPath, path.dirname(postPath))}/`;

    if (!metadata.date || !metadata.duration) {
      metadata.date = new Date().toUTCString();
      metadata.duration = Math.ceil(content.length / 246);

      fs.writeFileSync(postPath, grayMatter.stringify(content, metadata));
    }

    postsData.push({
      title: metadata.title,
      guid: url,
      url,
      content,
      duration: metadata.duration,
      description: metadata.description ?? "",
      date: metadata.date,
      enclosure: {
        url: "",
      },
    });
  });

  return postsData.toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function getBlogData() {
  return parserMDX(
    "src/app/blog/(posts)/**/*.mdx",
    "src/app/blog/(posts)",
    "/blog",
  );
}

function getTilData() {
  return parserMDX(
    "src/app/til/(posts)/**/*.mdx",
    "src/app/til/(posts)",
    "/til",
  );
}

export { parserMDX, getBlogData, getTilData };
