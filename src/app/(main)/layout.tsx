import { ViewTransitions } from 'next-view-transitions'
import { Footer } from '~/app/_components/footer'
import { Header } from '~/app/_components/header'
import Providers from '~/providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <html lang='en' className='h-full' suppressHydrationWarning>
        <head>
          <script
            async
            defer
            src='https://cloud.umami.is/script.js'
            data-website-id='6ed314b0-fc17-4333-870a-d9e5af82626e'
            data-domains='aiwan.run'
          />
        </head>
        <body>
          <Providers>
            <div className='relative min-h-screen'>
              <Header />
              {children}
            </div>

            <Footer />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  )
}
