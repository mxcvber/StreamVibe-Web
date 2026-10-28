import type { ReactNode } from 'react'

import { CatalogRowHeading } from '@/components/movies/catalog/catalog-row-heading'
import {
  type MovieCardVariant,
  movieCardStyles,
  movieRowCopy,
  movieSlideClassName,
  movieTrackClassName,
} from '@/components/movies/movie-variants'
import { Card } from '@/components/shared/ui/card'
import { Skeleton } from '@/components/shared/ui/skeleton'
import { cn } from '@/lib/utils'

/** Enough placeholders to fill a page at every width (5 from `lg`). */
const PLACEHOLDERS = 5

type MovieRowSkeletonProps = {
  variant: MovieCardVariant
  /** Placeholders for what sits under the poster, at the chips' heights. */
  chips: ReactNode
}

/**
 * Stands in for a movie-card row while the API responds: the real heading
 * over placeholder cards at the carousel's slide widths, so nothing shifts
 * when the cards arrive. Each placeholder is built like the card itself
 * (padding, poster ratio, chips) rather than sized by one aspect ratio,
 * because only the poster scales with the card's width.
 */
export function MovieRowSkeleton({ variant, chips }: MovieRowSkeletonProps) {
  const styles = movieCardStyles[variant]

  return (
    <div className='flex flex-col gap-5 lg:gap-10 2xl:gap-12.5'>
      {/* The loaded heading row is as tall as the controls box beside it
          (68px laptop, 88px desktop), which the skeleton doesn't draw. */}
      <div className='flex items-center lg:min-h-17 2xl:min-h-22'>
        <CatalogRowHeading>{movieRowCopy[variant].title}</CatalogRowHeading>
      </div>
      <div aria-hidden='true' className='flex flex-col gap-6'>
        <div className={cn('flex overflow-hidden', movieTrackClassName[variant])}>
          {Array.from({ length: PLACEHOLDERS }, (_, index) => (
            <div key={index} className={cn('shrink-0 grow-0', movieSlideClassName[variant])}>
              <Card className={styles.card}>
                <Skeleton className={styles.poster} />
                {chips}
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
