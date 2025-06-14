'use client'
import { AppProgressProvider } from '@bprogress/next'

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProgressProvider options={{ showSpinner: false }} shallowRouting>
      {children}
    </AppProgressProvider>
  )
}
