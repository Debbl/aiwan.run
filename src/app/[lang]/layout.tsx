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
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <RootLayout lang={lang as Lang}>{children}</RootLayout>
}
