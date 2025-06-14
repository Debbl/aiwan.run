'use client'
import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'
import { cn } from '~/lib/utils'
import type { MouseEventHandler } from 'react'

const ThemeIcon = ({ className }: { className?: string }) => {
  return (
    <>
      <Icon.MoonIcon className={cn(className, 'block dark:hidden')} />
      <Icon.SunIcon className={cn(className, 'hidden dark:block')} />
    </>
  )
}

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme: MouseEventHandler<HTMLButtonElement> = (e) => {
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const isDark = resolvedTheme === 'dark'

    if (!document.startViewTransition) {
      setTheme(isDark ? 'light' : 'dark')
      return
    }

    document
      .startViewTransition(() => {
        // eslint-disable-next-line react-dom/no-flush-sync
        flushSync(() => setTheme(isDark ? 'light' : 'dark'))
      })
      .ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]

        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration: 400,
            easing: 'ease-out',
            iterations: 1,
            direction: isDark ? 'reverse' : 'normal',
            pseudoElement: isDark
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
  }

  return (
    <>
      <button type='button' onClick={toggleTheme}>
        <ThemeIcon className='size-5 cursor-pointer' />
        <span className='sr-only'>theme-switcher</span>
      </button>
    </>
  )
}
