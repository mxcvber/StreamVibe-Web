import { catalogMovieCardStyles as styles, movieGridClassName } from '@/components/movies/browse/browse-variants'
import { cardBox } from '@/components/movies/movie-variants'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

/** Two full rows on desktop (five columns), more on smaller screens. */
const PLACEHOLDERS = 10

/**
 * Stands in for `AllMovies` or `GenreMovies` while the API responds:
 * placeholder cards built like `CatalogMovieCard` (padding, poster ratio,
 * title and stars at their line heights) in the same grid, so nothing shifts
 * when the cards arrive.
 */
export function MovieGridSkeleton() {
  return (
    <div aria-hidden='true' className={movieGridClassName}>
      {Array.from({ length: PLACEHOLDERS }, (_, index) => (
        <Card key={index} className={cardBox}>
          <Skeleton className={styles.poster} />
          <div className='flex flex-col gap-1.5 lg:gap-2'>
            {/* The title's line: 21px, 24px laptop, 27px desktop. */}
            <Skeleton className='h-5.25 w-3/4 rounded-sm lg:h-6 2xl:h-6.75' />
            {/* Five stars: 14px with 1px gaps, 18px with 2px on desktop. */}
            <Skeleton className='h-3.5 w-18.5 rounded-sm 2xl:h-4.5 2xl:w-24.5' />
          </div>
        </Card>
      ))}
    </div>
  )
}
