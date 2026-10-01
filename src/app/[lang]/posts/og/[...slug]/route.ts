import { i18n } from '~/i18n'
import { withGenerateStaticParams, withGET } from './route.with'
import type { NextRequest } from 'next/server'
import type { Lang } from '~/types'

export const dynamic = 'force-static'

export async function generateStaticParams({
  params,
}: {
  params?: { lang?: Lang }
}) {
  const langs = params?.lang
    ? [params.lang]
    : i18n.locales.filter((lang) => lang !== i18n.baseLocale)

  return (
    await Promise.all(
      langs.map((lang) => withGenerateStaticParams(lang as Lang)),
    )
  ).flat()
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/[lang]/posts/og/[...slug]'>,
) {
  const { lang } = await ctx.params

  return withGET(lang as Lang, _req, ctx)
}
