import { withGET } from '~/app/[lang]/feed.xml/route.with'

export const dynamic = 'force-static'

export async function GET() {
  return withGET('en')
}
