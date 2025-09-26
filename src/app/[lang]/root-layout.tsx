import { msg } from '@lingui/core/macro'
import { Footer } from '~/app/_components/footer'
import { Header } from '~/app/_components/header'
import { WEBSITE } from '~/constants'
import { getServerWebsiteConstants } from '~/constants/index.server'
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
  const { title, description, keywords } = await getServerWebsiteConstants(lang)

  return {
    metadataBase: new URL(WEBSITE.domain),
    title,
    authors: WEBSITE.authors,
    creator: WEBSITE.authors[0].name,
    publisher: WEBSITE.authors[0].name,
    keywords,
    description,
    category: 'technology',
    appleWebApp: {
      title,
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
      title,
      description,
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
      canonical: `${WEBSITE.domain}${lang === 'en' ? '' : `/${lang}`}`,
      languages: {
        zh: '/zh',
        en: '/',
      },
      types: {
        'application/rss+xml': [
          {
            title: "Brendan Dash's RSS Feed",
            url: '/feed.xml',
          },
          {
            title: "Brendan Dash's RSS Feed (Chinese)",
            url: '/zh/feed.xml',
          },
        ],
      },
    },
  }
}

export default async function RootLayout({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: Lang
}) {
  const { i18n, description, baseUrl } = await getServerWebsiteConstants(lang)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Brendan Dash',
    'description': description,
    'url': baseUrl,
    'author': {
      '@type': 'Person',
      'name': 'Brendan Dash',
      'url': baseUrl,
      'email': 'me@aiwan.run',
      'sameAs': ['https://github.com/Debbl', 'https://x.com/Debbl66'],
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Brendan Dash',
      'url': 'https://aiwan.run',
    },
    'inLanguage': 'en',
    'isAccessibleForFree': true,
    'datePublished': '2024-01-01',
    'dateModified': new Date().toISOString().split('T')[0],
    'mainEntity': {
      '@type': 'WebSite',
      'name': i18n.t(msg`Brendan Dash's Blog`),
      'description': description,
      'url': baseUrl,
    },
  }

  return (
    <html lang={lang} className='h-full' suppressHydrationWarning>
      <head>
        <script
          async
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id='6ed314b0-fc17-4333-870a-d9e5af82626e'
          data-auto-track='false'
          data-domains='aiwan.run'
        />
        <script
          type='application/ld+json'
          // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>
        <Providers lang={lang}>
          <div className='relative min-h-screen'>
            <Header />
            {children}
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
