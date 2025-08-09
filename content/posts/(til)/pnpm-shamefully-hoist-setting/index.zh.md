---
title: pnpm shamefully-hoist 设置
description: 了解 pnpm 的依赖提升配置，包括 shamefully-hoist、hoist-pattern 和 public-hoist-pattern 等选项的使用场景和配置方法
date: 2024-06-23T03:38:22.000Z
duration: 3min
keywords:
  - pnpm
  - shamefully-hoist
  - hoist-pattern
  - public-hoist-pattern
  - node_modules
  - package.json
---

## shamefully-hoist

> https://pnpm.io/npmrc#shamefully-hoist

默认情况下，`pnpm` 会创建一个半严格的 `node_modules` 结构，意味着依赖项可以访问未声明的依赖项，但 `node_modules` 之外的模块不能。在这种布局下，大多数生态系统中的包都能正常工作。然而，如果某些工具只能在依赖项提升到 `node_modules` 根目录时才能正常工作，你可以将此选项设置为 `true` 来为你提升这些依赖项。

简单来说就是现在有一个模块 A，其依赖一个模块 B，在项目的 `package.json` 里依赖模块 A，模块 A 是可以正常的访问到模块 B 的，但是在项目里就不能访问模块 B，当 `shamefully-hoist=true` 就会提升模块 B，然后在项目里都可以访问。

默认 `pnpm` 在 `node_modules` 只会暴露在 `package.json` 里指定的依赖，不会像 `npm` 一样，暴露依赖包括依赖的依赖。

```ini title=".npmrc"
shamefully-hoist=true
```

## hoist-pottern

- https://pnpm.io/npmrc#public-hoist-pattern

```ini title=".npmrc"
hoist-pattern[]=*eslint*
hoist-pattern[]=*babel*
```

将某个依赖提升到 `node_modules/.pnpm/node_modules` 外部无法引用

## public-hoist-pattern

- https://pnpm.io/npmrc#public-hoist-pattern

```ini title=".npmrc"
public-hoist-pattern[]=['*eslint*', '*prettier*']
```

将依赖放到根目录的 `node_modules` 里，根目录可以引用
