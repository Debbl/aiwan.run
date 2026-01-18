import { withGenerateStaticParams, withGET } from './route.with'
import type { Lang } from '~/types'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return withGenerateStaticParams('zh')
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
