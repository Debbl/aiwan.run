---
title: 浏览器内核
description: '浏览器内核'
date: 2021-08-11T07:47:20.000Z
duration: 5min
---

### 介绍

浏览器最核心的部分是渲染引擎`Rendering Engine`，一般也称为浏览器内核。其负责对网页语法进行解释。由于一些历史原因，不同的的浏览器可能会使用不同的内核，导致最终渲染的内容在不同浏览器有差别。**即我们在开发测试时，只需要测试不同的浏览器的内核。**

```html
<h2>Hello World</h2>
```

> 会被渲染成

**Hello World**

### 不同的浏览器内核

> 一些浏览器还会使用双核

- Trident 三叉戟

IE\<=10

- Gecko 壁虎

Firefox

- Presto 急板乐曲

Opera(V\<=12.16) 之后使用 Blink

- Webkit

Safari

- Blink

Chrome

### 浏览器内核技术

- 排版渲染引擎
- JavaScript引擎
- 其他
