---
title: Refactor this blog with FumaDocs
description: Detailed introduction to how to refactor the existing blog with FumaDocs, including schema definition, custom component development, MDX plugin configuration, and type-safe structured data processing.
date: 2025-05-25T10:27:54.972Z
duration: 5min
keywords:
  - FumaDocs
  - Next.js
  - mdx
  - Refactor
  - Blog
  - Static Site Generator
  - Static Site
---

# Refactor this blog with FumaDocs

## Related links

- [FumaDocs](https://github.com/fuma-nama/fumadocs)
- [Related PR](https://github.com/Debbl/aiwan.run/pull/51)

## Why choose FumaDocs

Previously, I used the combination of Nextjs and mdx, using mdx as a page to render articles. For details, please refer to this article [How I Built This Blog](/posts/how-i-build-this-blog), but there is a problem that it is not very easy to obtain structured data, and some mdx plugins are complex to implement from scratch. Recently, I saw the FumaDocs project on X, and it felt quite good, so I decided to try it out.

Overall, it felt good, with high customization, type-safe structured data, and the ability to configure different mdx plugins for different collections. For example, when generating og images for each article, I can directly get all the article data through `source.getPages()`.

## Refactor process

### Define date type schema

For most articles, I usually define three frontmatter fields, namely `title`, `date`, and `duration`. However, the schema in FumaDocs does not provide a `date` type schema, so I need to define it myself.

```md
---
title: Refactor this blog with FumaDocs
date: 2025-05-25T10:27:54.972Z
duration: 5min
---
```

FumaDocs uses gray-matter to parse frontmatter, for `data` type, you need to use the [zod transform](https://zod.dev/api?id=transforms) method to convert the string to a date type.

- [FumaDocs source code position](https://github.com/fuma-nama/fumadocs/blob/fe54a5696dc0c505f222a0974ee28996e99537d4/packages/mdx/src/loader-mdx.ts#L28)

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

### Custom Toc component

[FumaDocs source code position](https://github.com/fuma-nama/fumadocs/blob/fe54a5696dc0c505f222a0974ee28996e99537d4/packages/ui/src/page.tsx#L195-L216)

Here, I mainly want to remove the title `on this page`, so I need to customize the Toc component.

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
        {tocOptions.style === 'clerk' ? (
          <ClerkTOCItems items={toc} />
        ) : (
          <TOCItems items={toc} />
        )}
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

Passing the `component` parameter allows you to customize the Toc component.

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

## Integrate twoslash

[FumaDocs documentation](https://fumadocs.dev/docs/ui/markdown/twoslash)
