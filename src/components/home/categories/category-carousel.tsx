'use client'

import { useCallback, useState, useSyncExternalStore } from 'react'

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

const CARDS_PER_VIEW = 5

/**
 * The whole categories section lives inside <Carousel> because the design puts
 * the prev/next controls in the heading row, and they must share the carousel
 * context with the slides below.
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
      opts={{ align: 'start', slidesToScroll: CARDS_PER_VIEW }}
      className='flex flex-col gap-20'
    >
      <div className='flex items-end gap-25'>
        <SectionHeading
          className='flex-1'
          title='Explore our wide variety of categories'
          description="Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"
        />
        <div className='flex items-center gap-4 rounded-lg border border-black-12 bg-black-06 p-3.75'>
          <CarouselPrevious className='cursor-pointer' />
          <div className='flex w-20.25 items-center gap-0.75' role='group' aria-label='Carousel pages'>
            {Array.from({ length: pages }, (_, page) => (
              <button
                key={page}
                type='button'
                aria-current={page === currentPage ? 'true' : undefined}
                aria-label={`Page ${page + 1} of ${pages}`}
                onClick={() => api?.scrollTo(page)}
                className={cn(
                  'h-1 rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  page === currentPage ? 'w-5.75 bg-primary' : 'flex-1 bg-black-20',
                )}
              />
            ))}
          </div>
          <CarouselNext className='cursor-pointer' />
        </div>
      </div>

      <CarouselContent className='-ml-7.5'>
        {genres.map((genre) => (
          <CarouselItem key={genre.slug} className='basis-1/5 pl-7.5'>
            <CategoryCard genre={genre} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
