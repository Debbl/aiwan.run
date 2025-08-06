import RootLayout from './root-layout'
import type { Lang } from '~/types'

export {
  generateMetadata,
  generateStaticParams,
} from '~/app/[lang]/root-layout'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Lang }>
}) {
  const { lang } = await params

  return <RootLayout lang={lang}>{children}</RootLayout>
}
