import type { NewRelease } from "@/lib/to-movies"
import type { ComponentProps, ReactNode } from "react"
import { RowCarousel } from "@/components/shared/row-carousel/row-carousel"
import { CarouselItem } from "@/components/shared/ui/carousel"
import CardWrapper from "@/components/shared/card-wrapper"
import { NewReleaseMovieCard } from "./new-release-movie-card"

const opts = {
  align: "start",
  slidesToScroll: 1,
  breakpoints: { "(min-width: 64rem)": { slidesToScroll: 5 } },
} as const

interface NewReleasesCarouselProps extends Omit<ComponentProps<"div">, "children"> {
  items: NewRelease[]
  heading: ReactNode
}

export function NewReleasesCarousel({ items, ...props }: NewReleasesCarouselProps) {
  return (
    <RowCarousel opts={opts} contentClassName="-ml-5" {...props}>
      {items.map((item) => (
        <CarouselItem key={item.id} className="basis-[198.4px] pl-5 md:basis-61 lg:basis-1/5">
          <CardWrapper
            className="@container gap-3 rounded-md p-2.75 lg:gap-4 lg:p-3.75 2xl:gap-5 2xl:rounded-lg 2xl:p-4.75 items-center 2xl:items-stretch"
            href={`/movies/${item.id}`}
          >
            <NewReleaseMovieCard movie={item} />
          </CardWrapper>
        </CarouselItem>
      ))}
    </RowCarousel>
  )
}
