'use client'

import { useCallback, useState, useSyncExternalStore } from 'react'

import { CarouselProgress } from '@/components/home/categories/carousel-progress'
import { CategoryCard } from '@/components/home/categories/category-card'
import { SectionHeading } from '@/components/layout/section-heading'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
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

/**
 * The whole categories section lives inside <Carousel> because the design puts
 * the prev/next controls in the heading row, and they must share the carousel
 * context with the slides below. Under `lg` the design drops the controls for
 * a progress bar beneath the cards, which live in the same context.
 */
export function CategoryCarousel({ genres }: { genres: Genre[] }) {
  const [api, setApi] = useState<CarouselApi>()

  // Page count and position are read straight from Embla (an external store)
  // whenever it reports a change.
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {}
      api.on('select', onStoreChange)
      api.on('reInit', onStoreChange)
      return () => {
        api.off('select', onStoreChange)
        api.off('reInit', onStoreChange)
      }
    },
    [api],
  )
  const pages = useSyncExternalStore(
    subscribe,
    () => api?.scrollSnapList().length ?? 0,
    () => 0,
  )
  const currentPage = useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  )

  return (
    <Carousel
      setApi={setApi}
      opts={carouselOptions}
      className='flex flex-col gap-section-mobile lg:gap-section-laptop 2xl:gap-section-desktop'
    >
      <div className='flex flex-col gap-5 md:flex-row md:items-end md:gap-25'>
        <SectionHeading
          className='flex-1'
          title='Explore our wide variety of categories'
          description="Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"
        />
        <div className='hidden items-center gap-3 rounded-lg border border-black-12 bg-black-06 p-2.75 lg:flex 2xl:gap-4 2xl:p-3.75'>
          <CarouselPrevious className='cursor-pointer' />
          <div
            className='flex w-17.25 items-center gap-0.75 2xl:w-20.25'
            role='group'
            aria-label='Carousel pages'
          >
            {Array.from({ length: pages }, (_, page) => (
              <button
                key={page}
                type='button'
                aria-current={page === currentPage ? 'true' : undefined}
                aria-label={`Page ${page + 1} of ${pages}`}
                onClick={() => api?.scrollTo(page)}
                className={cn(
                  'h-1 rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  page === currentPage ? 'w-4.5 bg-primary 2xl:w-5.75' : 'flex-1 bg-black-20',
                )}
              />
            ))}
          </div>
          <CarouselNext className='cursor-pointer' />
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <CarouselContent className='-ml-5 2xl:-ml-7.5'>
          {genres.map((genre) => (
            <CarouselItem key={genre.slug} className='basis-49.5 pl-5 md:basis-65 lg:basis-1/4 xl:basis-1/5 2xl:pl-7.5'>
              <CategoryCard genre={genre} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselProgress className='lg:hidden' />
      </div>
    </Carousel>
  )
}
