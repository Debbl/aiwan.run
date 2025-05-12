'use client'
import { useHydrated } from '@debbl/ahooks'
import { useTheme } from 'next-themes'
import { MoonIcon, SettingsGearIcon, SiBluesky, SiGithub, SiX, SunIcon } from '~/components/icons'
import Link from '~/components/link'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/lib/utils'

export function Footer() {
  const { theme, setTheme } = useTheme()

  const { isHydrated } = useHydrated()

  return (
    <footer className='border-border border-t px-8 py-10'>
      <div className='flex items-center justify-between'>
        <div className='flex h-5 items-center space-x-4 text-sm'>
          <Link href='https://github.com/Debbl' target='_blank' rel='noopener noreferrer'>
            <SiGithub className='size-4' />
            <span className='sr-only'>Github</span>
          </Link>
          <Separator orientation='vertical' />
          <Link href='https://x.com/Debbl66' target='_blank' rel='noopener noreferrer'>
            <SiX className='size-4' />
            <span className='sr-only'>X</span>
          </Link>
          <Separator orientation='vertical' />
          <Link href='https://bsky.app/profile/debbl.bsky.social' target='_blank' rel='noopener noreferrer'>
            <SiBluesky className='size-4' />
            <span className='sr-only'>Bluesky</span>
          </Link>
        </div>

        {isHydrated && (
          <div>
            <div className='flex items-center rounded-3xl border p-1'>
              <button
                type='button'
                className={cn('cursor-pointer rounded-full p-2', theme === 'system' && 'bg-secondary')}
                onClick={() => setTheme('system')}
              >
                <SettingsGearIcon className='size-4' />
                <span className='sr-only'>system</span>
              </button>
              <button
                type='button'
                className={cn('cursor-pointer rounded-full p-2', theme === 'light' && 'bg-secondary')}
                onClick={() => setTheme('light')}
              >
                <SunIcon className='size-4' />
                <span className='sr-only'>light</span>
              </button>
              <button
                type='button'
                className={cn('cursor-pointer rounded-full p-2', theme === 'dark' && 'bg-secondary')}
                onClick={() => setTheme('dark')}
              >
                <MoonIcon className='size-4' />
                <span className='sr-only'>dark</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
