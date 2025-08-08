---
title: cloudflare d1 local dev
description: Learn how to configure Cloudflare D1 database for local development using Drizzle ORM, including database file location and migration management
date: 2025-07-19T13:36:16.198Z
duration: 3min
keywords:
  - cloudflare
  - d1
  - local dev
  - drizzle
  - drizzle-kit
  - drizzle-orm
---

cloudflare d1 是一个 sqlite 数据库，你可以在本地项目的 `.wrangler` 文件夹中找到数据库文件。在下面的代码中，你可以配置 drizzle 来使用本地或远程的 d1 数据库。

```ts title="drizzle.config.ts"
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'drizzle-kit'
import { env } from '~/env'

const isDev = env.NODE_ENV === 'development'

function getLocalD1DB() {
  try {
    const basePath = path.resolve('.wrangler')
    const dbFile = fs.readdirSync(basePath, { encoding: 'utf-8', recursive: true }).find((f) => f.endsWith('.sqlite'))

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`)
    }

    const url = path.resolve(basePath, dbFile)
    return url
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error  ${err}`)
  }
}

export default defineConfig(
  isDev
    ? {
        out: './drizzle',
        schema: './src/server/db/schema/internal/index.ts',
        dialect: 'sqlite',
        dbCredentials: {
          url: getLocalD1DB()!,
        },
      }
    : {
        out: './drizzle',
        schema: './src/server/db/schema/internal/index.ts',
        dialect: 'sqlite',
        driver: 'd1-http',
        dbCredentials: {
          accountId: env.CLOUDFLARE_ACCOUNT_ID,
          databaseId: env.CLOUDFLARE_DATABASE_ID,
          token: env.CLOUDFLARE_D1_TOKEN,
        },
      }
)
```

在 `package.json` 中，你可以使用 `wrangler d1 migrations apply` 来应用迁移到本地或远程。

```json
{
  "scripts": {
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts",
    "db:migrate:dev": "wrangler d1 migrations apply <YOUR_DATABASE_NAME> --local",
    "db:migrate:prod": "wrangler d1 migrations apply <YOUR_DATABASE_NAME> --remote"
  }
}
```

## 参考

- [cloudflare-workers-nextjs-saas-template](https://github.com/LubomirGeorgiev/cloudflare-workers-nextjs-saas-template)
