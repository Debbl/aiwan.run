---
title: Next.js 中使用 MDX 静态图片
date: 2025-02-10T02:20:14.179Z
duration: 5min
keywords:
  - Next.js
  - MDX
  - remark-static-image
  - markdown
  - 静态图片
  - 静态网站
---

如果按照官方文档 Next.js 集成 [MDX](https://nextjs.org/docs/pages/building-your-application/configuring/mdx)，是没有办法处理 md 文档中的静态图片资源的，通常的解决方法是把所有的图片资源放到 `public` 目录里，然后在 md 文档中使用，但是这样做有一个弊端就是在本地编辑器写 md 文档时是无法预览图片的，是否可以让 Next.js 可以正确的找到相对路径的图片资源。

目前的解决方案是参考 [nextra](https://github.com/shuding/nextra) 的实现，使用 mdx 的格式解析 md 文件，然后将图片资源转换成 `import` 语句导入，最后使用 `<Image />` 组件来显示图片。

```md
![](./images/image.png)
```

```tsx
import __image_0 from './images/image.png'

function Page() {
  return <Image src={__image_0} alt='image' />
}
```

因为这里所有的 md 文件都是可以直接当作组件来解析的说，所有说不需要关心这里 `./images/image.png` 相对路径的问题。

具体的插件实现可以查看 https://github.com/Debbl/aiwan.run/blob/main/packages/remark-plugins/src/remark-static-image.ts 。
