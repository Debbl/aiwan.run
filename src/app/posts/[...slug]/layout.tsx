import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { source } from '~/lib/source'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} sidebar={{ enabled: false }} nav={{ enabled: false }}>
      {children}
    </DocsLayout>
  )
}
