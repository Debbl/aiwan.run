---
title: Add Open Graph in Next.js
description: Learn how to add Open Graph images in a Next.js project, including static generation of OG images, using the satori library, configuring route handlers, and SEO optimization.
date: 2025-02-11T10:06:32.792Z
duration: 8min
keywords:
  - Next.js
  - Open Graph
  - OG
  - SEO
  - satori
  - Static Generation
  - Static Site
---

## Add OG Image

[Official documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) recommends the following methods:

- Use `opengraph-image.jpg` as OG image in the related routes
- Use `opengraph-image.js` to dynamically generate

But neither of these methods meets my needs, I need the entire website to be as static as possible, and these OG images can be generated through some configurations during the build.

The current idea is to use Next.js's [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) to generate OG images during the build.

```ts
import { ImageResponse } from "next/og";

export async function generateStaticParams() {
  const { posts } = await getPosts();

  // Get the related information of posts
  return posts.map((post) => ({
    slug: `${post.pageName}.png`,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Return the corresponding png image
  return new ImageResponse(
    <div>
      <h1>{slug.slice(0, -4)}</h1>
    </div>
  );
}
```

> Note that the path returned here adds the `.png` suffix to avoid the static site from being unable to distinguish the response type.

Use `generateStaticParams` to get the related information for generating OG images.

- https://github.com/Debbl/aiwan.run/pull/14

[satori](https://github.com/vercel/satori) is a library for generating OG images, which can generate SVG and PNG images.

- https://og-playground.vercel.app/

vercel's OG image generation documentation

- https://vercel.com/docs/functions/og-image-generation

orcascan's OG image verification tool

- https://orcascan.com/tools/open-graph-validator

Brief information

- Static generate OG Image
  - Use `[og/[slug]/route.tsx]` to change the slug to `[post.pageName].png`
  - `generateStaticParams` to generate OG images for posts
  - `[remark-mdx-slug]` to get the `slug` [remark-mdx-slug.ts](https://github.com/Debbl/aiwan.run/pull/14/files#diff-9016d48db42b7fcedec38c84d3245de98d46f3a54ed336a615fc0a940f258935)
  - `remark-mdx-formatter` to configure `openGraph` to use `[/og/${post.pageName}.png]` as the OG image, see [next.config.ts](https://github.com/Debbl/aiwan.run/pull/14/files#diff-e3f38f2f0e7ba92f0dd56c086ec5de704229d58d5371e8cc57e43961757d8c7b), [remark-mdx-formatter.ts](https://github.com/Debbl/aiwan.run/pull/14/files#diff-78208911507da68d782a62255fce95e8097c1541bae857b07b59389dd8cbc25b) file
