import {
  withGenerateMetadata,
  withGenerateStaticParams,
  WithPage,
} from '~/app/[lang]/posts/[...slug]/page.with'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return withGenerateStaticParams('en')
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  return withGenerateMetadata('en', props)
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  return WithPage('en', props)
}
