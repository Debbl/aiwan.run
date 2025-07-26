import { WEBSITE } from '~/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Brendan Dash's Blog",
  alternates: {
    canonical: `${WEBSITE.domain}/zh`,
    languages: {
      zh: '/zh',
      en: '/',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
