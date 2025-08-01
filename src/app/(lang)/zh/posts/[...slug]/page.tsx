import { format } from 'date-fns'
import { Card, Cards } from 'fumadocs-ui/components/card'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import Link from '~/components/link'
import { WEBSITE } from '~/constants'
import { getRelativePage, source } from '~/lib/source'
import { getMDXComponents } from '~/mdx-components'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = source
    .generateParams('slug', 'lang')
    .filter((s) => s.lang === 'zh')

  return slugs
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug, 'zh')
  if (!page) notFound()

  const currentPathname = page.url
  const currentUrl = `${WEBSITE.domain}${currentPathname}`

  return {
    title: `Posts | ${page.data.title}`,
    description: page.data.description || `Post | ${page.data.title}`,
    keywords: page.data.keywords,
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
    alternates: {
      canonical: currentUrl,
      languages: {
        zh: currentUrl,
        en: `${WEBSITE.domain}${currentPathname.slice((page.locale?.length ?? 0) + 1)}`,
      },
    },
  }
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const slug = params.slug

  const page = source.getPage(slug, 'zh')
  if (!page) notFound()

  const MDXContent = page.data.body

  const { prevPage, nextPage } = getRelativePage(slug, 'zh')
  const enUrl = `/posts/${page.slugs[0]}`

  return (
    <div className='mx-auto max-w-4xl p-4 pt-8'>
      <DocsTitle>{page.data.title}</DocsTitle>
      <div className='mt-2 flex items-center gap-3'>
        <p className='text-muted-foreground'>
          <span>{format(page.data.date, 'MMM-dd, yyyy')}</span>
          {' · '}
          <span>{page.data.duration}</span>
        </p>
        <Link
          href={enUrl}
          replace
          className='flex size-6 cursor-pointer items-center justify-center'
        >
          <Icon.LuLanguages title='change language' />
        </Link>
      </div>
      <DocsDescription className='mt-2 text-sm'>
        {page.data.description}
      </DocsDescription>
      <DocsBody className='mt-4 break-words'>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        <div className='text-accent my-2'>
          <Link href='/zh/posts' className='text-muted-foreground'>
            &gt; cd ..
          </Link>
        </div>
        <Cards>
          {prevPage && <Card title={prevPage.data.title} href={prevPage.url} />}
          {nextPage && <Card title={nextPage.data.title} href={nextPage.url} />}
        </Cards>
      </DocsBody>
    </div>
  )
}
