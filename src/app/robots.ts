import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next'],
      },
    ],
    sitemap: [
      'https://aiwan.run/sitemap.xml',
      'https://aiwan.run/zh/sitemap.xml',
    ],
  }
}
