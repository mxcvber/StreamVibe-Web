import type { MustWatch } from "@/lib/to-movies"
import type { ComponentProps, ReactNode } from "react"
import { RowCarousel } from "@/components/shared/row-carousel/row-carousel"
import { CarouselItem } from "@/components/shared/ui/carousel"
import CardWrapper from "@/components/shared/card-wrapper"
import { MustWatchMovieCard } from "./must-watch-movie-card"

const opts = {
  align: "start",
  slidesToScroll: 1,
  breakpoints: {
    "(min-width: 64rem)": { slidesToScroll: 3 },
    "(min-width: 80rem)": { slidesToScroll: 4 },
  },
} as const

interface MustWatchCarouselProps extends Omit<ComponentProps<"div">, "children"> {
  items: MustWatch[]
  heading: ReactNode
}

export function MustWatchCarousel({ items, ...props }: MustWatchCarouselProps) {
  return (
    <RowCarousel opts={opts} contentClassName="-ml-4 lg:-ml-5" {...props}>
      {items.map((item) => (
        <CarouselItem key={item.id} className="basis-61.75 pl-4 md:basis-75.25 lg:basis-1/3 lg:pl-5 xl:basis-1/4">
          <CardWrapper
            className="@container gap-3 rounded-md p-2.75 lg:gap-4 lg:p-3.75 2xl:gap-5 2xl:rounded-lg 2xl:p-4.75"
            href={`/movies/${item.id}`}
          >
            <MustWatchMovieCard movie={item} />
          </CardWrapper>
        </CarouselItem>
      ))}
    </RowCarousel>
  )
}
