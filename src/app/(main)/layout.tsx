import { withGenerateMetadata, WithLayout } from '../[lang]/layout.with'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return withGenerateMetadata('en')
}

export default function Layout(props: { children: React.ReactNode }) {
  return WithLayout('en', props)
}
