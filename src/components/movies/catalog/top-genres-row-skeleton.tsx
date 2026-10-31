import { CatalogRowHeading } from '@/components/movies/catalog/catalog-row-heading'
import { Card } from '@/components/shared/ui/card'
import { Skeleton } from '@/components/shared/ui/skeleton'

/** Enough placeholders to fill a page at every width (4 from `lg`). */
const PLACEHOLDERS = 4

/**
 * Stands in for `TopGenresRow` while the API responds: the real heading over
 * placeholder cards at the carousel's slide widths, so nothing shifts when the
 * cards arrive.
 *
 * Each placeholder is built like `GenreCard`'s "Top 10 In" card rather than
 * sized by one aspect ratio: only the mosaic scales with the card's width,
 * while the padding, border and footer stay fixed, so a single ratio would
 * only match at the artboard widths.
 */
export function TopGenresRowSkeleton() {
  return (
    <div className='flex flex-col gap-5 lg:gap-10 2xl:gap-12.5'>
      {/* The loaded heading row is as tall as the controls box beside it
          (68px laptop, 88px desktop), which the skeleton doesn't draw. */}
      <div className='flex items-center lg:min-h-17 2xl:min-h-22'>
        <CatalogRowHeading>Popular Top 10 In Genres</CatalogRowHeading>
      </div>
      <div aria-hidden='true' className='flex flex-col gap-6'>
        <div className='-ml-5 flex overflow-hidden 2xl:-ml-7.5'>
          {Array.from({ length: PLACEHOLDERS }, (_, index) => (
            <div key={index} className='shrink-0 grow-0 pl-5 2xl:pl-7.5 basis-63 md:basis-80 lg:basis-1/4'>
              <Card className='p-4.75 lg:p-7.25'>
                <Skeleton className='rounded-lg aspect-191.75/177 lg:aspect-225/206 2xl:aspect-292/252' />
                {/* Footer heights follow GenreCard: the 25/32px badge, a
                    2/4px gap and the title's 24/30px line. */}
                <div className='flex flex-col items-start gap-0.5 2xl:gap-1'>
                  <Skeleton className='h-6.25 w-18 rounded-lg 2xl:h-8 2xl:w-23' />
                  <div className='flex h-6 w-full items-center 2xl:h-7.5'>
                    <Skeleton className='h-4 w-2/3 2xl:h-5' />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        {/* Room for the 5px progress bar the loaded row shows under `lg`. */}
        <div className='h-1.25 lg:hidden' />
      </div>
    </div>
  )
}
