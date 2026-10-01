import { i18n } from '~/i18n'
import { withGenerateMetadata, WithLayout } from './layout.with'
import type { Metadata } from 'next'
import type { Lang } from '~/types'

export const dynamicParams = false

export function generateStaticParams() {
  return i18n.locales
    .filter((lang) => lang !== i18n.baseLocale)
    .map((lang) => ({ lang }))
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
