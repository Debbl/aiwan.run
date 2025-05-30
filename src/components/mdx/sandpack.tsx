'use client'
import { Sandpack as SandpackPrimitive } from '@codesandbox/sandpack-react'
import { useTheme } from 'next-themes'
import type { SandpackInternal } from '@codesandbox/sandpack-react'

export const Sandpack: SandpackInternal = (props) => {
  const { theme: _theme } = useTheme()
  const theme = _theme === 'dark' ? 'dark' : 'light'

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
