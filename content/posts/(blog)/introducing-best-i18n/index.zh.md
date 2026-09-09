---
title: "best-i18n：没有运行时词表的编译时国际化"
description: "介绍 best-i18n —— 源文本即消息，翻译在调用处内联，单语言构建直接塌缩成字符串字面量。包含宏、PO 工作流、Next.js 与 Vite 集成，以及体积对比数据。"
date: 2026-09-09T03:10:00.000Z
duration: 12min
keywords:
  - 国际化
  - best-i18n
  - 编译时
  - gettext
  - Next.js
  - Vite
---

## 为什么又写了一个 i18n 库

这个博客用了很久的 [lingui](/posts/nextjs-with-lingui-localization)，体验其实不错。一直让我不太舒服的是最后打包出去的东西：一份词表、一个 loader、一个 ICU 格式化器 —— 这一整套运行时唯一的工作，就是把一个 key 换回我本来就写在源文件里的那句话。对一个两个页面的博客来说，为了搬运一个字符串，这套机器太重了。

于是写了 [best-i18n](https://github.com/best-i18n/best-i18n)。想法并不新鲜 —— Paraglide 证明了编译时 i18n 可行，gettext 几十年前就把翻译工作流定下来了，lingui 定义了宏的形态。best-i18n 把这三件事拼在一起：

- **没有 key**。源文本就是消息，id 是内容哈希，由 PO 文件替你管理。
- **没有运行时**。消息编译成三元表达式（单次构建）或纯字面量（单语言构建）。没用到的消息会跟着用它的代码一起被 tree-shake 掉。
- **PO 工作流**。`messages.pot` + `<locale>.po` —— 译者、TMS 和 LLM 都已经认识的格式。
- **SSR 安全**。服务端的 locale 按请求存在 `AsyncLocalStorage` 里；如果运行时无法提供隔离，它会直接抛错，而不是悄悄地在请求之间共享状态。

这个博客现在就跑在它上面。

## 编译器做了什么

你写你真正想说的那句话：

```tsx
import { useI18n } from 'best-i18n/react/macro'

function About() {
  const t = useI18n()
  return <h1>{t`A small starter with room to grow.`}</h1>
}
```

默认构建把每种语言的翻译作为分支内联在调用处：

```js
// 由编译器注入
import { useLocale } from 'best-i18n/react'

function About() {
  const t = useLocale() // locale 变化时重新渲染
  return (
    <h1>
      {t === 'zh'
        ? `一个小而可长的起始模板。`
        : `A small starter with room to grow.`}
    </h1>
  )
}
```

而单语言构建 —— `staticLocale: 'zh'` —— 会把它塌缩成唯一的那个分支：

```js
function About() {
  return <h1>{`一个小而可长的起始模板。`}</h1>
}
```

`useLocale` 这行 import 是转换时注入的 —— 它来自 `best-i18n/react`，也是编译产物唯一依赖的东西。在 React 之外，同样的角色由 `best-i18n/runtime` 的 `getLocale` 承担，注入方式一样。这就是「没有运行时」这个说法背后仍然留下的全部运行时：没有词表被加载，因为根本没有词表；没有查表发生，因为没有东西可查。

## 接入

按框架选一个集成，它上面的部分都是一样的。

| 框架                                                       | 集成                 |
| ---------------------------------------------------------- | -------------------- |
| Vite 以及基于它的（TanStack Start、React Router、SvelteKit、Astro） | `best-i18n/vite`     |
| Next.js（App Router，Turbopack 或 webpack）                 | `best-i18n/next`     |
| 直接使用的 Rolldown 以及基于它的工具（tsdown……）             | `best-i18n/rolldown` |

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
      // 设置它（比如从环境变量读）来构建单一语言的纯字面量产物
      staticLocale: process.env.I18N_STATIC_LOCALE,
    }),
  ],
})
```

rolldown-vite 保留了 Vite 的插件 API，所以直接用 `best-i18n/vite` 即可；`best-i18n/rolldown` 是给不带 Vite 的纯 Rolldown 用的。

### Next.js

Next.js 不跑在 Vite 上，所以它有自己的 loader，也有自己在一次渲染中传递 locale 的方式。语言和 URL 形态只描述一次：

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

接入就这些。之后 `t` 在任何 Server Component 里都能用 —— 不需要每个文件调一次，不需要 `await`，静态渲染也不受影响 —— `useI18n` 则在任何 Client Component 里可用。

路由放在 `[locale]` 下，但基准语言的 URL 保持无前缀：`/about` 是英文，`/zh/about` 是中文，`/en/about` 会重定向到规范的 `/about`。链接按无前缀书写，在渲染时本地化：

```tsx
import { Link } from 'best-i18n/next/navigation'

