import type { SVGProps } from 'react'

export function LuMonitorCog(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      >
        <path d='M12 17v4m3.2-16.1l-.9-.4m.9 2.6l-.9.4m2.6-4.3l-.4-.9m.4 6.5l-.4.9m3-7.4l-.4.9m.4 6.5l-.4-.9m2.6-4.3l-.9.4m.9 2.6l-.9-.4M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7M8 21h8'></path>
        <circle cx='18' cy='6' r='3'></circle>
      </g>
    </svg>
  )
}
