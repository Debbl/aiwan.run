// index.js
export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)

    if (url.pathname === '/rss') {
      return Response.redirect('https://aiwan.run/feed.xml', 301)
    }

    if (url.pathname === '/feed.xml') {
      return env.ASSETS.fetch(request, {
        headers: {
          'content-type': 'application/xml',
        },
      })
    }

    if (url.pathname === '/tools') {
      return Response.redirect(`https://tools.aiwan.run`, 301)
    }

    if (url.pathname === '/slides') {
      return Response.redirect(`https://slides.aiwan.run`, 301)
    }

    if (url.pathname === '/blog') {
      return Response.redirect(`${url.origin}/posts`, 301)
    }

    if (url.pathname === '/github') {
      return Response.redirect(`https://github.com/Debbl`, 301)
    }

    if (url.pathname === '/gh') {
      return Response.redirect(`https://github.com/Debbl`, 301)
    }

    return env.ASSETS.fetch(request)
  },
}
