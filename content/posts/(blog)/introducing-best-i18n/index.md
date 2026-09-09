---
title: "best-i18n: compile-time i18n with no runtime catalog"
description: "Introducing best-i18n — the source text is the message, every translation is inlined at the call site, and a per-locale build collapses to plain string literals. Macros, the PO workflow, Next.js and Vite integrations, and the size numbers."
date: 2026-09-09T03:10:00.000Z
duration: 12min
keywords:
  - i18n
  - best-i18n
  - compile-time
  - gettext
  - Next.js
  - Vite
---

## Why another i18n library

This blog used [lingui](/posts/nextjs-with-lingui-localization) for a long time, and it served
me well. What kept bothering me was what shipped: a catalog, a loader, an ICU formatter — a
whole runtime whose only job is to turn a key back into the text I already wrote in the source
file. On a two-page blog that is a lot of machinery to move a string around.

So I wrote [best-i18n](https://github.com/best-i18n/best-i18n). The idea is not new — Paraglide
proved compile-time i18n works, gettext settled the translation workflow decades ago, and
lingui shaped the macro API. best-i18n puts those three together:

- **No keys.** The source text is the message; ids are content hashes managed for you in PO files.
- **No runtime.** Messages compile to ternaries (single build) or plain literals (per-locale build).
  Unused messages tree-shake with the code that used them.
- **PO workflow.** `messages.pot` + `<locale>.po` — the format translators, TMSes and LLMs
  already understand.
- **SSR-safe.** The server locale lives in `AsyncLocalStorage` per request; if the runtime
  cannot provide isolation it throws instead of silently sharing state between requests.

This blog now runs on it.

## What the compiler does

You write the text you mean:

```tsx
import { useI18n } from 'best-i18n/react/macro'

function About() {
  const t = useI18n()
  return <h1>{t`A small starter with room to grow.`}</h1>
}
```

The default build inlines every translation as a branch at the call site:

```js
// injected by the compiler
import { useLocale } from 'best-i18n/react'

function About() {
  const t = useLocale() // re-renders on locale change
  return (
    <h1>
      {t === 'zh'
        ? `一个小而可长的起始模板。`
        : `A small starter with room to grow.`}
    </h1>
  )
}
```

And a per-locale build — `staticLocale: 'zh'` — collapses that to the one branch:

```js
function About() {
  return <h1>{`一个小而可长的起始模板。`}</h1>
}
```

The `useLocale` import is injected by the transform — it comes from `best-i18n/react`, and it
is the only thing the compiled output depends on. Outside React the same role is played by
`getLocale` from `best-i18n/runtime`, injected the same way. That is, in its entirety, the
runtime the "no runtime" pitch leaves standing: no catalog is loaded, because there is no
catalog; no lookup happens, because there is nothing to look up.

## Setup

Pick the integration for your framework; everything above it is the same either way.

| Framework                                                                | Integration          |
| ------------------------------------------------------------------------ | -------------------- |
| Vite, and anything on it (TanStack Start, React Router, SvelteKit, Astro) | `best-i18n/vite`     |
| Next.js (App Router, Turbopack or webpack)                                | `best-i18n/next`     |
| Rolldown used directly, and tools built on it (tsdown, …)                 | `best-i18n/rolldown` |

```bash
pnpm add best-i18n
```

### Vite

```ts title="vite.config.ts"
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { i18n } from 'best-i18n/vite'

export default defineConfig({
  plugins: [
    i18n({
      messagesDir: fileURLToPath(new URL('./messages', import.meta.url)),
      locales: ['en', 'zh'],
      baseLocale: 'en',
      // set (e.g. from an env var) to build a single locale as pure literals
      staticLocale: process.env.I18N_STATIC_LOCALE,
    }),
  ],
})
```

rolldown-vite keeps the Vite plugin API, so it takes `best-i18n/vite` unchanged;
`best-i18n/rolldown` is for Rolldown without Vite around it.

### Next.js

Next.js does not run on Vite, so it gets its own loader and its own way of carrying the locale
through a render. The languages and the URL shape are described once:

```ts title="src/i18n.ts"
import { defineI18nConfig } from 'best-i18n/next/config'

export const i18n = defineI18nConfig({
  locales: ['en', 'zh'],
  baseLocale: 'en',
  exclude: '^/(api|_next)/',
})
```

```ts title="next.config.ts"
import process from 'node:process'
import { createI18nPlugin } from 'best-i18n/next'
import { i18n } from './src/i18n'

const withI18n = createI18nPlugin({
  ...i18n,
  messagesDir: fileURLToPath(new URL('./messages', import.meta.url)),
  staticLocale: process.env.I18N_STATIC_LOCALE,
})

export default withI18n({})
```

```ts title="src/proxy.ts"
import { createProxy } from 'best-i18n/next/proxy'
import { i18n } from '@/i18n'

export const proxy = createProxy(i18n)
export const config = { matcher: ['/((?!_next|.*\\..*).*)'] }
```

```tsx title="src/app/[locale]/layout.tsx"
import { getLocale } from 'best-i18n/next/server'
import { LocaleProvider } from 'best-i18n/react'
import { i18n } from '@/i18n'

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export const dynamicParams = false

export default function LocaleLayout({ children }) {
  const locale = getLocale()

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale} config={i18n}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
```

That is the whole setup. `t` then works in any Server Component — no per-file call, no `await`,
static rendering intact — and `useI18n` in any Client Component.

Routes live under `[locale]`, but the base locale's URLs stay unprefixed: `/about` is English,
`/zh/about` is Chinese, and `/en/about` redirects to the canonical `/about`. Links are written
unprefixed and localized as they render:

```tsx
import { Link } from 'best-i18n/next/navigation'

// Renders href="/zh/about" while Chinese is active.
function Nav() {
  return <Link href='/about'>{t`About`}</Link>
}
```

`usePathname` and `useRouter` come from the same module, with the prefix stripped and applied
respectively. If you deploy a static export with no proxy to rewrite `/about` onto the
`[locale]` segment, set `prefixBase: true` and `/en/about` becomes the canonical form instead.

### Without a framework

The plugin plus the `t` macro is the whole system:

```ts
import { t } from 'best-i18n/macro'
import { getLocale, setLocale, subscribeLocale } from 'best-i18n/runtime'

function render() {
  document.querySelector('h1')!.textContent =
    t`A small starter with room to grow.`
}

// A message is evaluated where it is called, so a locale change means
// re-running the code that renders.
subscribeLocale(render)
document.querySelector('select')!.onchange = (e) => {
  setLocale((e.target as HTMLSelectElement).value)
}
render()
```

`setLocale` is client-only, deliberately: on a server one shared locale would leak between
concurrent requests. There the locale is bound per request or per scope instead —
`withRequestLocale(request, config, fn)` in a fetch handler, `withLocale(locale, fn)` in a
script, both from `best-i18n/server`.

## Writing messages

```tsx
import { t } from 'best-i18n/macro'

const title = t`A small starter with room to grow.`
const greeting = t`Hi ${name}, you have ${count} items`
```

Inside React components, reactive to locale changes:

```tsx
import { useI18n } from 'best-i18n/react/macro'

function About() {
  const t = useI18n()
  return <p>{t`About`}</p>
}
```

Both are compile-time macros: the binding can only be used as a tagged template. Storing it,
passing it around, destructuring `useI18n()` or shadowing the name is a build error with a file
and offset, not a runtime surprise.

A line break inside a template is code formatting, not content — it collapses to a single
space, the same rule JSX applies to `<Trans>` — so re-indenting a component never changes a
message or orphans its translations. Write `\n` for a literal newline.

An interpolated identifier names its own placeholder, so the translator sees
`Hi {name}, you have {count} items` rather than `Hi {0}, you have {1}`. A dropped or invented
placeholder in a translation is a build error naming the file, the locale and the message.

### Plurals

```tsx
import { plural } from 'best-i18n/macro'

const label = plural(count, `One item`, `${count} items`)
```

The two forms are one gettext entry — `msgid` and `msgid_plural` — and each locale's `.po`
supplies as many `msgstr[n]` forms as its `Plural-Forms` header declares (Russian three,
Chinese one). The compiler inlines that locale's selection formula at the call site, so what
ships is a small arrow function per plural message: no ICU runtime, no `Intl.PluralRules`, and
a one-form locale gets the bare string with no dispatch at all.

### Context and translator comments

Two identical texts that must translate differently are different messages. `ctx` is gettext's
`msgctxt`:

```tsx
const verb = t.ctx('verb')`Open` // 打开
const sign = t.ctx('adjective')`Open` // 营业中
```

A `// i18n:` comment above a message becomes a `#.` extracted comment in the catalogs:

```tsx
// i18n: Button label on the home page, keep it short
const label = t`Save`
```

### Messages with markup

A tagged template cannot hold JSX, so a sentence with a link in it has nowhere to go.
`<Trans>` is that place:

```tsx
import { Trans } from 'best-i18n/react/macro'

function About() {
  return (
    <p>
      <Trans>
        Read the <a href={docsUrl}>documentation</a> to learn more.
      </Trans>
    </p>
  )
}
```

The catalog stores the markup as named placeholders — the tag's own name where it has one, a
number where it does not — for the reason lingui established: a translator moves the pieces,
and never sees a JSX attribute.

```po
msgid "Read the <a>documentation</a> to learn more."
msgstr "请阅读<a>文档</a>了解更多。"
```

Where this parts ways with lingui is what runs. There is no component walking a message tree
per render: each locale's version is reassembled into ordinary JSX at build time.

```jsx
// getLocale is injected by the compiler, from 'best-i18n/runtime'
getLocale() === 'zh' ? (
  <>
    请阅读<a href={docsUrl}>文档</a>了解更多。
  </>
) : (
  <>
    Read the <a href={docsUrl}>documentation</a> to learn more.
  </>
)
```

## Extract and translate

```bash
i18n-extract --locales en,zh          # writes messages/messages.pot + zh.po
i18n-extract --locales en,zh --check  # CI: exit 1 when stale or untranslated
```

The `.po` files are the source of truth — the plugin reads them directly, no compile step in
between. Editing a message file in dev triggers a full reload. An extract run never reduces
the number of translations; if it would, it refuses and asks for `--force`.

The gettext behaviour is the point here. Rewording a message carries its translation over as
`fuzzy` rather than losing it; a fuzzy translation does not build, falls back to the base
locale, and is reported as missing until someone reviews it. Removed messages become `#~`
obsolete entries, never deleted. Comments, flags, plural entries and headers written by
translators or a TMS survive a rewrite untouched.

## Size

The repo carries [four playgrounds](https://github.com/best-i18n/best-i18n/tree/main/playground) — the same two pages, the same messages, the same URLs —
so the comparison is between libraries rather than between apps: best-i18n and next-intl on
Next.js, best-i18n and Paraglide on TanStack Start. `pnpm bench` weighs what a browser actually
downloads.

### Next.js

| variant                            | client JS (gzip) | raw      | HTML /zh (gzip) | HTML /zh/long (gzip) |
| ---------------------------------- | ---------------- | -------- | --------------- | -------------------- |
| no i18n at all                     | 173.4 kB         | 562.0 kB | 1.9 kB          | –                    |
| best-i18n                          | 174.3 kB         | 564.9 kB | 2.4 kB          | 5.0 kB               |
| best-i18n, `I18N_STATIC_LOCALE=zh` | 174.2 kB         | 564.7 kB | 2.4 kB          | 5.0 kB               |
| next-intl                          | 187.4 kB         | 607.4 kB | 4.9 kB          | 5.5 kB               |

### TanStack Start

| variant                            | client JS (gzip) | raw      |
| ---------------------------------- | ---------------- | -------- |
| best-i18n                          | 99.1 kB          | 310.3 kB |
| best-i18n, `I18N_STATIC_LOCALE=zh` | 98.8 kB          | 309.7 kB |
| paraglide                          | 106.9 kB         | 334.9 kB |

The two HTML columns tell the more interesting story. Both home pages render the same handful
of messages, yet `/zh` reads 2.4 kB against 4.9 kB: the difference is the catalog, which
next-intl ships in every page's payload whether the page renders those messages or not. The
`/zh/long` page — a deliberately text-heavy article of ~30 server-rendered messages — is close
on both (5.0 kB against 5.5 kB), because a page that actually renders the text pays for the
text, whoever compiled it.

### What the two gaps are made of

They are not the same kind of gap, and that matters more than the numbers.

**next-intl's ~13 kB is a message runtime** — an ICU formatter, the catalog and the lookup. It
buys plurals, select, dates, numbers and rich text. best-i18n has plurals of its own, but
select, dates and numbers it does not do.

**Paraglide's ~8 kB is a URL router** — a `URLPattern` matcher, cookie handling,
`preferredLanguage` detection — not message lookup. On the message side both libraries inline
and tree-shake, so the gap is fixed rather than growing with the catalog. What it buys is real:
Paraglide can translate the path itself, `/about` becoming `/de/ueber`, which best-i18n cannot
do at all.

### Where best-i18n costs more

Messages are inlined at each call site. Within one module, repeats collapse: the call sites of
a repeated message share one hoisted module-level function. Across modules each module carries
its own copy, because the transform is per-file by design; gzip flattens that repetition
(measured at +0.5 kB gzip for one message used 100 times), so over the wire it is a wash and
what remains is parse time.

**Why there is no cross-module dedup.** It is possible — a virtual module
holding one function per message, imported by every call site, roughly the
shape of Paraglide's generated `messages/` directory. Three things argue
against it here.

The transform is handed one file at a time. Vite's and Rolldown's `transform`
hooks and the Next.js loader all pass a single module with no view of the
graph, so a shared module means either a codegen pass that writes files before
the build, or a virtual module every message-using file has to import. Both
give up what keeps the current design simple: a compiled module is
self-contained, and nothing has to run before the bundler does.

It also would not dedup across the boundary that matters. On the App Router
the server and client module graphs are separate, so a message rendered on
both sides gets its own copy in each of them either way.

And the win is not really there. Repeats within a module already collapse into
one hoisted function; across modules gzip flattens the rest. What is left is
parse time on duplicated string literals — not obviously worth a build-graph
edge into every module in the app.

The hoisted function is already the shape such a module would export, so if an
app turns up where this costs something measurable, it is a contained change
rather than a redesign.

Scaling on the message side was measured too, at 300 extra messages: rendered from a Server
Component they cost no client JS at all, and from a Client Component about 6 bytes each gzipped
for both languages.

## Limitations

Worth knowing before you adopt it:

- Messages must be statically visible — no dynamic message construction.
- On Next.js, a Client Component has to take its locale from `useI18n()`. Plain `t` there would
  fall back to the base locale on the server only, and React would patch the difference at
  hydration without a word — so the loader refuses to compile it, naming the file, the line and
  the message.
- Plurals are gettext plurals, not ICU: there is no `select`/gender construct yet, and no
  number or date formatting — reach for `Intl` with `getLocale()` for those.
- `best-i18n/next/server` reads the locale out of Next's internal render storage, because `t`
  has to resolve synchronously while `params` and `headers()` are async. That is a private API,
  so a Next.js major can break it. The field it reads, `rootParams`, arrived in 15.2, which is
  the peer floor.
- `best-i18n/server` needs `AsyncLocalStorage`. Node and Bun ship it; on Cloudflare Workers it
  exists only behind the `nodejs_compat` (or `nodejs_als`) flag, and without it the import
  throws with an error saying exactly that.

## Thanks

The ideas here are inherited, not invented:

- [GNU gettext](https://www.gnu.org/software/gettext/) — the PO workflow.
- [lingui](https://lingui.dev/) — the macro shape, and the `<0>…</0>` markup convention.
- [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJS) — the proof that
  compile-time i18n with per-locale tree-shaking is viable.
- [next-intl](https://next-intl.dev/) — the reference for what a complete Next.js integration
  covers.

The last two also serve as the honest halves of the size comparison above.

Docs: [best-i18n.aiwan.run](https://best-i18n.aiwan.run). Source:
[github.com/best-i18n/best-i18n](https://github.com/best-i18n/best-i18n).
