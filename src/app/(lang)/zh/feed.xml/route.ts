import { generateStaticFeed } from '~/app/(main)/feed.xml/route'

export const dynamic = 'force-static'

export async function GET() {
  return generateStaticFeed('zh')
}
