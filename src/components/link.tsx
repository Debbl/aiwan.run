'use client'
import { useLingui } from '@lingui/react'
import NextLink from 'next/link'
import { linguiConfig } from '~/i18n/config'
import type { ComponentProps } from 'react'

export function Link(
  props: ComponentProps<typeof NextLink> & { noLocale?: boolean },
) {
  const { noLocale, ...rest } = props

  const { i18n } = useLingui()
  const locale = i18n.locale
  let href = props.href

  if (typeof href === 'string' && !noLocale) {
    if (
      href.startsWith('/') &&
      !linguiConfig.locales.includes(href.split('/')[1])
    ) {
      href =
        locale === linguiConfig.sourceLocale
          ? props.href
          : `/${locale}${props.href}`
    }
  }

  return <NextLink {...rest} href={href} />
}
