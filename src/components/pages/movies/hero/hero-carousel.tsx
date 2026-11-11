"use client"

import type { HeroMovie } from "@/types/movies-hero"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shared/ui/carousel"
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay"
import { HeroSlide } from "./hero-slide"

const AUTOPLAY_DELAY_MS = 7000

export function HeroCarousel({ movies }: { movies: HeroMovie[] }) {
  const autoplay = useCarouselAutoplay({ delay: AUTOPLAY_DELAY_MS })

  return (
    <Carousel
      // Embla drops `loop` by itself for a single slide; `active: false` also
      // skips the drag handler so one slide doesn't rubber-band.
      opts={{ loop: true, active: movies.length > 1 }}
      {...autoplay}
      aria-label="Featured movies"
      className="overflow-hidden rounded-lg"
    >
      <CarouselContent className="ml-0">
        {movies.map((movie, index) => (
          <CarouselItem key={movie.id} className="pl-0">
            <HeroSlide movie={movie} priority={index === 0} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* 1px Black/15 stroke, fully opaque at the top and fading to
          nothing at the bottom, where the fade into the page takes over. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg border border-black-15 mask-b-from-0%"
      />

      <div className="absolute inset-x-10 bottom-4 hidden items-center justify-between lg:flex 2xl:inset-x-12.5 2xl:bottom-5">
        <CarouselPrevious variant="surface" size="icon-lg" />
        <CarouselDots />
        <CarouselNext variant="surface" size="icon-lg" />
      </div>
    </Carousel>
  )
}
