---
title: 模板字面量类型
description: 学习 TypeScript 模板字面量类型的使用方法，通过字符串模板创建动态类型定义，提升类型安全性和代码可读性
date: 2025-01-17T15:27:56.070Z
duration: 1min
keywords:
  - typescript
  - template literal types
  - typescript template literal types
---

## 模板字面量类型（Template Literal Types）

模板字面量类型是 TypeScript 中的一种类型，它允许你创建可以包含变量的字符串类型。

```ts twoslash
type World = 'world'
type Greeting = `hello ${World}`
//   ^?
```

```ts twoslash
type EmailLocaleIDs = 'welcome_email' | 'email_heading'
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff'

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`
//   ^?
```

## 相关文章

- https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
