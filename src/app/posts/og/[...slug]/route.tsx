import { ImageResponse } from 'next/og'
import { WEBSITE } from '~/constants'
import { posts, source } from '~/lib/source'

export async function generateStaticParams() {
  return posts.map((post) => {
    const slugs = post.slugs
    return { slug: [...slugs.slice(0, -1), `${slugs.at(-1)}.png`] }
  })
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params

  const slugs = slug.map((s) => s.replace('.png', ''))

  const post = source.getPage(slugs)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            borderRadius: 50,
            width: 100,
            height: 100,
            overflow: 'hidden',
          }}
        >
          <svg viewBox='0 0 36 36' fill='none' role='img' xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
            <mask id='mask__beam' maskUnits='userSpaceOnUse' x='0' y='0' width='36' height='36'>
              <rect width='36' height='36' fill='#FFFFFF'></rect>
            </mask>
            <g mask='url(#mask__beam)'>
              <rect width='36' height='36' fill='#f2e0a0'></rect>
              <rect
                x='0'
                y='0'
                width='36'
                height='36'
                transform='translate(-4 8) rotate(168 18 18) scale(1)'
                fill='#8cb0b0'
                rx='36'
              ></rect>
              <g transform='translate(0 4) rotate(-8 18 18)'>
                <path d='M13,19 a1,0.75 0 0,0 10,0' fill='#000000'></path>
                <rect x='11' y='14' width='1.5' height='2' rx='1' stroke='none' fill='#000000'></rect>
                <rect x='23' y='14' width='1.5' height='2' rx='1' stroke='none' fill='#000000'></rect>
              </g>
            </g>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 12 }}>
          <div style={{ fontSize: 24 }}>{WEBSITE.title}</div>
          <div style={{ fontWeight: 500, fontSize: 32 }}>{post?.data.title}</div>
        </div>
      </div>
    ),
  )
}
