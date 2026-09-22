import Image from 'next/image'

import { HeroActions } from '@/components/movies/hero/hero-actions'
import type { Movie } from '@/data/movies'

type HeroSlideProps = {
  movie: Movie
  /** Eagerly load the backdrop (only for the first slide, the page's LCP). */
  priority?: boolean
}

/**
 * One featured movie filling the poster frame. Heights are the artboards'
 * 468 / 709 / 835px frames; padding is their 24 / 40 / 50px inset, and the
 * bottom edge additionally reserves the controls row that `HeroCarousel`
 * overlays: 16 + 48 + 40 = 104px on laptop, 20 + 56 + 50 = 126px on desktop
 * (16px on mobile, which has no controls).
 */
export function HeroSlide({ movie, priority = false }: HeroSlideProps) {
  return (
    <div className='relative flex h-117 flex-col items-center justify-end px-6 pt-6 pb-4 lg:h-177.25 lg:px-10 lg:pt-10 lg:pb-26 2xl:h-208.75 2xl:px-12.5 2xl:pt-12.5 2xl:pb-31.5'>
      {/* The frame spans the page container: 100vw minus the 16 / 40 / 80px
          gutters, capped at the 1596px desktop content width. */}
      <Image
        src={movie.backdropSrc}
        alt=''
        fill
        priority={priority}
        sizes='(min-width: 1756px) 1596px, (min-width: 1024px) calc(100vw - 160px), (min-width: 768px) calc(100vw - 80px), calc(100vw - 32px)'
        className='object-cover'
      />
      <div aria-hidden='true' className='absolute inset-0 bg-linear-to-t from-background to-background/0' />

      {/* Copy width is the artboards' text box (960 / 1194px) as a max-width
          rather than Figma's 120 / 150px side padding, so it degrades better
          between 1024 and 1440. */}
      <div className='relative flex w-full flex-col items-center gap-5 lg:gap-6 2xl:gap-7.5'>
        <div className='flex flex-col items-center gap-0.5 text-center lg:max-w-240 2xl:max-w-298.5 2xl:gap-1'>
          <h2 className='text-24 font-bold lg:text-30 2xl:text-38'>{movie.title}</h2>
          {/* The mobile artboard drops the description; from `lg` it is pinned
              to the design's two lines (`line-clamp` also sets `display`, which
              is what reveals it). */}
          <p className='hidden text-16 font-medium text-muted-foreground lg:line-clamp-2 2xl:text-18'>
            {movie.overview}
          </p>
        </div>
        <HeroActions slug={movie.slug} />
      </div>
    </div>
  )
}
