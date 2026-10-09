import { MovieRowSkeleton } from '@/components/movies/catalog/movie-row-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

/** Stands in for `MustWatchRow` while the API responds. */
export function MustWatchRowSkeleton() {
  return (
    <MovieRowSkeleton
      variant='must-watch'
      chips={
        // The runtime chip (32px tall, 36px on desktop) and the rating chip
        // (30px, 33px on desktop).
        <div className='flex items-center justify-between gap-0.5'>
          <Skeleton className='h-8 w-22 rounded-full 2xl:h-9 2xl:w-27' />
          <Skeleton className='h-7.5 w-29 rounded-full lg:w-30 2xl:h-8.25 2xl:w-37' />
        </div>
      }
    />
  )
}
