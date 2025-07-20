import type { SVGProps } from 'react'

export function LuLanguages(
  props: SVGProps<SVGSVGElement> & {
    title?: string
  },
) {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
        {...props}
      >
        <path
          fill='none'
          stroke='currentColor'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          d='m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6'
        />
      </svg>
      {props.title && <span className='sr-only'>{props.title}</span>}
    </>
  )
}
