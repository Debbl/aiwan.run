export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)

    if (url.pathname === '/rss') {
      return Response.redirect(`${url.origin}/feed.xml`, 301)
    }

    if (url.pathname === '/zh/rss') {
      return Response.redirect(`${url.origin}/zh/feed.xml`, 301)
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
