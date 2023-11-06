import path from "node:path";
import process from "node:process";
import fs from "node:fs";
import { globSync } from "glob";
import * as grayMatter from "gray-matter";

interface PostsDataItem {
  title: string;
  guid: string;
  url: string;
  description: string;
  date: string;
  enclosure: {
    url: "";
  };
}

function getPostsData() {
  const postsData: PostsDataItem[] = [];

  const postsPath = path.join(process.cwd(), "src/app/blog/(posts)/**/*.mdx");
  const routerPath = path.join(process.cwd(), "src/app/blog/(posts)");

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

    const url = `/blog/${path.relative(routerPath, path.dirname(postPath))}/`;

    if (!metadata.date || !metadata.duration) {
      metadata.date = new Date().toUTCString();
      metadata.duration = Math.ceil(content.length / 100) * 60;

      fs.writeFileSync(postPath, grayMatter.stringify(content, metadata));
    }

    postsData.push({
      title: metadata.title,
      guid: url,
      url,
      description: metadata.description ?? "",
      date: metadata.date,
      enclosure: {
        url: "",
      },
    });
  });

  return postsData;
}

export { getPostsData };