// 当前是中文时，渲染出 href="/zh/about"
function Nav() {
  return <Link href='/about'>{t`About`}</Link>
}
```

`usePathname` 和 `useRouter` 来自同一个模块，分别负责去掉和补上前缀。如果部署的是没有 proxy 把 `/about` 重写到 `[locale]` 段的静态导出，就把配置里的 `prefixBase` 设为 `true`，此时 `/en/about` 变成规范形式。

### 不用框架

插件加上 `t` 宏就是全部：

```ts
import { t } from 'best-i18n/macro'
import { getLocale, setLocale, subscribeLocale } from 'best-i18n/runtime'

function render() {
  document.querySelector('h1')!.textContent =
    t`A small starter with room to grow.`
}

// 消息在调用的地方求值，所以切换语言意味着重新跑渲染的代码
subscribeLocale(render)
document.querySelector('select')!.onchange = (e) => {
  setLocale((e.target as HTMLSelectElement).value)
}
render()
```

`setLocale` 是刻意设计成只在客户端可用的：在服务端，一个共享的 locale 会在并发请求之间泄漏。服务端改为按请求或按作用域绑定 —— fetch handler 里用 `withRequestLocale(request, config, fn)`，脚本里用 `withLocale(locale, fn)`，都来自 `best-i18n/server`。

## 写消息

```tsx
import { t } from 'best-i18n/macro'

const title = t`A small starter with room to grow.`
const greeting = t`Hi ${name}, you have ${count} items`
```

在 React 组件里，随 locale 变化响应式更新：

```tsx
import { useI18n } from 'best-i18n/react/macro'

function About() {
  const t = useI18n()
  return <p>{t`About`}</p>
}
```

两者都是编译时的宏：这个绑定只能作为标签模板使用。把它存起来、传来传去、解构 `useI18n()` 或者遮蔽这个名字，都是带文件名和偏移量的构建错误，而不是运行时的意外。

模板里的换行属于代码格式，不属于内容：它会折叠成一个空格 —— 和 JSX 对 `<Trans>` 的规则一致 —— 所以重新缩进一个组件永远不会改变消息、也不会让它的翻译变成孤儿。要真正的换行请写 `\n`。

插值的标识符会给自己的占位符命名，所以译者看到的是 `Hi {name}, you have {count} items` 而不是 `Hi {0}, you have {1}`。翻译里少了或凭空多了占位符，会是一个明确指出文件、语言和消息的构建错误。

### 复数

```tsx
import { plural } from 'best-i18n/macro'

const label = plural(count, `One item`, `${count} items`)
```

两种形式是同一条 gettext 条目 —— `msgid` 和 `msgid_plural` —— 每种语言的 `.po` 按自己 `Plural-Forms` 头声明的数量提供 `msgstr[n]`（俄语三种，中文一种）。编译器把该语言的选择公式内联在调用处，所以最终产物是每条复数消息一个很小的箭头函数：没有 ICU 运行时，没有 `Intl.PluralRules`，而只有一种形式的语言拿到的就是裸字符串，连分发都没有。

### 上下文与给译者的注释

两句一模一样但必须译得不同的文本，是两条不同的消息。`ctx` 就是 gettext 的 `msgctxt`：

```tsx
const verb = t.ctx('verb')`Open` // 打开
const sign = t.ctx('adjective')`Open` // 营业中
```

消息上方的 `// i18n:` 注释会成为 catalog 里的 `#.` 提取注释：

