'use client'

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'
import { cn } from '~/lib/utils'
import type { ComponentProps } from 'react'

function ScrollArea({ ref, children, className, ...props }: ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root ref={ref} className={cn('relative flex flex-col overflow-hidden', className)} {...props}>
      <ScrollAreaPrimitive.Viewport className='w-full grow rounded-[inherit]'>{children}</ScrollAreaPrimitive.Viewport>
      <ScrollBar className='w-1.5' />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      orientation={orientation}
      className={cn(
        'flex touch-none transition-colors select-none',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className='bg-border relative flex-1 rounded-full' />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
