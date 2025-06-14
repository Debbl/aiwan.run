'use client'
import NextImage from 'next/image'
import Zoom from 'react-medium-image-zoom'
import type { StaticRequire } from 'next/dist/shared/lib/get-img-props'
import type { ImageProps as NextImageProps } from 'next/image'

export function Image(props: NextImageProps) {
  const { src: _src, alt } = props

  const isString = (value: any): value is string => typeof value === 'string'

  const isStaticRequire = (value: any): value is StaticRequire =>
    typeof value === 'object' && 'default' in value

  const src = isString(_src)
    ? _src
    : isStaticRequire(_src)
      ? _src.default.src
      : _src.src

  return (
    <picture className='flex justify-center px-12'>
      <Zoom
        zoomMargin={40}
        zoomImg={{
          src,
          alt,
        }}
        ZoomContent={(data) => <>{data.img}</>}
        wrapElement='span'
      >
        <NextImage
          className='mx-auto max-h-[300px] max-w-[60%] object-contain'
          priority
          {...props}
        />
      </Zoom>
    </picture>
  )
}
