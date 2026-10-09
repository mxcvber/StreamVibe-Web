import type { ComponentProps, ReactNode } from 'react'

import { RowCarousel } from '@/components/carousel/row-carousel'
import { GenreCard } from '@/components/genres/genre-card'
import { genreCarouselOptions, genreSlideClassName, type GenreCardVariant } from '@/components/genres/genre-variants'
import { CarouselItem } from '@/components/ui/carousel'
import type { Genre } from '@/data/genres'
import { cn } from '@/lib/utils'

type GenreCarouselProps = Omit<ComponentProps<'div'>, 'children'> & {
  genres: Genre[]
  /** Which card the row shows; see `GenreCard`. */
  variant?: GenreCardVariant
  /** See `RowCarousel`: a `flex-1` heading that sits left of the controls. */
  heading: ReactNode
}

/**
 * The genre cards used by the home page's categories section and the Movies
 * page's "Our Genres" and "Popular Top 10 In Genres" rows, inside the shared
 * `RowCarousel` shell.
 */
export function GenreCarousel({ genres, variant = 'genre', ...props }: GenreCarouselProps) {
  return (
    <RowCarousel opts={genreCarouselOptions[variant]} contentClassName='-ml-5 2xl:-ml-7.5' {...props}>
      {genres.map((genre) => (
        <CarouselItem key={genre.slug} className={cn('pl-5 2xl:pl-7.5', genreSlideClassName[variant])}>
          <GenreCard genre={genre} variant={variant} />
        </CarouselItem>
      ))}
    </RowCarousel>
  )
}
