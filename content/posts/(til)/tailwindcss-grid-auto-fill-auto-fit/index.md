---
title: tailwindcss grid auto fill auto fit
date: 2025-07-16T14:32:00.191Z
duration: 1min
---


a custom utility to set the `grid-cols-fill-12` to `grid-template-columns: repeat(auto-fill, minmax(3rem, 12))`

```css
@utility grid-cols-fill-* {
  grid-template-columns: repeat(auto-fill, minmax(--spacing(--value(number)), 1fr));
}

@utility grid-cols-fit-* {
  grid-template-columns: repeat(auto-fit, minmax(--spacing(--value(number)), 1fr));
}
```

![vscode-grid-auto-fill-tip](./images/vscode-grid-auto-fill-tip.png)