```tsx
// i18n: 首页上的按钮文案，保持简短
const label = t`Save`
```

### 带标签的消息

标签模板装不下 JSX，所以一句里面带链接的话没地方放。`<Trans>` 就是那个地方：

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

catalog 把标签存成具名占位符 —— 有名字的用标签自己的名字，没有的用编号 —— 理由和 lingui 当初一样：译者只需要挪动这些片段，永远不该看到 JSX 属性。

```po
msgid "Read the <a>documentation</a> to learn more."
msgstr "请阅读<a>文档</a>了解更多。"
```

与 lingui 分道扬镳的地方在于「跑起来的是什么」。这里没有一个组件在每次渲染时去遍历消息树：每种语言的版本在构建时就被重新组装成普通的 JSX。

```jsx
// getLocale 由编译器从 'best-i18n/runtime' 注入
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

## 提取与翻译

```bash
i18n-extract --locales en,zh          # 生成 messages/messages.pot + zh.po
i18n-extract --locales en,zh --check  # CI：过期或未翻译时以 1 退出
```

`.po` 文件就是唯一真相 —— 插件直接读它，中间没有编译步骤。开发时修改消息文件会触发整页刷新。一次提取永远不会让翻译数量变少；如果会，它会拒绝执行并要求加 `--force`。

这里真正重要的是 gettext 的那套行为：改写一条消息时，原翻译会被标成 `fuzzy` 带过去，而不是丢失；fuzzy 的翻译不参与构建，会回退到基准语言，并在有人复核之前一直被报告为缺失。被删掉的消息变成 `#~` 废弃条目，而不是被删除。译者或 TMS 写下的注释、标记、复数条目和头部信息，在重写后原样保留。

## 体积

