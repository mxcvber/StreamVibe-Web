---
paths:
  - src/components/**
---

# Components

## Variants files

- Keep per-variant maps (class strings, carousel options, sizes) out of the component file. Put
  them in a sibling `*-variants.ts` (e.g. `movieCardStyles`) and key each one with the variant
  type via `satisfies Record<Variant, …>`. Then the component file holds only markup.
- Leave out `'use client'` there so server components (skeletons) can import the same values.
- Exception: shadcn files keep their `cva` definitions in place (`ui-primitives.md`).

## Server and client

- Components are server components unless they need state, effects or browser APIs. Shared
  pieces that a client component renders (`CatalogMovieCard` and `MovieCardLink` inside
  `MovieGrid`) have no `'use client'` and no state, so server rows use them too.
- A JSX element passed as a prop from a server component into a client one (`RowCarousel`'s
  `heading`) needs a `key`, or React warns. It looks redundant; keep it.
- Function props are fine on a server component that calls them itself (`MovieRow`'s `load`,
  `toMovies` and `renderCard`). Never pass them on to a client component: only rendered
  output crosses the boundary.

## Skeletons

- Compose loading states from `Skeleton`. Keep the real heading and mark the placeholders
  `aria-hidden`.
- Build each placeholder like the card it replaces (padding, media ratio, line heights) rather
  than one aspect ratio, since only the media scales with the card. Match the heading row's
  height where the loaded row has controls beside it, and reserve the mobile progress bar.
- `TopGenresRowSkeleton` repeats `TopGenresCarousel`'s slide widths and `TopGenresCard`'s
  padding and mosaic ratios as literals, since no variants file holds them. Change them
  together.

## Accessibility

- Decorative images get `alt=''`, and so does a poster whose card title already names the link.
- Chips and ratings read out through `sr-only` text ("Runtime: 1h 30min", "Rated 4.5 out of
  5"). `StarRating` is `aria-hidden`; the chip reads the value instead.
- Status and error regions are always rendered (`role='status'`, `aria-live`), so a change is
  announced.
- Pages without a visible title have an `sr-only` `h1`. Sections point `aria-labelledby` at
  their heading's `id`.

## Images

- Above-the-fold images take `loading='eager'` (the home `Hero`); Next 16 deprecates `priority`.
- `quality` must be one of `images.qualities` in `next.config.ts` (50, 75, 100); any other
  value is served at the closest one. `PosterMosaic` types its `quality` prop to that list.

## Icons

- The icon components are Figma SVG exports with colours replaced by `currentColor`, except
  `Logo` and `HeroPlayGraphic` (Figma's "Abstract Design"), which keep the design's colours.
  Re-export from Figma rather than editing path data by hand.
