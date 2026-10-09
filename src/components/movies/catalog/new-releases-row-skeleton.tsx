import { MovieRowSkeleton } from '@/components/movies/catalog/movie-row-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

/** Stands in for `NewReleasesRow` while the API responds. */
export function NewReleasesRowSkeleton() {
  return (
    <MovieRowSkeleton
      variant='new-releases'
      // The release-date pill: 30px tall and centered, 36px and full width on
      // desktop (the card stretches it).
      chips={<Skeleton className='h-7.5 w-36 rounded-full 2xl:h-9 2xl:w-auto' />}
    />
  )
}
