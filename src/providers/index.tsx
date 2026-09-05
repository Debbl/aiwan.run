import { LocaleProvider } from 'best-i18n/react'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { domAnimation, LazyMotion } from 'motion/react'
import { ThemeProvider } from 'next-themes'
import { isDev } from '~/constants'
import { i18n } from '~/i18n'
import { SerwistProvider } from '~/serwist'
import ClientProviders from './index.client'
import type { Lang } from '~/types'

export default function Providers({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: Lang
}) {
  return (
    <SerwistProvider swUrl='/sw.js' disable={isDev}>
      <RootProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <LazyMotion features={domAnimation} strict>
            <LocaleProvider locale={lang} config={i18n}>
              <ClientProviders>{children}</ClientProviders>
            </LocaleProvider>
          </LazyMotion>
        </ThemeProvider>
      </RootProvider>
    </SerwistProvider>
  )
}
