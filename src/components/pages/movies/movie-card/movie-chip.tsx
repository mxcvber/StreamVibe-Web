import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type MovieChipProps = {
  /** A 24×24 Figma icon; the chip sizes it to 20px below desktop. */
  icon: ReactNode
  /** Read after the visible text, e.g. "Runtime" or "Views". */
  srLabel: string
  children: ReactNode
  className?: string
}

/**
 * A movie card's grey pill: an icon and a short value ("1h 30min", "2K").
 * 28px tall with 12px text up to laptop, 36px with 16px text on desktop. The
 * right padding is wider than the left because the icon has its own inset.
 * Padding is the design's 4/8px (6/10px desktop) less the 1px border, which
 * Figma draws inside the box. The minimum height keeps it 28/36px when the
 * card hides the icon, which otherwise sets the height. It never wraps: the
 * card compacts its chips instead when they don't fit (see
 * `trendingChipCompact`).
 */
export function MovieChip({ icon, srLabel, children, className }: MovieChipProps) {
  return (
    <p
      className={cn(
        'flex min-h-7 items-center gap-0.5 rounded-full border border-black-15 bg-black-08 py-0.75 pr-1.75 pl-0.75 text-12 font-medium whitespace-nowrap text-grey-60 2xl:min-h-9 2xl:py-1.25 2xl:pr-2.25 2xl:pl-1.25 2xl:text-16 [&_svg]:size-5 [&_svg]:shrink-0 2xl:[&_svg]:size-6',
        className,
      )}
    >
      {icon}
      <span className='sr-only'>{srLabel}: </span>
      {children}
    </p>
  )
}
