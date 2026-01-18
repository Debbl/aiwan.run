import {
  withGenerateMetadata,
  withGenerateStaticParams,
  WithLayout,
} from './layout.with'
import type { Metadata } from 'next'
import type { Lang } from '~/types'

export async function generateStaticParams() {
  return withGenerateStaticParams('zh')
}

export async function generateMetadata(props: {
  params: Promise<{ lang: Lang }>
}): Promise<Metadata> {
  const { lang } = await props.params
  return withGenerateMetadata(lang)
}

export default async function Layout(props: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await props.params

  return WithLayout(lang as Lang, props)
}
