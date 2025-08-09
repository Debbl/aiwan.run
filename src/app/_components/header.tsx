'use client'
import { useRef } from 'react'
import Link from '~/components/link'
import { useMobile } from '~/hooks/use-mobile'
import ThemeSwitcher from './theme-switcher'

const nav: {
  'url': string
  'zhUrl'?: string
  'name': string
  'zhName'?: string
  'target'?: string
  'data-umami-event': string
  'icon'?: React.ReactNode
}[] = [
  {
    'url': '/posts',
    'zhUrl': '/zh/posts',
    'name': 'Blog',
    'data-umami-event': 'click-blog-link',
  },
  {
    'url': '/tools',
    'name': 'Tools',
    'target': '_blank',
    'data-umami-event': 'click-tools-link',
  },
  {
    'url': '/slides',
    'name': 'Slides',
    'target': '_blank',
    'data-umami-event': 'click-slides-link',
  },
  {
    'url': '/zh',
    'zhUrl': '/',
    'name': 'Switch Language',
    'zhName': '切换语言',
    'data-umami-event': 'click-language-link',
    'icon': <Icon.LuLanguages className='size-5' />,
  },
  {
    'url': '/feed.xml',
    'zhUrl': '/zh/feed.xml',
    'name': 'RSS',
    'target': '_blank',
    'data-umami-event': 'click-rss-link',
    'icon': <Icon.LuRss className='size-5' />,
  },
]

export function Header({ lang = 'en' }: { lang?: 'en' | 'zh' }) {
  const navRef = useRef<HTMLElement>(null)
  const { isMobile } = useMobile()

  return (
    <header>
      <nav
        ref={navRef}
        className={'flex items-center justify-between px-6 py-3'}
      >
        <div>
          <button type='button' aria-label='home'>
            <Link
              href={lang === 'zh' ? '/zh' : '/'}
              className='inline-block size-full px-3'
              aria-label='home page link'
            >
              ~
            </Link>
          </button>
        </div>

        <div className='flex items-center gap-x-3 sm:gap-x-6'>
          {nav
            .filter((n) => !(isMobile && n.name === 'Home'))
            .map((n) => (
              <Link
                data-umami-event={n['data-umami-event']}
                title={n.name}
                key={n.name}
                href={lang === 'zh' ? n.zhUrl || n.url : n.url}
                prefetch={['/posts'].includes(n.url)}
                target={n.target}
              >
                {n.icon || (lang === 'zh' ? n.zhName || n.name : n.name)}

                {n.icon && <span className='sr-only'>{n.name}</span>}
              </Link>
            ))}

          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
