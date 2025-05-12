'use client'
import { useState } from 'react'
import { Icon } from '~/components/icons'
import { cn } from '~/lib/utils'
import type { IconBaseProps } from '../icons/exports'

const CopyButtonIcon = ({ isCopied, ...props }: { isCopied: boolean } & IconBaseProps) => {
  if (isCopied) {
    return <Icon.CheckIcon {...props} />
  }

  return <Icon.CopyIcon {...props} />
}

export default function CopyButton({ lang, code, className }: { lang: string; code: string; className: string }) {
  const [isCopied, setIsCopied] = useState(false)
  const handleCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(code)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <m.button
      type='button'
      aria-label='Copy code'
      data-value={code}
      data-lang={lang}
      className={className}
      onClick={handleCopy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <CopyButtonIcon isCopied={isCopied} className={cn('size-3', isCopied && 'text-green-500')} />
      <span className='sr-only'>Copy</span>
    </m.button>
  )
}
