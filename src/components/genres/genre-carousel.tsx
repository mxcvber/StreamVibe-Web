'use client'

import type { ComponentProps, ReactNode } from 'react'

import { GenreCard } from '@/components/genres/genre-card'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CarouselProgress } from '@/components/ui/carousel-progress'
import type { Genre } from '@/data/genres'
import { cn } from '@/lib/utils'

/**
 * Cards per page follow the slide widths in the markup below: fixed-width
 * cards that scroll one at a time under `lg` (the basis includes the 20px
 * slide gutter, so 198px is the mobile artboard's 178px card), a quarter of
 * the row from `lg` and the artboards' five from `xl`. Embla re-initialises
 * itself when a breakpoint query flips.
 */
const carouselOptions = {
  align: 'start',
  slidesToScroll: 1,
  breakpoints: {
    '(min-width: 64rem)': { slidesToScroll: 4 },
    '(min-width: 80rem)': { slidesToScroll: 5 },
  },
} as const

type GenreCarouselProps = Omit<ComponentProps<'div'>, 'children'> & {
  genres: Genre[]
  /**
   * Sits left of the prev/next controls as a flex item of the heading row, so
   * it should carry `flex-1`. The row aligns its items to the end (a heading
   * with a description bottom-aligns with the controls); a title-only heading
   * can opt into centring with `lg:self-center`, where the controls appear.
   */
  heading: ReactNode
}

/**
 * The genre cards used by the home page's categories section and the Movies
 * page's "Our Genres" row. The whole block lives inside <Carousel> because the
 * designs put the prev/next controls in the heading row, and they must share
 * the carousel context with the slides below. Under `lg` the designs drop the
 * controls for a progress bar beneath the cards, which live in the same
 * context. The heading → cards gap differs per page, so callers override it
 * through `className`.
 */
export function GenreCarousel({ genres, heading, className, ...props }: GenreCarouselProps) {
  return (
    <Carousel
      opts={carouselOptions}
      className={cn('flex flex-col gap-section-mobile lg:gap-section-laptop 2xl:gap-section-desktop', className)}
      {...props}
    >
      <div className='flex flex-col gap-5 md:flex-row md:items-end md:gap-25'>
        {heading}
        <div className='hidden items-center gap-3 rounded-lg border border-black-12 bg-black-06 p-2.75 lg:flex 2xl:gap-4 2xl:p-3.75'>
          <CarouselPrevious />
          <CarouselDots
            className='w-17.25 2xl:w-20.25'
            activeClassName='w-4.5 2xl:w-5.75'
            label={(page, pages) => `Page ${page + 1} of ${pages}`}
            aria-label='Carousel pages'
          />
          <CarouselNext />
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <CarouselContent className='-ml-5 2xl:-ml-7.5'>
          {genres.map((genre) => (
            <CarouselItem key={genre.slug} className='basis-49.5 pl-5 md:basis-65 lg:basis-1/4 xl:basis-1/5 2xl:pl-7.5'>
              <GenreCard genre={genre} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselProgress className='lg:hidden' />
      </div>
    </Carousel>
  )
}
