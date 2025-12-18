import { RootProvider } from 'fumadocs-ui/provider/next'
import { domAnimation, LazyMotion } from 'motion/react'
import { ThemeProvider } from 'next-themes'
import { getI18nInstance } from '~/i18n'
import ClientProviders from './index.client'
import type { Lang } from '~/types'

export default async function Providers({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: Lang
}) {
  const i18n = await getI18nInstance(lang)

  return (
    <RootProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <LazyMotion features={domAnimation} strict>
          <ClientProviders
            initialLocale={i18n.locale}
            initialLocales={i18n.locales ?? []}
            initialMessages={i18n.messages}
          >
            {children}
          </ClientProviders>
        </LazyMotion>
      </ThemeProvider>
    </RootProvider>
  )
}
