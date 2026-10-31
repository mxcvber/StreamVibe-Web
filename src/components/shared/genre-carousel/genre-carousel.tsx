import type { ComponentProps, ReactNode } from 'react'
import { RowCarousel } from '@/components/shared/row-carousel/row-carousel'
import { GenreCard } from '@/components/shared/genre-carousel/genre-card'
import { CarouselItem } from '@/components/shared/ui/carousel'
import CardWrapper from '../card-wrapper'
import { Genre } from '@/data/genres'

const opts = {
  align: 'start',
  slidesToScroll: 1,
  breakpoints: {
    '(min-width: 64rem)': { slidesToScroll: 4 },
    '(min-width: 80rem)': { slidesToScroll: 5 },
  },
} as const

type GenreCarouselProps = Omit<ComponentProps<'div'>, 'children'> & {
  heading: ReactNode
  genres: Genre[]
}

export function GenreCarousel({ genres, ...props }: GenreCarouselProps) {
  return (
    <RowCarousel opts={opts} contentClassName='-ml-5 2xl:-ml-7.5' {...props}>
      {genres.map((genre) => (
        <CarouselItem key={genre.slug} className='pl-5 2xl:pl-7.5 basis-49.5 md:basis-65 lg:basis-1/4 xl:basis-1/5'>
          <CardWrapper className='p-4.75 lg:p-5.75 2xl:p-7.25' href={`/movies/genres/${genre.slug}`}>
            <GenreCard genre={genre} />
          </CardWrapper>
        </CarouselItem>
      ))}
    </RowCarousel>
  )
}
