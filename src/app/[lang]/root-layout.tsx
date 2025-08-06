import { Footer } from '~/app/_components/footer'
import { Header } from '~/app/_components/header'
import { WEBSITE } from '~/constants'
import Providers from '~/providers'
import type { Metadata } from 'next'
import type { Lang } from '~/types'

export function generateStaticParams() {
  return [{ lang: 'zh' }]
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: Lang }>
}): Promise<Metadata> => {
  const { lang = 'en' } = await params

  return {
    alternates: {
      canonical: `${WEBSITE.domain}${lang === 'en' ? '' : `/${lang}`}`,
      languages: {
        zh: '/zh',
        en: '/',
      },
    },
  }
}

export default function RootLayout({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: Lang
}) {
  return (
    <html lang={lang} className='h-full' suppressHydrationWarning>
      <head>
        <script
          async
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id='6ed314b0-fc17-4333-870a-d9e5af82626e'
          data-domains='aiwan.run'
        />
        <script
          type='application/ld+json'
          // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE.structuredData),
          }}
        />
      </head>
      <body>
        <Providers lang={lang}>
          <div className='relative min-h-screen'>
            <Header lang={lang} />
            {children}
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
