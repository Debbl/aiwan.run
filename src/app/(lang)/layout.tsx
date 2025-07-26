import { ViewTransitions } from 'next-view-transitions'
import { Footer } from '~/app/_components/footer'
import { Header } from '~/app/_components/header'
import { WEBSITE } from '~/constants'
import Providers from '~/providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: `${WEBSITE.domain}/zh`,
    languages: {
      zh: '/zh',
      en: '/',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <html lang='zh' className='h-full' suppressHydrationWarning>
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
          <Providers>
            <div className='relative min-h-screen'>
              <Header lang='zh' />
              {children}
            </div>

            <Footer />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  )
}
