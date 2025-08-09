---
title: preload and prefetch
description: 理解 preload 和 prefetch HTML link 属性的区别，用于资源优化和性能提升
date: 2024-01-14T08:20:13.000Z
duration: 3min
keywords:
  - preload
  - prefetch
  - html
  - link
  - rel
  - as
---

# preload 和 prefetch

## preload

`<link rel="preload">` 用于预加载当前页面所需的资源，并在浏览器解析 HTML 文档之前加载。

```html
<link rel="preload" href="https://example.com/image.png" as="image" />
```

## prefetch

`<link rel="prefetch">` 用于预加载将来需要的资源，并在浏览器解析 HTML 文档之后加载。

```html
<link rel="prefetch" href="https://example.com/image.png" as="image" />
```

## preload vs prefetch

- preload 用于加载当前页面所需的资源，并在浏览器解析 HTML 文档之前加载。
- prefetch 用于加载将来需要的资源，并在浏览器解析 HTML 文档之后加载。
- preload 的优先级高于 prefetch

## reference

- [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)
- [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/prefetch](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/prefetch)
