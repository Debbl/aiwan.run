import { getServerWebsiteConstants } from '~/constants/index.server'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { name, description } = await getServerWebsiteConstants('en')

  return {
    name,
    short_name: name,
    description,
    start_url: '/',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
