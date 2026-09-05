import { t } from 'best-i18n/macro'
import { WEBSITE } from '~/constants'
import type { Metadata } from 'next'
import type { Lang } from '~/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: Lang }>
}): Promise<Metadata> {
  const { lang } = await params
  const prefix = lang === 'zh' ? '/zh' : ''

  return {
    title: t`Brendan Dash's Blog`,
    alternates: {
      canonical: `${WEBSITE.domain}${prefix}/posts`,
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
