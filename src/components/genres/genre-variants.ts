import type useEmblaCarousel from 'embla-carousel-react'

/**
 * Per-variant config for the two genre cards in the designs: the plain one
 * (home categories, "Our Genres") and the Movies page's wider "Top 10 In" one.
 * Kept outside the 'use client' carousel so server components (the loading
 * skeleton) can read the slide widths too.
 */
export type GenreCardVariant = 'genre' | 'top10'

/**
 * Card styles. The "Top 10 In" card keeps 30px padding from laptop up, spaces
 * its posters 10px apart and puts a red badge above the name.
 *
 * Mosaics are sized by the artboards' aspect ratios rather than a fixed
 * height, so the tiles keep their proportions when the card shrinks with the
 * viewport instead of turning tall and narrow.
 */
export const genreCardStyles = {
  genre: {
    card: 'p-4.75 lg:p-5.75 2xl:p-7.25',
    // 138.4×140 mobile, 191.8×210 laptop, 235.4×252 desktop.
    mosaic: 'aspect-[138.4/140] lg:aspect-[191.8/210] 2xl:aspect-[235.4/252]',
    gap: '[--mosaic-gap:5px]',
    tile: 'rounded-md',
    sizes: '(min-width: 1536px) 120px, (min-width: 1024px) 96px, 72px',
    footer: 'gap-2',
    title: 'text-14 lg:text-16 2xl:text-18',
    icon: 'size-5 lg:size-6 2xl:size-7.5',
  },
  top10: {
    card: 'p-4.75 lg:p-7.25',
    // 191.75×177 mobile, 225×206 laptop, 292×252 desktop.
    mosaic: 'aspect-[191.75/177] lg:aspect-[225/206] 2xl:aspect-[292/252]',
    gap: '[--mosaic-gap:10px]',
    tile: 'rounded-[4px]',
    sizes: '(min-width: 1536px) 144px, (min-width: 1024px) 112px, 96px',
    footer: 'gap-5',
    title: 'text-16 2xl:text-20',
    icon: 'size-6 2xl:size-7.5',
  },
} satisfies Record<GenreCardVariant, Record<string, string>>

/** Where each card leads: the genre's full list, or its top 10. */
export const genreCardHref = {
  genre: (slug: string) => `/movies/genres/${slug}`,
  top10: (slug: string) => `/movies/genres/${slug}/top-10`,
} satisfies Record<GenreCardVariant, (slug: string) => string>

/**
 * Slide widths: fixed-width cards that scroll one at a time under `lg` (the
 * basis includes the 20px slide gutter, so 198px is the mobile artboard's
 * 178px genre card and 252px its 232px "Top 10" card), then a quarter of the
 * row from `lg`. Plain genre cards step up to the artboards' five from `xl`;
 * the wider "Top 10" cards stay at four.
 */
export const genreSlideClassName = {
  genre: 'basis-49.5 md:basis-65 lg:basis-1/4 xl:basis-1/5',
  top10: 'basis-63 md:basis-80 lg:basis-1/4',
} satisfies Record<GenreCardVariant, string>

/**
 * Embla options. Cards per page follow the slide widths above: one at a time
 * under `lg`, four from `lg`, and five from `xl` for the plain genre cards.
 * Embla re-initialises itself when a breakpoint query flips.
 */
type CarouselOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>

export const genreCarouselOptions = {
  genre: {
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 64rem)': { slidesToScroll: 4 },
      '(min-width: 80rem)': { slidesToScroll: 5 },
    },
  },
  top10: {
    align: 'start',
    slidesToScroll: 1,
    breakpoints: { '(min-width: 64rem)': { slidesToScroll: 4 } },
  },
} as const satisfies Record<GenreCardVariant, CarouselOptions>
