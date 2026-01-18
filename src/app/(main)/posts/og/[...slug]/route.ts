import {
  withGenerateStaticParams,
  withGET,
} from '~/app/[lang]/posts/og/[...slug]/route.with'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return withGenerateStaticParams('zh')
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/posts/og/[...slug]'>,
) {
  return withGET('en', _req, ctx)
}
