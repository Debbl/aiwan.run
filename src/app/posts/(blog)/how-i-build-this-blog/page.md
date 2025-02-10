---
title: 我是如何搭建这个博客的
date: 2024-05-26T12:24:14.000Z
duration: 3min
---

## 信息

- [MDX Playground](https://mdxjs.com/playground/)

## 组件

### 图片

可以直接在相对路径下引入图片，使用 `remark-static-image` 插件，自动导入图片，具体可以查看 [Next.js 中使用 MDX 静态图片](/posts/nextjs-mdx-static-image) 。

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

## Changelog

### 添加 OG 图片

> https://github.com/Debbl/aiwan.run/pull/14

- https://og-playground.vercel.app/
- https://vercel.com/docs/functions/og-image-generation
- https://orcascan.com/tools/open-graph-validator
- 静态生成 OG 图片
  - 使用 `[og/[slug]/route.tsx]` 更改 slug 为 `[post.pageName].png`
  - `generateStaticParams` 生成 posts 的 OG 图片
  - `remark-mdx-slug` 获取 `slug`
  - `remark-mdx-formatter` 配置 `openGraph` 使用 `[/og/${post.pageName}.png]` 作为 OG 图片

### 添加 GitHub Alert

> https://github.com/Debbl/aiwan.run/commit/c9cb8268eb2037bec897ffbdeb780135d2145039

- https://github.com/chrisweb/rehype-github-alerts

### 添加 NProgress

> https://github.com/Debbl/aiwan.run/pull/12

- 当前网站路由切换时显示进度条
- https://github.com/Skyleen77/next-nprogress-bar

### refactor use mdx

> https://github.com/Debbl/aiwan.run/pull/11

- 使用 mdx 重构了博客 [nextjs文档](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- 参考了 [nextra](https://github.com/shuding/nextra) 的实现
- 使用 app router 作为 page 加载 mdx 文件
- remark-mdx-layout 全局的 Layout 组件
- remark-static-image 相对路径引入静态图片文件
