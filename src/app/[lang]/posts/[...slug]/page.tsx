import {
  withGenerateMetadata,
  withGenerateStaticParams,
  WithPage,
} from './page.with'
import type { Metadata } from 'next'
import type { Lang } from '~/types'

export async function generateStaticParams() {
  return withGenerateStaticParams('zh')
}

export async function generateMetadata(props: {
  params: Promise<{ lang: Lang; slug?: string[] }>
}): Promise<Metadata> {
  const { lang } = await props.params

  return withGenerateMetadata(lang, props)
}

export default async function Page(props: {
  params: Promise<{ lang: Lang; slug?: string[] }>
}) {
  const { lang } = await props.params

  return WithPage(lang, props)
}
