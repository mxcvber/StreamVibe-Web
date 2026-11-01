import type { ComponentType, SVGProps } from 'react'

export type Device = {
  name: string
  description: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}
