import type { ReactNode } from 'react'

type CatalogBoxProps = {
  label: string
  children: ReactNode
}

/**
 * The bordered frame the laptop and desktop artboards draw around the Movies
 * page's rows, with a red label pill straddling its top edge (overlapping the
 * box by 22px on laptop, 30px on desktop). The mobile artboard has no frame —
 * a Movies/Shows tab bar sits there instead, which is not built yet — so under
 * `lg` this is just the vertical stack of rows.
 */
export function CatalogBox({ label, children }: CatalogBoxProps) {
  return (
    <div className='flex flex-col'>
      <div className='relative z-10 hidden px-10 lg:-mb-5.5 lg:flex 2xl:-mb-7.5 2xl:px-12.5'>
        <p className='rounded-[6px] bg-primary px-5 py-2 text-16 font-semibold 2xl:rounded-sm 2xl:px-6 2xl:py-2.5 2xl:text-20'>
          {label}
        </p>
      </div>
      <div className='flex flex-col gap-12.5 lg:gap-20 lg:rounded-lg lg:border lg:border-black-15 lg:p-10 2xl:gap-25 2xl:p-12.5'>
        {children}
      </div>
    </div>
  )
}
