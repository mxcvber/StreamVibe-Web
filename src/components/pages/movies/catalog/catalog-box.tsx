import Link from 'next/link'
import type { ReactNode } from 'react'

import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { cn } from '@/lib/utils'

type CatalogBoxProps = {
  label: string
  /** Turns the label pill into a link, e.g. to the full catalog. */
  href?: string
  children: ReactNode
}

const pillClassName =
  'rounded-[6px] bg-primary px-5 py-2 text-16 font-semibold 2xl:rounded-sm 2xl:px-6 2xl:py-2.5 2xl:text-20'

/**
 * The bordered frame the laptop and desktop artboards draw around the Movies
 * page's rows, with a red label pill straddling its top edge (overlapping the
 * box by 22px on laptop, 30px on desktop). The mobile artboard has no frame —
 * a Movies/Shows tab bar sits there instead, which is not built yet — so under
 * `lg` this is just the vertical stack of rows.
 *
 * With `href` the pill is a link with a trailing arrow, and it shows under
 * `lg` too, above the rows: until the tab bar exists it is the only way to
 * reach the link on phones.
 */
export function CatalogBox({ label, href, children }: CatalogBoxProps) {
  return (
    <div className='flex flex-col'>
      <div
        className={cn(
          'relative z-10 lg:-mb-5.5 lg:flex lg:px-10 2xl:-mb-7.5 2xl:px-12.5',
          href ? 'mb-5 flex' : 'hidden',
        )}
      >
        {href ? (
          <Link
            href={href}
            className={cn(
              pillClassName,
              'flex items-center gap-1 transition-colors outline-none hover:bg-red-50 focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-5 2xl:[&_svg]:size-6',
            )}
          >
            {label}
            <ArrowRightIcon />
          </Link>
        ) : (
          <p className={pillClassName}>{label}</p>
        )}
      </div>
      <div className='flex flex-col gap-12.5 lg:gap-20 lg:rounded-lg lg:border lg:border-black-15 lg:p-10 2xl:gap-25 2xl:p-12.5'>
        {children}
      </div>
    </div>
  )
}
