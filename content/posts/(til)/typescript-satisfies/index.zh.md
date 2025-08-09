---
title: TypeScript satisfies
description: 深入理解 TypeScript satisfies 操作符的使用方法，在保持类型推断的同时确保类型安全，提升代码质量和开发体验
date: 2025-02-21T02:33:55.190Z
duration: 1min
keywords:
  - typescript
  - satisfies
  - typescript satisfies
---

# TypeScript satisfies

- 官方文档 https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator

使一个表达式符合某个类型，而不改变表达式的类型。

```ts twoslash
// @errors: 2353 2339
type Colors = 'red' | 'green' | 'blue'
type RGB = [red: number, green: number, blue: number]

const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: '#00ff00',
  bleu: [0, 0, 255],
  // 这里会报错，因为 bleu 不是 Colors 类型
}

// 这里会报错，因为 palette.green 可能是 string 类型，也可能是 RGB 类型，而 string 类型没有 toUpperCase 方法
const greenNormalized = palette.green.toUpperCase()
```

使用 satisfies

```ts twoslash
// @errors: 2353
type Colors = 'red' | 'green' | 'blue'
type RGB = [red: number, green: number, blue: number]

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  bleu: [0, 0, 255],
  // 这里会报错，因为 bleu 不是 Colors 类型
} satisfies Record<Colors, string | RGB>

// 这里不会报错，因为 palette.green 是 string 类型，有 toUpperCase 方法
const greenNormalized = palette.green.toUpperCase()
```

这里使用 satisfies 后，palette 符合 `Record<Colors, string | RGB>` 类型，并且保留了其原有的类型，所以这个推断 palette.green 是 string 类型

## 其他使用场景

确保对象的 keys 符合某个类型

```ts twoslash
// @errors: 2353
type Colors = 'red' | 'green' | 'blue'

// 确保对象的 keys 符合 Colors 类型
const favoriteColors = {
  red: 'yes',
  green: false,
  blue: 'kinda',
  platypus: false,
  // 错误：platypus 没有在 Colors 类型中列出
} satisfies Record<Colors, unknown>

// 所有关于 'red', 'green', 和 'blue' 属性的信息都被保留了，不是 unknown 类型
const g: boolean = favoriteColors.green
```

确保对象的属性值符合某个类型

```ts twoslash
// @errors: 2322
type RGB = [red: number, green: number, blue: number]

// 确保对象的属性值符合 string 和 RGB 类型
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0],
  // 错误：blue 的类型既不是 string 类型，也不是 RGB 类型
} satisfies Record<string, string | RGB>

// 每个属性的信息仍然被保留。
const redComponent = palette.red.at(0) // red 是 RGB 类型
const greenNormalized = palette.green.toUpperCase() // green 是 string 类型
```
