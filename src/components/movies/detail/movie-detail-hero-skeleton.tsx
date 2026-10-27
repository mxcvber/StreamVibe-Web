import { MovieHeroFrame } from '@/components/movies/detail/movie-hero-frame'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Stands in for `MovieDetailHero` while the API responds: the same frame, a
 * placeholder backdrop under the same fade, and bars where the title, the
 * overview (from `lg`) and the two buttons will sit, at their line and button
 * heights (title 36 / 45 / 57px, Play Now 52 / 52 / 56px).
 */
export function MovieDetailHeroSkeleton() {
  return (
    <MovieHeroFrame>
      <Skeleton className='absolute inset-0 rounded-none' />
      <div aria-hidden='true' className='absolute inset-0 bg-linear-to-t from-background to-background/0' />

      <div aria-hidden='true' className='relative flex w-full flex-col items-center gap-5 lg:gap-6 2xl:gap-7.5'>
        <div className='flex w-full flex-col items-center gap-0.5 lg:max-w-250 2xl:max-w-298.5 2xl:gap-1'>
          <Skeleton className='h-9 w-48 lg:h-11.25 lg:w-72 2xl:h-14.25 2xl:w-96' />
          <Skeleton className='hidden h-12 w-full lg:block 2xl:h-13.5' />
        </div>
        <div className='flex w-full items-center gap-5 md:w-auto'>
          <Skeleton className='h-13 flex-1 md:w-32 md:flex-none 2xl:h-14 2xl:w-39.25' />
          <Skeleton className='size-12 2xl:size-14' />
        </div>
      </div>
    </MovieHeroFrame>
  )
}
