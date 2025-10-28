import { format } from 'date-fns'
import { Card, Cards } from 'fumadocs-ui/components/card'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { WEBSITE } from '~/constants'
import { getRelativePage, source } from '~/lib/source'
import { getMDXComponents } from '~/mdx-components'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = source
    .generateParams('slug', 'lang')
    .filter((s) => s.lang === 'en')

  return slugs
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug, 'en')
  if (!page) notFound()

  const currentPathname = page.url.slice((page.locale?.length ?? 0) + 1)
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
      emails: [WEBSITE.email],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        zh: `${WEBSITE.domain}/zh${currentPathname}`,
        en: currentUrl,
      },
    },
  }
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const slug = params.slug

  const page = source.getPage(slug, 'en')
  if (!page) notFound()

  const MDXContent = page.data.body

  const { prevPage, nextPage } = getRelativePage(slug)
  const zhUrl = `/zh/posts/${page.slugs[0]}`

  const getUrlWithoutLang = (page: typeof prevPage | typeof nextPage) => {
    return `${page?.url.slice((page?.locale?.length ?? 0) + 1)}`
  }

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
          href={zhUrl}
          replace
          className='flex size-6 cursor-pointer items-center justify-center'
        >
          <Icon.LuLanguages title='change language' />
        </Link>
      </div>
      <DocsDescription className='mt-2 text-sm'>
        {page.data.description}
      </DocsDescription>
      <DocsBody className='mt-4 wrap-break-word'>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        <div className='text-accent my-2'>
          <Link href='/posts' className='text-muted-foreground'>
            &gt; cd ..
          </Link>
        </div>
        <Cards>
          {prevPage && (
            <Card
              title={prevPage.data.title}
              href={getUrlWithoutLang(prevPage)}
            />
          )}
          {nextPage && (
            <Card
              title={nextPage.data.title}
              href={getUrlWithoutLang(nextPage)}
            />
          )}
        </Cards>
      </DocsBody>
    </div>
  )
}
