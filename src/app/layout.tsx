import { ViewTransitions } from 'next-view-transitions'
import Header from '~/app/_components/Header'
import { WEBSITE } from '~/constants'
import Providers from '~/providers'
import Footer from './_components/Footer'
import '~/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE.domain),
  title: WEBSITE.title,
  authors: WEBSITE.authors,
  description: WEBSITE.description,
  appleWebApp: {
    title: WEBSITE.title,
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/favicon-96x96.png',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon.svg',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
    },
    {
      rel: 'app-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
  twitter: {
    creator: 'Debbl66',
  },
  openGraph: {
    url: WEBSITE.domain,
    title: WEBSITE.title,
    description: WEBSITE.description,
    emails: [WEBSITE.email],
    type: 'website',
    images: [
      {
        alt: 'og-image',
        url: '/opengraph-image.png',
        width: 800,
        height: 400,
      },
    ],
  },
  alternates: {
    canonical: 'https://aiwan.run/',
    types: {
      'application/rss+xml': [
        {
          title: "Brendan Dash's RSS Feed",
          url: '/feed.xml',
        },
      ],
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
