/* eslint-disable n/prefer-global/process */

export const CWD = process.cwd()
export const isDev = process.env.NODE_ENV === 'development'
export const baseUrl = isDev
  ? process.env.__NEXT_PRIVATE_ORIGIN!
  : 'https://aiwan.run'

export const WEBSITE = {
  title: `Brendan Dash's Blog, a place to share my thoughts and ideas`,
  authors: [{ name: 'Brendan Dash', url: baseUrl }],
  description: `Brendan Dash's personal website, a place to share my thoughts and ideas`,
  domain: baseUrl,
  email: 'me@aiwan.run',
  keywords: ['Brendan Dash', 'Debbl', 'Blog', 'Personal Website', 'TIL'],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Brendan Dash',
    'description':
      "Brendan Dash's personal website, a place to share my thoughts and ideas",
    'url': 'https://aiwan.run',
    'author': {
      '@type': 'Person',
      'name': 'Brendan Dash',
      'url': 'https://aiwan.run',
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
      'name': 'Brendan Dash Blog',
      'description':
        'Personal blog sharing thoughts and ideas about technology, development, and life',
      'url': 'https://aiwan.run',
    },
  },
}
