'use client'

import type { ComponentProps, ReactNode } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shared/ui/carousel'
import { CarouselProgress } from '@/components/shared/ui/carousel-progress'
import { cn } from '@/lib/utils'

type RowCarouselProps = Omit<ComponentProps<'div'>, 'children'> & {
  opts: ComponentProps<typeof Carousel>['opts']
  /**
   * Sits left of the prev/next controls as a flex item of the heading row, so
   * it should carry `flex-1`. The row aligns its items to the end (a heading
   * with a description bottom-aligns with the controls); a title-only heading
   * can opt into centring with `lg:self-center`, where the controls appear.
   */
  heading: ReactNode
  /** The slides: `CarouselItem`s whose left padding is the slide gutter. */
  children: ReactNode
  /** The track's negative left margin, cancelling the slides' gutter. */
  contentClassName?: string
}

/**
 * The shell shared by the carousel rows (genre cards, movie cards): a heading
 * row with the prev/dots/next controls, the slides, and under `lg` a progress
 * bar in place of the controls. The whole block lives inside <Carousel>
 * because the designs put the controls in the heading row, and they must share
 * the carousel context with the slides below. The heading → cards gap differs
 * per page, so callers override it through `className`.
 *
 * Slides arrive as children, so the cards inside them stay server components.
 */
export function RowCarousel({ opts, heading, children, className, contentClassName, ...props }: RowCarouselProps) {
  return (
    <Carousel
      opts={opts}
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
        <CarouselContent className={contentClassName}>{children}</CarouselContent>
        <CarouselProgress className='lg:hidden' />
      </div>
    </Carousel>
  )
}
