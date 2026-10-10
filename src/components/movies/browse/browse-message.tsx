import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type BrowseMessageProps = {
  children: ReactNode
  className?: string
}

/**
 * A short grey note on the "All Movies" page: why the grid is empty, or that
 * the next page failed to load. Sized like `CatalogRowMessage`'s text.
 */
export function BrowseMessage({ children, className }: BrowseMessageProps) {
  return <p className={cn('text-14 text-grey-60 lg:text-16 2xl:text-18', className)}>{children}</p>
}
