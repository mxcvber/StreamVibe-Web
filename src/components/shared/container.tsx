import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto box-content max-w-desktop px-gutter-mobile md:px-10 lg:px-gutter-laptop', className)}
      {...props}
    />
  )
}
