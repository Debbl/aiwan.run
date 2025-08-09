---
title: Browser Engine
description: Learn about the working principles of browser engines, including the differences between different rendering engines such as Trident, Gecko, Presto, Webkit, and Blink.
date: 2021-08-11T07:47:20.000Z
duration: 5min
keywords:
  - Browser Engine
  - Rendering Engine
  - Browser Engine Technology
---

## Introduction

The core part of the browser is the rendering engine `Rendering Engine`, which is also known as the browser engine. It is responsible for interpreting the syntax of web pages. Due to historical reasons, different browsers may use different engines, resulting in differences in the content rendered in different browsers. **That is, when we are developing and testing, we only need to test the different browser engines.**

```html
<h2>Hello World</h2>
```

> Will be rendered as

**Hello World**

## Different Browser Engines

> Some browsers may also use dual-core

- Trident

IE\<=10

- Gecko

Firefox

- Presto

Opera(V\<=12.16) after using Blink

- Webkit

Safari

- Blink

Chrome

## Browser Engine Technology

- Layout engine
- JavaScript engine
- Other
