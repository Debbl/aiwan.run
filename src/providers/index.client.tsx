'use client'
import { AppProgressProvider } from '@bprogress/next'
import { setupI18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import type { Locale, Locales, Messages } from '@lingui/core'

export default function ClientProviders({
  children,
  initialLocale,
  initialLocales,
  initialMessages,
}: {
  children: React.ReactNode
  initialLocale: Locale
  initialLocales?: Locales
  initialMessages: Messages
}) {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      locales: initialLocales,
      messages: { [initialLocale]: initialMessages },
    }),
  )

  return (
    <I18nProvider i18n={i18n}>
      <AppProgressProvider options={{ showSpinner: false }} shallowRouting>
        {children}
      </AppProgressProvider>
    </I18nProvider>
  )
}
