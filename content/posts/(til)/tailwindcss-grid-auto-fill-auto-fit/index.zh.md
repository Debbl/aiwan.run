---
title: tailwindcss grid auto fill auto fit
description: 创建自定义 Tailwind CSS 实用程序，用于自动填充和自动适应网格布局，使用新的 @utility 指令进行更好的响应式设计
date: 2025-07-16T14:32:00.191Z
duration: 1min
keywords:
  - tailwindcss
  - grid
  - auto fill
  - auto fit
  - grid-cols-fill-*
  - grid-cols-fit-*
  - utility
  - tailwindcss custom utility
---

一个自定义工具，将 `grid-cols-fill-12` 设置为 `grid-template-columns: repeat(auto-fill, minmax(3rem, 12))`

```css
@utility grid-cols-fill-* {
  grid-template-columns: repeat(
    auto-fill,
    minmax(--spacing(--value(number)), 1fr)
  );
}

@utility grid-cols-fit-* {
  grid-template-columns: repeat(
    auto-fit,
    minmax(--spacing(--value(number)), 1fr)
  );
}
```

![vscode-grid-auto-fill-tip](./images/vscode-grid-auto-fill-tip.png)
