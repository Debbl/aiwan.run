import { i18n } from '~/i18n'
import { withGET } from './route.with'
import type { Lang } from '~/types'

export const dynamic = 'force-static'

export function generateStaticParams({ params }: { params?: { lang?: Lang } }) {
  const langs = params?.lang
    ? [params.lang]
    : i18n.locales.filter((lang) => lang !== i18n.baseLocale)

  return langs.map((lang) => ({ lang }))
}

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ lang: string }>
  },
) {
  const { lang } = await params

  return withGET(lang as Lang)
}
