import { Card, Cards } from 'fumadocs-ui/components/card'
import { Toc, TOCItems, TOCScrollArea } from 'fumadocs-ui/components/layout/toc'
import ClerkTOCItems from 'fumadocs-ui/components/layout/toc-clerk'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { getRelativePage, source } from '~/lib/source'
import { getMDXComponents } from '~/mdx-components'

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
      tableOfContent={{
        style: 'clerk',
        header: null,
        component: <TableOfContent />,
      }}
      footer={{
        enabled: false,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
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

export async function generateStaticParams() {
  return [...source.generateParams()]
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
