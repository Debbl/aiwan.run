'use client'
import { Sandpack as SandpackPrimitive } from '@codesandbox/sandpack-react'
import { useTheme } from 'next-themes'
import type { SandpackInternal } from '@codesandbox/sandpack-react'

export interface SandpackChildrenProps {
  filename?: string
  children: { props: { children: string } }
}

export const Sandpack: SandpackInternal = (props) => {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light'

  return (
    <div className='m-4'>
      <SandpackPrimitive
        theme={theme}
        options={{
          showConsoleButton: true,
        }}
        {...props}
      />
    </div>
  )
}
