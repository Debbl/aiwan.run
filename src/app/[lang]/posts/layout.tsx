import { msg } from '@lingui/core/macro'
import { WEBSITE } from '~/constants'
import { generateMetadataWithI18n } from '~/i18n'
import type { Metadata } from 'next'
import type { Locale } from '~/i18n/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const i18n = await generateMetadataWithI18n(params)
  const lang = i18n.locale === 'en' ? '' : '/zh'

  return {
    title: i18n.t(msg`Brendan Dash's Blog`),
    alternates: {
      canonical: `${WEBSITE.domain}${lang}/posts`,
      languages: {
        zh: '/zh/posts',
        en: '/posts',
      },
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
