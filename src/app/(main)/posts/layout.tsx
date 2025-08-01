import { WEBSITE } from '~/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Brendan Dash's Posts",
  alternates: {
    canonical: `${WEBSITE.domain}/posts`,
    languages: {
      zh: '/zh/posts',
      en: '/posts',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
