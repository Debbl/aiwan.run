'use client'
import { useLingui } from '@lingui/react/macro'
import { useRef } from 'react'
import { useMobile } from '~/hooks/use-mobile'
import ThemeSwitcher from './theme-switcher'

export function Header() {
  const { t, i18n } = useLingui()
  const nav: {
    'url': string
    'name': string
    'data-umami-event': string
    'icon'?: React.ReactNode
    'noLocale'?: boolean
    'target'?: string
  }[] = [
    {
      'url': '/posts',
      'name': t`Blog`,
      'data-umami-event': 'click-blog-link',
    },
    {
      'url': 'https://ai.aiwan.run',
      'name': t`AI`,
      'noLocale': true,
      'target': '_blank',
      'data-umami-event': 'click-ai-link',
    },
    {
      'url': 'https://tools.aiwan.run',
      'name': t`Tools`,
      'noLocale': true,
      'target': '_blank',
      'data-umami-event': 'click-tools-link',
    },
    {
      'url': 'https://slides.aiwan.run',
      'name': t`Slides`,
      'target': '_blank',
      'data-umami-event': 'click-slides-link',
    },
    {
      'url': i18n.locale === 'zh' ? '/' : '/zh',
      'noLocale': true,
      'name': t`Switch Language`,
      'data-umami-event': 'click-language-link',
      'icon': <Icon.LuLanguages className='size-5' />,
    },
    {
      'url': '/feed.xml',
      'noLocale': true,
      'name': t`RSS`,
      'target': '_blank',
      'data-umami-event': 'click-rss-link',
      'icon': <Icon.LuRss className='size-5' />,
    },
  ]
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
              href='/'
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
                href={n.url}
                noLocale={n.noLocale}
                prefetch={['/posts'].includes(n.url)}
                target={n.target}
              >
                {n.icon || n.name}

                {n.icon && <span className='sr-only'>{n.name}</span>}
              </Link>
            ))}

          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
