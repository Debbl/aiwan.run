import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Brendan Dash's Posts",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
