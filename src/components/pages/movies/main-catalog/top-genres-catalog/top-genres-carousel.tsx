import type { ComponentProps, ReactNode } from "react"
import { RowCarousel } from "@/components/shared/row-carousel/row-carousel"
import { CarouselItem } from "@/components/shared/ui/carousel"
import CardWrapper from "@/components/shared/card-wrapper"
import { Genre } from "@/data/genres"
import { TopGenresCard } from "./top-genres-card"

const opts = {
  align: "start",
  slidesToScroll: 1,
  breakpoints: { "(min-width: 64rem)": { slidesToScroll: 4 } },
} as const

interface TopGenresCarouselProps extends Omit<ComponentProps<"div">, "children"> {
  genres: Genre[]
  heading: ReactNode
}

export function TopGenresCarousel({ genres, ...props }: TopGenresCarouselProps) {
  return (
    <RowCarousel opts={opts} contentClassName="-ml-5 2xl:-ml-7.5" {...props}>
      {genres.map((genre) => (
        <CarouselItem key={genre.slug} className="basis-63 pl-5 md:basis-80 lg:basis-1/4 2xl:pl-7.5">
          <CardWrapper className="p-4.75 lg:p-7.25" href={`/movies/genres/${genre.slug}/top-10`}>
            <TopGenresCard genre={genre} />
          </CardWrapper>
        </CarouselItem>
      ))}
    </RowCarousel>
  )
}
