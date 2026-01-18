/* eslint-disable react-refresh/only-export-components */
import { format } from 'date-fns'
import { Card, Cards } from 'fumadocs-ui/components/card'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { WEBSITE } from '~/constants'
import { linguiConfig } from '~/i18n/config'
import { getRelativePage, source } from '~/lib/source'
import { getMDXComponents } from '~/mdx-components'
import type { Metadata } from 'next'
import type { Lang } from '~/types'

export async function withGenerateStaticParams(lang: Lang) {
  const slugs = source
    .generateParams('slug', 'lang')
    .filter((s) => s.lang === lang)

  return slugs
}

export async function withGenerateMetadata(
  lang: Lang,
  {
    params,
  }: {
    params: Promise<{ slug?: string[] }>
  },
): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug, lang)
  if (!page) notFound()

  const pathName = `/${page.url.split('/').slice(2).join('/')}`
  const currentPathname = lang === 'zh' ? page.url : pathName
  const langPath = lang === 'zh' ? `${WEBSITE.domain}/zh` : WEBSITE.domain

  return {
    title: `Posts | ${page.data.title}`,
    description: page.data.description || `Post | ${page.data.title}`,
    keywords: page.data.keywords,
    openGraph: {
      type: 'website',
      images: [
        `${langPath}/posts/og/${page.slugs.concat(['opengraph-image.png']).join('/')}`,
      ],
      url: currentPathname,
      title: page.data.title,
      description: page.data.description || `Post | ${page.data.title}`,
      emails: [WEBSITE.email],
    },
    alternates: {
      canonical: currentPathname,
      languages: linguiConfig.locales.reduce(
        (acc, l) => ({
          ...acc,
          [l]: l === 'en' ? pathName : `/${l}${pathName}`,
        }),
        {},
      ),
    },
  }
}

export async function WithPage(
  lang: Lang,
  props: {
    params: Promise<{ slug?: string[] }>
  },
) {
  const params = await props.params
  const slug = params.slug

  const page = source.getPage(slug, lang)
  if (!page) notFound()

  const MDXContent = page.data.body

  const { prevPage, nextPage } = getRelativePage(slug, lang)
  const otherLangUrl = `${lang === 'zh' ? '' : '/zh'}/posts/${page.slugs[0]}`

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
          href={otherLangUrl}
          replace
          noLocale
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
          {prevPage && <Card title={prevPage.data.title} href={prevPage.url} />}
          {nextPage && <Card title={nextPage.data.title} href={nextPage.url} />}
        </Cards>
      </DocsBody>
    </div>
  )
}
