---
title: pnpm shamefully-hoist setting
description: Learn about the dependency promotion configuration of pnpm, including the usage scenarios and configuration methods of shamefully-hoist, hoist-pattern, and public-hoist-pattern options
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

By default, `pnpm` creates a semi-strict `node_modules` structure, meaning that dependencies can access undeclared dependencies, but modules outside of `node_modules` cannot. Under this layout, most packages in the ecosystem work normally. However, if certain tools only work when dependencies are hoisted to the `node_modules` root directory, you can set this option to `true` to hoist these dependencies for you.

In short, there is a module A that depends on module B. Module A can access module B normally in the project, but module B cannot be accessed in the project. When `shamefully-hoist=true` is set, module B is hoisted, and then module B can be accessed in the project.

By default, `pnpm` only exposes dependencies specified in `package.json` in `node_modules`, unlike `npm`, which exposes dependencies including their dependencies.

```ini title=".npmrc"
shamefully-hoist=true
```

## hoist-pottern

- https://pnpm.io/npmrc#public-hoist-pattern

```ini title=".npmrc"
hoist-pattern[]=*eslint*
hoist-pattern[]=*babel*
```

A dependency is hoisted to `node_modules/.pnpm/node_modules`, and external references are not allowed.

## public-hoist-pattern

- https://pnpm.io/npmrc#public-hoist-pattern

```ini title=".npmrc"
public-hoist-pattern[]=['*eslint*', '*prettier*']
```

The dependency is placed in the `node_modules` directory at the root, and the root can reference it.
