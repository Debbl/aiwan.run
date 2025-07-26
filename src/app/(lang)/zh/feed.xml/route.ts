import { generateStaticFeed } from '~/app/(main)/feed.xml/generate-static-feed'

export const dynamic = 'force-static'

export async function GET() {
  return generateStaticFeed('zh')
}
