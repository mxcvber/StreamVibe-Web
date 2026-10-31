'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shared/ui/carousel'
import { CarouselProgress } from '@/components/shared/row-carousel/carousel-progress'
import { cn } from '@/lib/utils'

type RowCarouselProps = Omit<ComponentProps<'div'>, 'children'> & {
  opts: ComponentProps<typeof Carousel>['opts']
  heading: ReactNode
  children: ReactNode
  contentClassName?: string
}

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
