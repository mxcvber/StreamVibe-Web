import type useEmblaCarousel from 'embla-carousel-react'

/**
 * Per-variant config for the Movies page's movie cards: a poster over a row
 * of chips. "Trending Now" shows runtime + views, "New Releases" a release
 * date pill, "Must - Watch Movies" runtime + a star rating on larger cards.
 * Kept outside the client carousel so server components (the loading
 * skeleton) can read it too.
 *
 * The artboards differ slightly between rows (card width, gutter, poster
 * height), so each row follows its own artboard rather than sharing values.
 */
export type MovieCardVariant = 'trending' | 'new-releases' | 'must-watch'

/**
 * Each row's heading, shared by the row and its skeleton, and the noun its
 * messages use ("We couldn't load the trending movies…").
 */
export const movieRowCopy = {
  trending: { title: 'Trending Now', headingId: 'movies-trending-heading', noun: 'trending movies' },
  'new-releases': { title: 'New Releases', headingId: 'movies-new-releases-heading', noun: 'new releases' },
  'must-watch': { title: 'Must - Watch Movies', headingId: 'movies-must-watch-heading', noun: 'must-watch movies' },
} satisfies Record<MovieCardVariant, { title: string; headingId: string; noun: string }>

/** Padding (less the 1px border Figma draws inside the box), gap and radius. */
const cardBox = 'gap-3 rounded-md p-2.75 lg:gap-4 lg:p-3.75 2xl:gap-5 2xl:rounded-lg 2xl:p-4.75'

/**
 * Card styles. Padding and the poster → chips gap are 12/16/20px across the
 * artboards; the radius steps from 10px to 12px on desktop.
 *
 * Posters are sized by the artboards' aspect ratios rather than a fixed
 * height, so they keep their proportions when the card shrinks with the
 * viewport.
 */
export const movieCardStyles = {
  trending: {
    // `@container` lets the chips compact themselves on narrow cards.
    card: `${cardBox} @container`,
    // 157.6×195 mobile, 192×232 laptop, 243.6×281 desktop.
    poster: 'aspect-[157.6/195] rounded-md lg:aspect-[192/232] 2xl:aspect-[243.6/281] 2xl:rounded-lg',
    sizes: '(min-width: 1536px) 244px, (min-width: 1024px) 192px, (min-width: 768px) 200px, 158px',
  },
  'new-releases': {
    // The pill hugs its text and is centered up to laptop, and spans the card
    // on desktop. `@container` lets the pill hide its "Released at" on narrow
    // cards.
    card: `${cardBox} @container items-center 2xl:items-stretch`,
    // 154.4×193 mobile, 192×230 laptop, 243.6×281 desktop. `w-full` because
    // the card centers its children.
    poster: 'aspect-[154.4/193] w-full rounded-md lg:aspect-[192/230] 2xl:aspect-[243.6/281] 2xl:rounded-lg',
    sizes: '(min-width: 1536px) 244px, (min-width: 1024px) 192px, (min-width: 768px) 200px, 155px',
  },
  'must-watch': {
    // `@container` lets the runtime chip drop its icon on narrow cards.
    card: `${cardBox} @container`,
    // 207×235 mobile, 253×324 laptop, 319.5×404 desktop.
    poster: 'aspect-[207/235] rounded-md lg:aspect-[253/324] 2xl:aspect-[319.5/404] 2xl:rounded-lg',
    // The widest poster in each range: 3 per page up to 1279px, 4 from 1280.
    sizes:
      '(min-width: 1536px) 319px, (min-width: 1280px) 277px, (min-width: 1024px) 301px, (min-width: 768px) 261px, 207px',
  },
} satisfies Record<MovieCardVariant, Record<string, string>>

/**
 * "Trending Now" chips on cards too narrow for both on one line: no icons
 * (their "Runtime"/"Views" labels stay for screen readers), "1h 39m" instead
 * of "1h 39min", and 6px side padding. The thresholds are the card content
 * widths the widest possible pair needs at full size ("4h 40min" + "690K" with
 * a 4px gap): 154px at 12px text, 197px at 16px on desktop. That compacts
 * laptops up to ~1260px wide and desktops from 1536px to ~1544px; compact, the
 * widest pair needs 100px, inside a 1024px laptop's 105px. Literal strings so
 * Tailwind can see them.
 */
