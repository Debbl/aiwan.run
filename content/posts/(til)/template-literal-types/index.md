---
title: Template Literal Types
description: Learn how to use template literal types in TypeScript, create dynamic type definitions through string templates, and improve type safety and code readability
date: 2025-01-17T15:27:56.070Z
duration: 1min
keywords:
  - typescript
  - template literal types
  - typescript template literal types
---

## Template Literal Types

Template Literal Types is a type in TypeScript, it allows you to create a string type that can contain variables.

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

## Related articles

- https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
