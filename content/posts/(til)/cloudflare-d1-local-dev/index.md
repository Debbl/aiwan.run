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

cloudflare d1 is a sqlite database, you can get db file from `.wrangler` folder in your local project. in below code, you can config drizzle to use d1 on local or remote.

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

in `package.json`, you can use `wrangler d1 migrations apply` to apply migrations to local or remote.

```json
{
  "scripts": {
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts",
    "db:migrate:dev": "wrangler d1 migrations apply <YOUR_DATABASE_NAME> --local",
    "db:migrate:prod": "wrangler d1 migrations apply <YOUR_DATABASE_NAME> --remote"
  }
}
```

## reference

- [cloudflare-workers-nextjs-saas-template](https://github.com/LubomirGeorgiev/cloudflare-workers-nextjs-saas-template)
