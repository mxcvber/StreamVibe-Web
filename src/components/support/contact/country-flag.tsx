import type { Country } from '@/data/countries'
import { cn } from '@/lib/utils'

/**
 * A country's flag cropped to the box it's given (the trigger's is 36×24,
 * 38×24 and 40×26 across the artboards, not quite 3:2). Decorative: the
 * country's name is always written next to it or in screen-reader text.
 */
export function CountryFlag({ country, className }: { country: Country; className?: string }) {
  const { Flag } = country

  return (
    <span className={cn('block shrink-0 overflow-hidden rounded-[2px]', className)}>
      <Flag aria-hidden='true' preserveAspectRatio='xMidYMid slice' className='block size-full' />
    </span>
  )
}
