import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brendan Dash 的博客',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
