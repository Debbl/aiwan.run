import { format } from 'date-fns'
import { Card, Cards } from 'fumadocs-ui/components/card'
import {
  PageTOCPopover,
  PageTOCPopoverContent,
  PageTOCPopoverItems,
  PageTOCPopoverTrigger,
} from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { WEBSITE } from '~/constants'
import { getRelativePage, source } from '~/lib/source'
import { getMDXComponents } from '~/mdx-components'
import type { Metadata } from 'next'

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const slug = params.slug

  const page = source.getPage(slug)
  if (!page) notFound()

  const MDXContent = page.data.body

  const { prevPage, nextPage } = getRelativePage(slug)
  const enabledToc = page.path.startsWith('(blog)') && page.data.toc.length > 0

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      tableOfContentPopover={{
        enabled: enabledToc,
        style: 'clerk',
        component: (
          <PageTOCPopover className='sticky top-0'>
            <PageTOCPopoverTrigger />
            <PageTOCPopoverContent>
              <PageTOCPopoverItems variant='clerk' />
            </PageTOCPopoverContent>
          </PageTOCPopover>
        ),
      }}
      tableOfContent={{
        enabled: enabledToc,
        style: 'clerk',
      }}
      footer={{
        enabled: false,
      }}
      container={{
        className: cn(
          enabledToc &&
            'mz-auto xl:ml-auto xl:mr-0 flex flex-col xl:flex-row pt-2!',
        ),
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

export async function generateStaticParams() {
  return [...source.generateParams()]
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: `Posts | ${page.data.title}`,
    description: page.data.description || `Post | ${page.data.title}`,
    openGraph: {
      type: 'website',
      url: `${WEBSITE.domain}${page.url}`,
      title: page.data.title,
      description: page.data.description || `Post | ${page.data.title}`,
      images: [
        {
          alt: `${page.data.title}`,
          url: `/posts/og/${page.slugs.at(-1)}.png`,
          width: 800,
          height: 400,
        },
      ],
      emails: [WEBSITE.email],
    },
  }
}
