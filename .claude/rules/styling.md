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

Use `md:` only for tablet tweaks and `xl:` only where a component needs a fourth step (cards
per carousel page). `Container` caps content at 1596px with an 80px gutter from `lg`, which
gives the desktop artboard's 162px gutter at 1920 by itself. Don't add a wider gutter at
`2xl`: cards would be smaller at 1536 than at 1440.

## Tokens

- Tailwind's default colours and text sizes are removed in `globals.css`. Only the Figma
  palette (`bg-black-10`, `text-grey-60`, `red-45`) and px-named sizes (`text-18`, line-height
  150% built in) exist, so `text-sm` or `bg-zinc-900` do nothing.
- Keep `@theme static`: shadcn's semantic variables read the palette from plain CSS, and
  Tailwind would otherwise drop the palette variables no class uses.
- Radii: `rounded-sm` 8px (buttons), `rounded-md` 10px (badges, tabs, inner images),
  `rounded-lg` 12px (cards), `rounded-xl` 16px.
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
- `leading-none` plus padding reproduces Figma's cap-height-trimmed badges in every browser.
- Invisible `before:`/`after:` insets enlarge small tap targets without moving the layout.
- Chips compact on narrow cards via `@container` on the card and `@max-[Npx]:` on the chip.
  The thresholds are measured content widths; re-measure if the chip content changes.
- `PosterMosaic` keeps the artboard's box even where that is wider than the screen (the
  free-trial banner), and an `overflow-hidden` parent crops it. Don't fit it to the viewport, or
  the tiles squash. The home hero is the exception: below `2xl` its `visible` prop hides rows and
  columns, so its box spans the viewport (at least 672px). Its gap is the `--mosaic-gap`
  variable, set once by the caller.
