---
paths:
  - src/**/*.tsx
  - src/**/*-variants.ts
  - src/app/globals.css
  - src/lib/utils.ts
---

# Styling

## Responsive layout

The Figma file has three artboards per page (Desktop 1920 · Laptop 1440 · Mobile 390), mapped
mobile-first onto Tailwind's default breakpoints:

| Viewport    | Artboard                                                    | Prefix |
| ----------- | ----------------------------------------------------------- | ------ |
| `< 768`     | Mobile                                                      | (base) |
| `768–1023`  | Mobile, plus light tablet tweaks (2-col grids, 40px gutter) | `md:`  |
| `1024–1535` | Laptop                                                      | `lg:`  |
| `≥ 1536`    | Desktop                                                     | `2xl:` |

Use `md:` only for tablet tweaks, and `xl:` and `sm:` (640) only where a component needs an
extra step: cards per carousel page, `PlanCard`'s padding, the Support poster box and the
Movies hero's description.
`Container` caps content at 1596px with an 80px gutter from `lg`, which gives the desktop
artboard's 162px gutter at 1920 by itself. Don't add a wider gutter at `2xl`: cards would be
smaller at 1536 than at 1440.

## Tokens

- Tailwind's default colours and text sizes are removed in `globals.css`. Only the Figma
  palette (`bg-black-10`, `text-grey-60`, `red-45`) and px-named sizes (`text-18`, line-height
  150% built in) exist, so `text-sm` or `bg-zinc-900` do nothing.
- A size's built-in line-height beats any `leading-*` on a parent, because Tailwind's
  `--tw-leading` doesn't inherit. Put the leading on the element that has the `text-*` class
  (`PlanCard`'s price spans).
- Keep `@theme static`: shadcn's semantic variables read the palette from plain CSS, and
  Tailwind would otherwise drop the palette variables no class uses.
- Radii: `rounded-xs` 2px (Tailwind's default; the flags), `rounded-sm` 8px (buttons),
  `rounded-md` 10px (badges, tabs, inner images), `rounded-lg` 12px (cards), `rounded-xl` 16px.
- A new token in a Tailwind class group (a text size, a gap) must be added to `cn`'s
  `classGroups`. Unregistered, `cn` drops `text-18` when a colour class follows, and a
  caller's `gap-5` can't override `gap-section-mobile`.

## Translating Figma

- **Figma draws strokes inside the frame; a CSS border adds to the box.** Padding beside a 1px
  border is the Figma value minus 1px (`p-5.75` for Figma's 24px). Don't round it back.
- Card media is sized by the artboards' aspect ratios (`aspect-[192/232]`), not fixed heights,
  so it keeps its shape as the card shrinks.
- Copy widths are the artboard's text box as `max-w-*`, not Figma's side padding.
- `SiteHeader` floats over the page. A page without a hero reserves its height as top padding.
- Class strings stay literal, since Tailwind can't see a class built at runtime. Per-variant
  maps live in `*-variants.ts`.

## Techniques in use

- `hidden lg:line-clamp-2` reveals text from `lg`, because `line-clamp` also sets `display`.
- The Movies hero's prev · dots · next row overlays the carousel frame, so it stays put while
  the slides scroll. `HeroSlide`'s bottom padding reserves its band: the row's offset, the
  `icon-lg` buttons and the inset above them, 16 + 48 + 40 = 104px (`lg:pb-26`) and
  20 + 56 + 50 = 126px on desktop (`2xl:pb-31.5`). Change them together.
- `leading-none` plus padding reproduces Figma's cap-height-trimmed badges in every browser.
- Invisible `before:`/`after:` insets enlarge small tap targets without moving the layout.
- Chips compact on narrow cards via `@container` on the card and `@max-[Npx]:` on the chip.
  The thresholds are measured content widths; re-measure if the chip content changes.
  `CardWrapper` doesn't set `@container`, so a carousel whose cards hold such chips passes it
  in the wrapper's `className`, as `TrendingCarousel`, `NewReleasesCarousel` and
  `MustWatchCarousel` do.
- `StarRating` draws a half star as a red star clipped over a grey one. Its
  `[clip-path:inset(0_52.45%_0_0)]` cuts at the icon's vertical axis, 6.66px into its 14px box.
  Re-measure it if `StarIcon` changes.
- `PosterMosaic` keeps a fixed box even where that is wider than the screen, and an
  `overflow-hidden` parent crops it. `ContactPosterBox` gives its 4×4 mosaic a fixed box at
  each step, centred in the frame (`design.md`), and `FreeTrialBanner` uses 1596px
  (`min-w-desktop`) at every width. Don't fit it to the viewport, or the tiles squash. The home
  hero is the exception: below `2xl` its `visible` prop hides rows and columns, so its box spans
  the viewport (at least 672px). Its gap is the `--mosaic-gap` variable, set once by the caller.
- Fade art inside a rounded `overflow-hidden` box with a mask on the art (`mask-[…]`), not an
  opaque gradient laid over it. Where the box's edge falls between device pixels (browser zoom,
  125–150% display scaling), each layer is antialiased separately and the art leaks past the
  overlay as a 1px line. `FreeTrialBanner` paints Figma's gradient as the backdrop's background
  and masks the posters with its inverse alpha.
- `.faq-divider` (`globals.css`) draws the FAQ's red gradient lines as a `border-image`,
  which paints only where a border width exists. So rows always carry it, and borders
  choose where a line shows: `AccordionItem`'s `not-last:border-b`, and
  `max-lg:border-b faq-divider` on each column but the last, which keeps a line between
  the columns where they stack below `lg`.
- `globals.css` keeps its reusable classes in `@layer components`: `.faq-divider`,
  `.subscription-cell-header` and `.subscription-cell-body` (`PlanComparisonTable`'s cells),
  `.catalog-box-label` (`CatalogBox`'s pill, as a link or plain text), and
  `.row-carousel-header` and `.row-carousel-controls` (`RowCarousel`'s heading row and
  prev · dots · next box, shared with `CatalogRowSkeleton`). Tailwind orders that
  layer before `@layer utilities`, so a utility beside a class overrides what the class sets,
  as the pill link's `hover:bg-red-50` does. Put new classes there too: unlayered CSS beats
  every utility whatever its specificity or order (Sonner's does, `ui-primitives.md`).
- `PlanFeatureList` renders `planFeatures` in the table's order, and `grid-flow-row-dense`
  lifts Free Trial into the slot beside Price that the full-width Content and Devices rows
  leave empty. The phone card then matches the mobile artboard (Price | Free Trial, Content,
  Devices, …) while screen readers keep the table's order. Don't reorder `planFeatures` for
  the card.
