import { generateStaticFeed } from '~/app/[lang]/feed.xml/generate-static-feed'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{ lang: 'zh' }]
}

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ lang: 'en' | 'zh' }>
  },
) {
  const { lang } = await params

  return generateStaticFeed(lang as 'en' | 'zh')
}
