---
title: Next.js 中添加 Open Graph
date: 2025-02-11T10:06:32.792Z
duration: 8min
---

## 添加 OG 图片

[官方文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) 推荐的方式是

- 在相关的路由下使用 `opengraph-image.jpg` 作为 OG 图片
- 使用 `opengraph-image.js` 动态生成

但是这两个中方式都不符合我的需求，我需要让整个网站尽量是静态的，并且这些 OG 图片可以在 build 的时候通过一些配置生成。

目前想到的方案是使用 Next.js 的 [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) 来在 build 的时候生成 OG 图片。

```ts
import { ImageResponse } from "next/og";

export async function generateStaticParams() {
  const { posts } = await getPosts();

  // 获取 posts 的相关信息
  return posts.map((post) => ({
    slug: `${post.pageName}.png`,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // 返回对应的 png 图片
  return new ImageResponse(
    <div>
      <h1>{slug.slice(0, -4)}</h1>
    </div>
  );
}
```

使用 `generateStaticParams` 获取生成 OG 图片的相关信息，**注意这里返回的路径添加了 `.png` 后缀，避免静态站点无法区分响应类型。**

相关 PR

- https://github.com/Debbl/aiwan.run/pull/14

[satori](https://github.com/vercel/satori) 是一个用于生成 OG 图片的库，可以生成 SVG 和 PNG 图片。

- https://og-playground.vercel.app/

vercel 的 OG 图片生成文档

- https://vercel.com/docs/functions/og-image-generation

orcascan 的 OG 图片验证工具

- https://orcascan.com/tools/open-graph-validator

简要信息

- 静态生成 OG 图片
  - 使用 `[og/[slug]/route.tsx]` 更改 slug 为 `[post.pageName].png`
  - `generateStaticParams` 生成 posts 的 OG 图片
  - `[remark-mdx-slug]` 获取 `slug` [remark-mdx-slug.ts](https://github.com/Debbl/aiwan.run/pull/14/files#diff-9016d48db42b7fcedec38c84d3245de98d46f3a54ed336a615fc0a940f258935)
  - `remark-mdx-formatter` 配置 `openGraph` 使用 `[/og/${post.pageName}.png]` 作为 OG 图片, 具体可以查看 [next.config.ts](https://github.com/Debbl/aiwan.run/pull/14/files#diff-e3f38f2f0e7ba92f0dd56c086ec5de704229d58d5371e8cc57e43961757d8c7b), [remark-mdx-formatter.ts](https://github.com/Debbl/aiwan.run/pull/14/files#diff-78208911507da68d782a62255fce95e8097c1541bae857b07b59389dd8cbc25b) 文件
