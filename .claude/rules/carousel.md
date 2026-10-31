---
paths:
  - src/components/shared/ui/carousel*.tsx
  - src/hooks/**
  - src/components/**/*carousel*.tsx
  - src/components/**/*-variants.ts
---

# Carousels (Embla)

- `Carousel` differs from shadcn's: it reads Embla's state with `useSyncExternalStore` instead
  of copying it into React state from an effect. `CarouselPrevious` and `CarouselNext` are
  normal flow items so they can sit in the heading row, and `CarouselDots` is added.
- `RowCarousel` is the shell every row shares: the heading, prev · dots · next from `lg`, the
  slides, and `CarouselProgress` under `lg`. Its `heading` should carry `flex-1`. Slides arrive
  as children, so the cards inside them stay server components. The heading → slides gap is the
  section spacing; the Movies page rows override it through `className`.
- The slide gutter is `pl-*` on every `CarouselItem` with a matching negative `-ml-*` on the
  track. Below `lg` each slide has a fixed basis that includes the gutter: the mobile card plus
  gutter at base (`basis-49.5` is the 178px genre card, `basis-63` the 232px "Top 10 In" card),
  wider from `md`. From `lg` the basis is a fraction of the row.
- Slide widths and Embla options live in `movie-variants.ts` for the movie rows, and in
  `GenreCarousel` and `TopGenresCarousel` themselves for the genre rows.
- Embla's `breakpoints` re-initialise the carousel when a query flips, and matching entries
  merge in order, so the last one wins.
- Pass `active: false` when there is a single slide, or it rubber-bands on drag.

## Hero autoplay (`useCarouselAutoplay`)

- Ours rather than `embla-carousel-autoplay`. The plugin resumes by itself after a drag or a
  mouse leave, overriding pauses set from outside, and it only watches focus inside the slides,
  while the hero's controls sit outside them.
- It pauses on hover (mouse and pen only: iOS fires a synthetic `pointerenter` on tap), on
  keyboard focus (`:focus-visible` only, since hover already covers a click), during a drag and
  while the tab is hidden. Reduced motion turns it off; moving by hand still animates.
- Every pause, resume and advance goes through `sync()`, the only place a timer is set. The
  holds are refs, not state, so hovering doesn't re-render the slides.
- `usePrefersReducedMotion` returns `false` on the server, because the preference can't be known
  there. Use it as a switch, never to change what renders.

## Mobile scrubber (`CarouselProgress`)

- The track works as a scrollbar: drag the thumb or press the track, and releasing snaps. Like
  a native scrollbar it is `aria-hidden` and not focusable; keyboard users page with the arrow
  keys on the region.
- `useCarouselScrub` drives Embla through `api.internalEngine()`, which isn't public API.
  Re-test the scrubber on a phone after any Embla upgrade.
