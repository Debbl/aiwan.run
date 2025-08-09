---
title: TypeScript satisfies
description: Deeply understand the usage of the TypeScript satisfies operator, ensuring type safety while maintaining type inference, improving code quality and development experience
date: 2025-02-21T02:33:55.190Z
duration: 1min
keywords:
  - typescript
  - satisfies
  - typescript satisfies
---

# TypeScript satisfies

- Official documentation https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator

Make an expression conform to a type, without changing the type of the expression.

```ts twoslash
// @errors: 2353 2339
type Colors = 'red' | 'green' | 'blue'
type RGB = [red: number, green: number, blue: number]

const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: '#00ff00',
  bleu: [0, 0, 255],
  // It will report an error because bleu is not a Colors type
}

// It will report an error because palette.green may be a string type, or an RGB type, and the string type does not have a toUpperCase method
const greenNormalized = palette.green.toUpperCase()
```

Using satisfies

```ts twoslash
// @errors: 2353
type Colors = 'red' | 'green' | 'blue'
type RGB = [red: number, green: number, blue: number]

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  bleu: [0, 0, 255],
  // It will report an error because bleu is not a Colors type
} satisfies Record<Colors, string | RGB>

// It will not report an error because palette.green is a string type, and has a toUpperCase method
const greenNormalized = palette.green.toUpperCase()
```

After using satisfies, palette conforms to the `Record<Colors, string | RGB>` type, and retains its original type, so this inference palette.green is a string type

## Other usage scenarios

Ensure that the keys of the object conform to a certain type

```ts twoslash
// @errors: 2353
type Colors = 'red' | 'green' | 'blue'

// Ensure that the keys of the object conform to the Colors type
const favoriteColors = {
  red: 'yes',
  green: false,
  blue: 'kinda',
  platypus: false,
  // It will report an error because platypus is not a Colors type
} satisfies Record<Colors, unknown>

// All information about the 'red', 'green', and 'blue' properties is retained, not unknown type
const g: boolean = favoriteColors.green
```

Ensure that the property values of the object conform to a certain type

```ts twoslash
// @errors: 2322
type RGB = [red: number, green: number, blue: number]

// Ensure that the property values of the object conform to the string and RGB type
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0],
  // It will report an error because the type of blue is neither a string type nor an RGB type
} satisfies Record<string, string | RGB>

// The information about each property is still retained.
const redComponent = palette.red.at(0) // red is an RGB type
const greenNormalized = palette.green.toUpperCase() // green is a string type
```
