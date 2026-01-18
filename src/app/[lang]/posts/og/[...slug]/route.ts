import { withGenerateStaticParams, withGET } from './route.with'
import type { NextRequest } from 'next/server'
import type { Lang } from '~/types'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return withGenerateStaticParams('zh')
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/[lang]/posts/og/[...slug]'>,
) {
  const { lang } = await ctx.params

  return withGET(lang as Lang, _req, ctx)
}
