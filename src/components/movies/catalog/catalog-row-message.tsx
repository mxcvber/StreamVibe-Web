import type { ReactNode } from 'react'

import { CatalogRowHeading } from '@/components/movies/catalog/catalog-row-heading'

type CatalogRowMessageProps = {
  title: string
  children: ReactNode
}

/**
 * A Movies page row that has no cards to show (the request failed, or nothing
 * came back): its heading over a short inline message, so the rest of the page
 * still reads normally.
 */
export function CatalogRowMessage({ title, children }: CatalogRowMessageProps) {
  return (
    <div className='flex flex-col gap-5 lg:gap-10 2xl:gap-12.5'>
      <CatalogRowHeading>{title}</CatalogRowHeading>
      <p className='text-14 text-grey-60 lg:text-16 2xl:text-18'>{children}</p>
    </div>
  )
}
