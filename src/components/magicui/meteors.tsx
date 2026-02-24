'use client'

import { useHydrated } from '@debbl/ahooks'
import * as React from 'react'
import { useMemo } from 'react'
import { cn } from '~/lib/utils'

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const { isHydrated } = useHydrated()

  const meteorStyles = useMemo(() => {
    if (!isHydrated) return []

    const styles = Array.from({ length: number }).map(() => ({
      '--angle': `${angle}deg`,
      'top': -5,
      'left': `calc(-50% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      'animationDelay': `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
      'animationDuration': `${Math.floor(Math.random() * (maxDuration - minDuration) + minDuration)}s`,
    }))

    return styles
  }, [isHydrated, number, angle, maxDelay, minDelay, maxDuration, minDuration])

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          style={{ ...style }}
          className={cn(
            'animate-meteor pointer-events-none absolute size-0.5 rotate-[var(--angle)] rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]',
            className,
          )}
        >
          {/* Meteor Tail */}
          <div className='pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent' />
        </span>
      ))}
    </>
  )
}
