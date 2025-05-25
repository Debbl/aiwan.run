---
title: 使用 FumaDocs 重构这个博客
date: 2025-05-25T10:27:54.972Z
duration: 5min
---

# 使用 FumaDocs 重构这个博客

## 相关链接

- [FumaDocs](https://github.com/fuma-nama/fumadocs)
- [相关 PR](https://github.com/Debbl/aiwan.run/pull/51)

## 为什么选择 FumaDocs

之前使用的是 Nextjs 与 mdx 的组合，使用 mdx 作为一个 page 来渲染文章，具体可以看这篇文章[我是如何搭建这个博客的](/posts/how-i-build-this-blog)，但是有个问题就是不是特别好获取结构化数据，而且一些 mdx 的插件从头实现有点儿复杂，最近在 X 上看到 FumaDocs 这个项目，感觉挺不错的，就决定试试看。

总体试下来还是感觉不错的，自定义程度非常高，类型安全的结构化数据，可以为不同的集合配置不同的 mdx 插件，比如在为每一个文章生成 og 图片时可以直接通过 `source.getPages()` 获取到全部的文章数据。

## 重构过程遇到的一些问题

### 定义 date 类型的 schema

一般的文章我通常会定义三个 frontmatter 字段，分别是 `title`、`date` 和 `duration`，但是 FumaDocs 的 schema 中没有提供 `date` 类型的 schema，所以需要自己定义。

```md
---
title: 使用 FumaDocs 重构这个博客
date: 2025-05-25T10:27:54.972Z
duration: 5min
---
```

fumadocs 内部使用的是 gray-matter 来解析 frontmatter 的，对于 `data` 类型, 需要使用 [zod transform](https://zod.dev/api?id=transforms) 方法来将字符串转换为日期类型。

- [fumadocs 源码位置](https://github.com/fuma-nama/fumadocs/blob/fe54a5696dc0c505f222a0974ee28996e99537d4/packages/mdx/src/loader-mdx.ts#L28)

```ts
export const docs = defineDocs({
  dir: 'content/posts',
  docs: {
    schema: frontmatterSchema.extend({
      duration: z.string().optional().default('1m'),
      date: z.date().transform((val) => new Date(val)), // [!code focus]
    }),
  },
  meta: {
    schema: metaSchema,
  },
})
```

### 自定义 Toc 组件

[fumadocs 源码位置](https://github.com/fuma-nama/fumadocs/blob/fe54a5696dc0c505f222a0974ee28996e99537d4/packages/ui/src/page.tsx#L195-L216)

这里主要想去掉 `on this page` 的标题，所以需要自定义 Toc 组件。

```tsx {1-10}
{
  slot(
    { enabled: tocEnabled, component: tocReplace },
    <Toc>
      {tocOptions.header}
      {/* [!code highlight:4] */}
      <h3 className='inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground'>
        <Text className='size-4' />
        <I18nLabel label='toc' />
      </h3>
      <TOCScrollArea>
        {tocOptions.style === 'clerk' ? <ClerkTOCItems items={toc} /> : <TOCItems items={toc} />}
      </TOCScrollArea>
      {tocOptions.footer}
    </Toc>,
    {
      items: toc,
      ...tocOptions,
    },
  )
}
```

传递 component 参数，可以自定义 Toc 组件。

```tsx
{/* [!code highlight:9] */}
function TableOfContent(props: any) {
  const { items, style } = props

  return (
    <Toc>
      <TOCScrollArea>{style === 'clerk' ? <ClerkTOCItems items={items} /> : <TOCItems items={items} />}</TOCScrollArea>
    </Toc>
  )
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const slug = params.slug

  const page = source.getPage(slug)
  if (!page) notFound()

  const MDXContent = page.data.body

  const { prevPage, nextPage } = getRelativePage(slug)

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      {/* [!code highlight:6] */}
      tableOfContent={{
        enabled: page.file.dirname.startsWith('(blog)') && page.data.toc.length > 0,
        style: 'clerk',
        header: null,
        component: <TableOfContent />,
      }}
      footer={{
        enabled: false,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <p className='text-muted-foreground mt-2'>
        <span>{format(page.data.date, 'MMM-dd, yyyy')}</span>
        {' · '}
        <span>{page.data.duration}</span>
      </p>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody className='break-words'>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        <Cards>
          {prevPage && <Card title={prevPage.data.title} href={prevPage.url} />}
          {nextPage && <Card title={nextPage.data.title} href={nextPage.url} />}
        </Cards>
      </DocsBody>
    </DocsPage>
  )
}
```

## 集成 twoslash

[fumadocs 文档](https://fumadocs.dev/docs/ui/markdown/twoslash)
