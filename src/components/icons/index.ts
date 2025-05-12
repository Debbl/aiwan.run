import type { SVGProps } from 'react'

export * as Icon from './exports'

export interface IconBaseProps extends SVGProps<SVGSVGElement> {}

export type IconType = (props: IconBaseProps) => React.ReactNode
