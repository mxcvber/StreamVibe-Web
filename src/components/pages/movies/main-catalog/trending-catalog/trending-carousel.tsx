import type { ComponentProps, ReactNode } from "react"
import { RowCarousel } from "@/components/shared/row-carousel/row-carousel"
import { CarouselItem } from "@/components/shared/ui/carousel"
import CardWrapper from "@/components/shared/card-wrapper"
import { TrendingMovie } from "@/lib/to-movies"
import { TrendingMovieCard } from "./trending-movie-card"

const opts = {
  align: "start",
  slidesToScroll: 1,
  breakpoints: { "(min-width: 64rem)": { slidesToScroll: 5 } },
} as const

interface TrendingCarouselProps extends Omit<ComponentProps<"div">, "children"> {
  items: TrendingMovie[]
  heading: ReactNode
}

export function TrendingCarousel({ items, ...props }: TrendingCarouselProps) {
  return (
    <RowCarousel opts={opts} contentClassName="-ml-4 lg:-ml-5" {...props}>
      {items.map((item) => (
        <CarouselItem key={item.id} className="basis-[197.6px] pl-4 md:basis-60 lg:basis-1/5 lg:pl-5">
          <CardWrapper
            className="@container gap-3 rounded-md p-2.75 lg:gap-4 lg:p-3.75 2xl:gap-5 2xl:rounded-lg 2xl:p-4.75"
            href={`/movies/${item.id}`}
          >
            <TrendingMovieCard movie={item} />
          </CardWrapper>
        </CarouselItem>
      ))}
    </RowCarousel>
  )
}