export const trendingChipCompact = {
  chip: '@max-[154px]:pr-1.25 @max-[154px]:pl-1.25 @max-[154px]:[&_svg]:hidden 2xl:@max-[197px]:pr-1.25 2xl:@max-[197px]:[&_svg]:hidden',
  /** On the full runtime ("1h 39min"). */
  full: '@max-[154px]:hidden 2xl:@max-[197px]:hidden',
  /** On the short runtime ("1h 39m"). */
  short: 'hidden @max-[154px]:inline 2xl:@max-[197px]:inline',
}

/**
 * "Must - Watch Movies" runtime chip. Its padding is the artboard's 6/10/6/6
 * at every size (32px tall below desktop, where Trending's is 28px). On cards
 * too narrow for both chips it hides the clock icon, keeping the "Runtime"
 * label for screen readers, and pads both sides alike.
 *
 * The thresholds are the card content widths the widest likely pair needs
 * ("4h 48min" + a two-digit "20K" count, 2px apart), measured: 212px laptop,
 * 261px desktop.
 * That compacts laptops just above 1024px and 1280px, where the page goes to
 * 3 and 4 cards, and desktops just above 1536px; a classic scrollbar makes the
 * cards those 15px narrower. Not on mobile, whose fixed 207px card would always
 * compact: the widest likely pair there is 0.5px over, spilling into the
 * card's padding. Literal strings so Tailwind can see them.
 */
export const mustWatchRuntimeChip =
  'min-h-8 py-1.25 pr-2.25 pl-1.25 lg:@max-[212px]:pl-2.25 lg:@max-[212px]:[&_svg]:hidden 2xl:@max-[261px]:pl-2.25 2xl:@max-[261px]:[&_svg]:hidden'

/**
 * Slide widths: fixed-width cards that scroll one at a time under `lg`, then a
 * fifth of the row from `lg`. Each basis includes the slide gutter:
 * - trending: 16px gutter (20px from `lg`); 197.6px is the mobile artboard's
 *   181.6px card, and 240px on tablets is the laptop's 224px card.
 * - new-releases: 20px gutter throughout; 198.4px is the 178.4px mobile card,
 *   and 244px on tablets is the laptop's 224px card.
 * - must-watch: 16px gutter (20px from `lg`); 247px is the 231px mobile card,
 *   and 301px on tablets the laptop's 285px card. A third of the row up to
 *   1279px and a quarter from `xl`: the laptop artboard's four per page leave
 *   the runtime and rating chips no room side by side below ~1300px.
 */
export const movieSlideClassName = {
  trending: 'basis-[197.6px] pl-4 md:basis-60 lg:basis-1/5 lg:pl-5',
  'new-releases': 'basis-[198.4px] pl-5 md:basis-61 lg:basis-1/5',
  'must-watch': 'basis-61.75 pl-4 md:basis-75.25 lg:basis-1/3 lg:pl-5 xl:basis-1/4',
} satisfies Record<MovieCardVariant, string>

/** The track's negative margin, cancelling the slide gutter above. */
export const movieTrackClassName = {
  trending: '-ml-4 lg:-ml-5',
  'new-releases': '-ml-5',
  'must-watch': '-ml-4 lg:-ml-5',
} satisfies Record<MovieCardVariant, string>

/**
 * Embla options. Cards per page follow the slide widths above: one at a time
 * under `lg`, then a page at a time. Embla re-initialises itself when a
 * breakpoint query flips, and merges the matching ones in order, so the last
 * match wins.
 */
type CarouselOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>

const fivePerPage = {
  align: 'start',
  slidesToScroll: 1,
  breakpoints: { '(min-width: 64rem)': { slidesToScroll: 5 } },
} as const satisfies CarouselOptions

const threeThenFourPerPage = {
  align: 'start',
  slidesToScroll: 1,
  breakpoints: {
    '(min-width: 64rem)': { slidesToScroll: 3 },
    '(min-width: 80rem)': { slidesToScroll: 4 },
  },
} as const satisfies CarouselOptions

export const movieCarouselOptions = {
  trending: fivePerPage,
  'new-releases': fivePerPage,
  'must-watch': threeThenFourPerPage,
} as const satisfies Record<MovieCardVariant, CarouselOptions>
