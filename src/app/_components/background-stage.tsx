'use client'
import Snowfall from 'react-snowfall'
import { Meteors } from '~/components/magicui/meteors'
import { cn } from '~/lib/utils'

export default function BackgroundStage() {
  const className = 'pointer-events-none fixed inset-0 z-0 size-full overflow-hidden'

  return (
    <>
      <div className={cn(className, 'opacity-100 dark:opacity-0')}>
        <Meteors number={30} />
      </div>
      <div className={cn(className, 'opacity-0 dark:opacity-100')}>
        <Snowfall />
      </div>
    </>
  )
}
