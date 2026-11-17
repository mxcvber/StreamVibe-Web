---
paths:
  - src/components/**
  - src/features/**/components/**
---

# Components

## Variants files

- Keep per-variant maps (class strings, carousel options, sizes) out of the component file. Put
  them in a sibling `*-variants.ts` (e.g. `movieSortLabels` in `browse-variants.ts`) and key
  each one with the variant type via `satisfies Record<Variant, …>`. Then the component file holds only markup.
- Leave out `'use client'` there so server components (skeletons) can import the same values.
- Exceptions: shadcn files keep their `cva` definitions in place (`ui-primitives.md`), and
  `PosterMosaic` writes its reveal classes inline, by the author's choice. Don't move them to a
  variants file.

## Server and client

- Components are server components unless they need state, effects or browser APIs. Shared
  pieces that a client component renders (`CatalogMovieCard` and `MovieCardPoster` inside
  `MovieGrid`) have no `'use client'` and no state, so server rows use them too.
- Function props are fine on a server component that calls them itself. Never pass them on to
  a client component: only rendered output crosses the boundary.

## Skeletons

- Compose loading states from `Skeleton`. Keep the real heading and mark the placeholders
  `aria-hidden`.
- Build each placeholder like the card it replaces (padding, media ratio, line heights) rather
  than one aspect ratio, since only the media scales with the card.
- `TopGenresRowSkeleton`, `TrendingRowSkeleton`, `NewReleasesRowSkeleton` and
  `MustWatchRowSkeleton` are thin wrappers around `CatalogRowSkeleton` (`main-catalog/`), which
  draws `RowCarousel`'s frame: the heading, the prev · dots · next box from `lg` (its real
  frame, with grey shapes for the buttons and dots), the track and the mobile progress track.
  Each wrapper passes its title, placeholder count, track margin, slide classes and one `card`.
- The heading row and the controls box are `globals.css`' `.row-carousel-header` and
  `.row-carousel-controls`, which `RowCarousel` uses too. `CatalogRowSkeleton` still repeats as
  literals the `icon` button's size (44px, 56px on `2xl`), `CarouselDots`' width and
  `CarouselProgress`'s track size, and its `-ml-4` / `pl-4` defaults copy `CarouselContent` and
  `CarouselItem`. Each wrapper copies its own row.
  `TopGenresRowSkeleton`: `TopGenresCarousel`'s slide widths and card padding, and
  `TopGenresCard`'s mosaic ratios and footer heights (the 25/32px badge, a 2/4px gap and the
  title's 24/30px line). `TrendingRowSkeleton`: `TrendingCarousel`'s track margin, slide widths
  and card box (padding, gap and radius, the same values as `movie-variants.ts`' `cardBox`),
  `TrendingMovieCard`'s poster ratios and radius, and `MovieChip`'s height (28px, 36px on
  `2xl`). `NewReleasesRowSkeleton`: `NewReleasesCarousel`'s track margin, slide widths and card
  box (`cardBox`'s values plus `items-center 2xl:items-stretch`), `NewReleaseMovieCard`'s
  poster ratios and radius, and `ReleaseDateChip`'s height (30px, 36px on `2xl`).
  `MustWatchRowSkeleton`: `MustWatchCarousel`'s track margin, slide widths and card box
  (`cardBox`'s values), `MustWatchMovieCard`'s poster ratios and radius, and the heights of its
  runtime `MovieChip` (32px, 36px on `2xl`) and `RatingChip` (30px, 33px on `2xl`). Change
  them together.

## Accessibility

- Decorative images get `alt=''`, and so does a poster whose card title already names the link.
- Chips and ratings read out through `sr-only` text ("Runtime: 1h 30min", "Rated 4.5 out of
  5"). `StarRating` is `aria-hidden`; the chip reads the value instead.
- Status and error regions are always rendered (`role='status'`, `aria-live`), so a change is
  announced.
- Pages without a visible title have an `sr-only` `h1`. Sections point `aria-labelledby` at
  their heading's `id`.

## Images

- Above-the-fold images take `loading='eager'` (the home `Hero`, `ContactPosterBox`); Next 16
  deprecates `priority`.
- An image hidden with `display: none` still downloads if it's eager, but not if it's lazy. So
  `PosterMosaic` loads every tile its `visible` prop hides at the base breakpoint lazily,
  whatever `loading` says, and the hero's `loading='eager'` reaches only the 2×4 tiles shown at
  every width.
- The hero mosaic's `sizes` is its tile width at each step: `161px` is four columns in the
  672px `min-w-2xl` box ((672 − 30) / 4), then `25vw`, `17vw` and `11vw` for 4, 6 and 9
  columns. Change it whenever the box, the gap or `visible` changes.
- `FreeTrialBanner`'s `sizes` is `160px` at every width: one of nine columns in its fixed
  1596px `min-w-desktop` box ((1596 − 8 × 20) / 9). The 500px height makes the tiles 2:3 like
  the posters. A taller banner crops the posters' sides; `sizes` is then the tile height × 2/3.
- `ContactPosterBox`'s `sizes` is its tile width at each step: four columns and three 20px gaps
  in the mosaic's fixed width (300px, then 600 from `sm`, 340 from `lg`, 440 from `xl` and 600
  from `2xl`), so 60, 135, 70, 95 and 135px. Change it when a width or the gap changes.
- `HeroSlide`'s `sizes` is the page container's width: `100vw` minus `Container`'s 16, 40 or
  80px gutter on each side, and 1596px (`max-w-desktop`) from 1756px. Change it when the
  gutters or the cap change.
- `quality` must be one of `images.qualities` in `next.config.ts` (50, 75, 100); any other
  value is served at the closest one. `PosterMosaic` types its `quality` prop to that list.
  `FreeTrialBanner` uses 50 by the author's choice; at 75 its posters weigh about a third more.
  `ContactPosterBox` uses 100, also by the author's choice.

## Icons

- The icon components are Figma SVG exports with colours replaced by `currentColor`, except
  `Logo` and `HeroPlayGraphic` (Figma's "Abstract Design"), which keep the design's colours.
  Re-export from Figma rather than editing path data by hand.
