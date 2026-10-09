import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * The title-only heading of a Movies page row. It centres against the
 * carousel controls from `lg`, where they appear, and sits closer to the cards
 * (20/40/50px) than a home section heading does.
 */
export function CatalogRowHeading({ className, ...props }: ComponentProps<'h2'>) {
  return <h2 className={cn('flex-1 text-24 font-bold lg:self-center lg:text-30 2xl:text-38', className)} {...props} />
}
