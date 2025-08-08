import RootLayout from '../[lang]/root-layout'

export { generateMetadata } from '../[lang]/root-layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout lang='en'>{children}</RootLayout>
}
