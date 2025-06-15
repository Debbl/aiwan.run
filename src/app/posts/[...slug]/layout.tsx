import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { source } from '~/lib/source'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      containerProps={{
        className: '[--fd-sidebar-width:0px]!',
      }}
      tree={source.pageTree}
      sidebar={{ enabled: false }}
      nav={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  )
}
