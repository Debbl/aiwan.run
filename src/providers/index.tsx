import { RootProvider } from 'fumadocs-ui/provider'
import { domAnimation, LazyMotion } from 'motion/react'
import { ThemeProvider } from 'next-themes'
import ClientProviders from './index.client'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <LazyMotion features={domAnimation} strict>
          <ClientProviders>{children}</ClientProviders>
        </LazyMotion>
      </ThemeProvider>
    </RootProvider>
  )
}
