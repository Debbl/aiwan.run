'use client'
import { Link as I18nLink } from 'best-i18n/next/navigation'
import NextLink from 'next/link'
import type { ComponentProps } from 'react'

export function Link(
  props: Omit<ComponentProps<typeof NextLink>, 'locale'> & {
    noLocale?: boolean
    /** Link into a specific locale, e.g. for a language switcher. */
    locale?: string
  },
) {
  const { noLocale, href, ...rest } = props

  // I18nLink localizes string hrefs against the current locale (and leaves
  // external URLs alone); `noLocale` opts a link out of that entirely.
  if (noLocale || typeof href !== 'string') {
    return <NextLink {...rest} href={href} />
  }

  return <I18nLink {...rest} href={href} />
}
