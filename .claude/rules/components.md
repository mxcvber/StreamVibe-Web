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
- Exceptions: shadcn files keep their `cva` definitions in place (`ui-primitives.md`), and
  `PosterMosaic` writes its reveal classes inline, by the author's choice. Don't move them to a
  variants file.

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
- An image hidden with `display: none` still downloads if it's eager, but not if it's lazy. So
  `PosterMosaic` loads every tile its `visible` prop hides at the base breakpoint lazily,
  whatever `loading` says, and the hero's `loading='eager'` reaches only the 2×4 tiles shown at
  every width.
- The hero mosaic's `sizes` is its tile width at each step: `161px` is four columns in the
  672px `min-w-2xl` box ((672 − 30) / 4), then `25vw`, `17vw` and `11vw` for 4, 6 and 9
  columns. Change it whenever the box, the gap or `visible` changes.
- `quality` must be one of `images.qualities` in `next.config.ts` (50, 75, 100); any other
  value is served at the closest one. `PosterMosaic` types its `quality` prop to that list.

## Icons

- The icon components are Figma SVG exports with colours replaced by `currentColor`, except
  `Logo` and `HeroPlayGraphic` (Figma's "Abstract Design"), which keep the design's colours.
  Re-export from Figma rather than editing path data by hand.
