'use client'

import { HeroSlide } from '@/components/movies/hero/hero-slide'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useCarouselAutoplay } from '@/hooks/use-carousel-autoplay'
import type { Movie } from '@/data/movies'

/** Long enough to read the title, the two-line overview and the actions. */
const AUTOPLAY_DELAY_MS = 7000

/**
 * The poster frame is the carousel itself: each slide paints the full frame
 * (backdrop, fade, copy, actions) and scrolls as one, while the design's 1px
 * gradient stroke and the prev · dots · next row are overlays on the frame so
 * they stay put. The overlay sits in the frame's bottom padding (40/16px on
 * laptop, 50/20px on desktop) and `HeroSlide` reserves that band. Under `lg`
 * the artboard has no controls — the slides are swipe-only.
 *
 * The slides advance on their own, which the artboards do not show but a
 * featured row is expected to do. It pauses while the pointer rests on the
 * frame or keyboard focus is inside it, navigating by hand restarts the
 * countdown rather than ending it, and reduced-motion visitors get no
 * automatic movement — see `useCarouselAutoplay`. Moving by hand still
 * animates; only the unattended advance is suppressed.
 */
export function HeroCarousel({ movies }: { movies: Movie[] }) {
  const autoplay = useCarouselAutoplay({ delay: AUTOPLAY_DELAY_MS })

  return (
    <Carousel
      // Embla drops `loop` by itself for a single slide; `active: false` also
      // skips the drag handler so one slide doesn't rubber-band.
      opts={{ loop: true, active: movies.length > 1 }}
      {...autoplay}
      aria-label='Featured movies'
      className='overflow-hidden rounded-lg'
    >
      {/* One slide per view, so the default 16px slide gutter would only show
          as a page-coloured gap mid-drag. */}
      <CarouselContent className='ml-0'>
        {movies.map((movie, index) => (
          <CarouselItem key={movie.slug} className='pl-0'>
            <HeroSlide movie={movie} priority={index === 0} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Figma's 1px Black/15 stroke, fully opaque at the top and fading to
          nothing at the bottom, where the fade into the page takes over. */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 rounded-lg border border-black-15 mask-b-from-0%'
      />

      <div className='absolute inset-x-10 bottom-4 hidden items-center justify-between lg:flex 2xl:inset-x-12.5 2xl:bottom-5'>
        <CarouselPrevious variant='surface' size='icon-lg' />
        <CarouselDots />
        <CarouselNext variant='surface' size='icon-lg' />
      </div>
    </Carousel>
  )
}
