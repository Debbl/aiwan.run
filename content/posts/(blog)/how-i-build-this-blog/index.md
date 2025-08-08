---
title: How I built this blog
description: Learn how to build a static blog using Next.js and MDX, including component development, PWA configuration, and Open Graph image generation.
date: 2024-05-26T12:24:14.000Z
duration: 3min
keywords:
  - Blog
  - Build
  - Next.js
  - FumaDocs
  - Static Site Generator
---

# How I Built This Blog

> [!NOTE]
> This article is outdated, please refer to [Refactor This Blog With FumaDocs](/posts/refactor-this-blog-with-fumadocs)

## Related Links

- [MDX Playground](https://mdxjs.com/playground/)

## Components

### Images

> Can directly import images in the relative path, use the `remark-static-image` plugin, automatically import images, see [Using MDX Static Images in Next.js](/posts/nextjs-mdx-static-image) for details.

![](./images/image.png)

### GitHub Alert

```md
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]  
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]  
> Negative potential consequences of an action.
```

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]  
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]  
> Negative potential consequences of an action.

## PWA

- [Add PWA and Service Worker to Your Site](/posts/add-pwa-and-service-worker-for-your-site)

## Add OG Image

- [Add Open Graph in Next.js](/posts/nextjs-add-open-graph)

## Changelog

### Upgrade tailwindcss v4

> https://github.com/Debbl/aiwan.run/pull/19

- https://tailwindcss.com/docs/upgrade-guide

### Add OG Image

> https://github.com/Debbl/aiwan.run/pull/14

- https://og-playground.vercel.app/
- https://vercel.com/docs/functions/og-image-generation
- https://orcascan.com/tools/open-graph-validator
- Static generate OG Image
  - Use `[og/[slug]/route.tsx]` to change the slug to `[post.pageName].png`
  - `generateStaticParams` to generate OG images for posts
  - `remark-mdx-slug` to get the `slug`
  - `remark-mdx-formatter` to configure `openGraph` to use `[/og/${post.pageName}.png]` as the OG image

### Add GitHub Alert

> https://github.com/Debbl/aiwan.run/commit/c9cb8268eb2037bec897ffbdeb780135d2145039

- https://github.com/chrisweb/rehype-github-alerts

### Add NProgress

> https://github.com/Debbl/aiwan.run/pull/12

- Show progress bar when switching routes on the current website
- https://github.com/Skyleen77/next-nprogress-bar

### refactor use mdx

> https://github.com/Debbl/aiwan.run/pull/11

- Use mdx to refactor the blog [nextjs documentation](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- Reference the implementation of [nextra](https://github.com/shuding/nextra)
- Use app router as page to load mdx file
- remark-mdx-layout global layout component
- remark-static-image import static images from relative paths
