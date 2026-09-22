'use client'

import { CarouselProgress } from '@/components/home/categories/carousel-progress'
import { CategoryCard } from '@/components/home/categories/category-card'
import { SectionHeading } from '@/components/layout/section-heading'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Genre } from '@/data/genres'

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
  return (
    <Carousel
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
              <CategoryCard genre={genre} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselProgress className='lg:hidden' />
      </div>
    </Carousel>
  )
}