仓库里有[四个 playground](https://github.com/best-i18n/best-i18n/tree/main/playground) —— 相同的两个页面、相同的消息、相同的 URL —— 所以比较的是库而不是应用：Next.js 上的 best-i18n 与 next-intl，TanStack Start 上的 best-i18n 与 Paraglide。`pnpm bench` 称量的是浏览器真正下载的东西。

### Next.js

| 变体                               | client JS (gzip) | raw      | HTML /zh (gzip) | HTML /zh/long (gzip) |
| ---------------------------------- | ---------------- | -------- | --------------- | -------------------- |
| 完全不做 i18n                      | 173.4 kB         | 562.0 kB | 1.9 kB          | –                    |
| best-i18n                          | 174.3 kB         | 564.9 kB | 2.4 kB          | 5.0 kB               |
| best-i18n，`I18N_STATIC_LOCALE=zh` | 174.2 kB         | 564.7 kB | 2.4 kB          | 5.0 kB               |
| next-intl                          | 187.4 kB         | 607.4 kB | 4.9 kB          | 5.5 kB               |

### TanStack Start

| 变体                               | client JS (gzip) | raw      |
| ---------------------------------- | ---------------- | -------- |
| best-i18n                          | 99.1 kB          | 310.3 kB |
| best-i18n，`I18N_STATIC_LOCALE=zh` | 98.8 kB          | 309.7 kB |
| paraglide                          | 106.9 kB         | 334.9 kB |

更有意思的是那两列 HTML。两边首页渲染的是同样的几条消息，`/zh` 却是 2.4 kB 对 4.9 kB：差的就是词表 —— next-intl 会把它放进每个页面的 payload，不管这个页面是否渲染了那些消息。而 `/zh/long`（一篇刻意堆了约 30 条服务端渲染消息的长文）两边接近（5.0 kB 对 5.5 kB），因为真正渲染了文本的页面，无论谁编译的，都得为文本买单。

### 这两个差距是由什么构成的

它们不是同一种差距，而这比数字本身更重要。

**next-intl 的约 13 kB 是一个消息运行时** —— ICU 格式化器、词表和查表。它换来的是复数、select、日期、数字和富文本。best-i18n 有自己的复数，但 select、日期和数字它不做。

**Paraglide 的约 8 kB 是一个 URL 路由器** —— `URLPattern` 匹配、cookie 处理、`preferredLanguage` 探测 —— 而不是消息查找。在消息这一侧两个库都是内联加 tree-shake，所以差距是固定的，不会随词表增长。它换来的东西也很实在：Paraglide 能翻译路径本身，把 `/about` 变成 `/de/ueber`，这一点 best-i18n 完全做不到。

### best-i18n 更贵的地方

消息在每个调用处被内联。在同一个模块内，重复会被收敛：同一条消息的多个调用处共享一个提升到模块级的函数。跨模块则每个模块各带一份，因为这个转换按设计就是逐文件的；gzip 会把这种重复压平（实测同一条消息用 100 次约 +0.5 kB gzip），所以在网络上基本是持平的，剩下的成本是解析时间。

**为什么现在不做跨模块去重。** 它是可行的 —— 一个虚拟模块，每条消息一个函数，由所有调用处 import，大致就是 Paraglide 生成的 `messages/` 目录的形态。这里有三点理由不这么做。

transform 每次只拿到一个文件。Vite 和 Rolldown 的 `transform` 钩子、Next.js 的 loader，交给插件的都是单个模块，看不到模块图。所以共享模块要么需要一趟在构建之前写文件的 codegen，要么需要一个所有用到消息的文件都得 import 的虚拟模块。两者都会放弃当前设计里最省心的那条性质：编译产物是自包含的，打包器开始之前不需要先跑任何东西。

而且它也不会在真正要紧的那条边界上去重。App Router 里服务端和客户端是两张独立的模块图，两边都渲染的消息无论如何都会各留一份。

再说收益本来也不大。模块内的重复已经坍缩成一个提升出来的函数；跨模块的部分 gzip 会把它压平，剩下的只是重复字符串字面量的解析时间 —— 为此往应用里每个模块都插一条构建图上的边，并不明显划算。

那个提升出来的函数本身就是这样一个模块该导出的形态，所以真出现能测出代价的场景，它是一处收敛的改动，而不是重新设计。

消息规模也测过：额外 300 条消息时，从 Server Component 渲染完全不产生 client JS，从 Client Component 渲染约每条 6 字节（gzip 后，两种语言合计）。

## 局限

采用之前值得知道的：

- 消息必须是静态可见的 —— 不能动态拼接消息。
- 在 Next.js 里，Client Component 必须从 `useI18n()` 取 locale。在那里用普通的 `t` 只会在服务端回退到基准语言，React 会在 hydration 时一声不响地把差异补上 —— 所以 loader 直接拒绝编译它，并指出文件、行号和消息。
- 复数是 gettext 复数，不是 ICU：目前没有 `select`／性别构造，也没有数字和日期格式化 —— 这些请配合 `getLocale()` 直接用 `Intl`。
- `best-i18n/next/server` 从 Next 内部的渲染存储里读取 locale，因为 `t` 必须同步解析，而 `params` 和 `headers()` 是异步的。那是私有 API，所以 Next.js 的大版本可能会破坏它。它读的字段 `rootParams` 在 15.2 引入，这也就是 peer 依赖的下限。
- `best-i18n/server` 需要 `AsyncLocalStorage`。Node 和 Bun 自带；Cloudflare Workers 上它只在 `nodejs_compat`（或 `nodejs_als`）兼容性标志下存在，没有该标志时 import 会抛出一个明确说明原因的错误。

## 致谢

这里的想法是继承来的，不是发明的：

- [GNU gettext](https://www.gnu.org/software/gettext/) —— PO 工作流。
- [lingui](https://lingui.dev/) —— 宏的形态，以及 `<0>…</0>` 的标签约定。
- [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJS) —— 证明了带单语言 tree-shaking 的编译时 i18n 是可行的。
- [next-intl](https://next-intl.dev/) —— 一个完整的 Next.js 集成该覆盖哪些东西的参照。

后两者同时也充当了上面体积对比中诚实的另一半。

文档：[best-i18n.aiwan.run](https://best-i18n.aiwan.run)。源码：[github.com/best-i18n/best-i18n](https://github.com/best-i18n/best-i18n)。
