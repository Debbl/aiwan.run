import { WEBSITE } from '~/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brendan Dash 的博客',
  alternates: {
    canonical: `${WEBSITE.domain}/zh/posts`,
    languages: {
      zh: '/zh/posts',
      en: '/posts',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
