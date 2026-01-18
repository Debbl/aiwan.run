'use client'
import { useLingui } from '@lingui/react/macro'
import { useRef } from 'react'
import { useMobile } from '~/hooks/use-mobile'
import ThemeSwitcher from './theme-switcher'

export function Header() {
  const { t, i18n } = useLingui()
  const nav: {
    'id': string
    'url': string
    'name': string
    'data-umami-event'?: string
    'icon'?: React.ReactNode
    'noLocale'?: boolean
    'target'?: string
  }[] = [
    {
      id: 'blog',
      url: '/posts',
      name: t`Blog`,
    },
    {
      'id': 'ai',
      'url': 'https://ai.aiwan.run',
      'name': t`AI`,
      'noLocale': true,
      'target': '_blank',
      'data-umami-event': 'click-ai-link',
    },
    {
      'id': 'tools',
      'url': 'https://tools.aiwan.run',
      'name': t`Tools`,
      'noLocale': true,
      'target': '_blank',
      'data-umami-event': 'click-tools-link',
    },
    {
      'id': 'slides',
      'url': 'https://slides.aiwan.run',
      'name': t`Slides`,
      'target': '_blank',
      'data-umami-event': 'click-slides-link',
    },
    {
      id: 'language',
      url: i18n.locale === 'zh' ? '/' : '/zh',
      noLocale: true,
      name: t`Switch Language`,
      icon: <Icon.LuLanguages className='size-5' />,
    },
    {
      id: 'rss',
      url: '/feed.xml',
      noLocale: true,
      name: t`RSS`,
      target: '_blank',
      icon: <Icon.LuRss className='size-5' />,
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
                {...(n['data-umami-event']
                  ? { 'data-umami-event': n['data-umami-event'] }
                  : {})}
                title={n.name}
                key={n.id}
                href={n.url}
                noLocale={n.noLocale}
                prefetch={['/posts'].includes(n.url)}
                target={n.target}
              >
                {n.icon ? (
                  <>
                    {n.icon}
                    <span className='sr-only'>{n.name}</span>
                  </>
                ) : (
                  n.name
                )}
              </Link>
            ))}

          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
