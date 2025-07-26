import { generateStaticFeed } from './generate-static-feed'

export const dynamic = 'force-static'

export async function GET() {
  return generateStaticFeed()
}
