---
paths:
  - src/components/ui/**
  - components.json
---

# UI primitives

The files in `components/ui` started as shadcn CLI output (style `radix-nova`) and were edited
to match Figma. `npx shadcn add <name> --overwrite` replaces a file and erases those edits:
before accepting an overwrite, diff it against `git show pre-refactor:src/components/ui/<name>.tsx`.

## Adapting a file the CLI adds

- Import `cn` from `@/lib/utils`, not from `cn`: the project's `cn` registers the px sizes.
- Replace Tailwind text sizes (`text-sm`) with px tokens (`text-14`); the defaults are removed.
- Check colours on the dark palette: `bg-muted` (Black/12) barely shows on Black/10 cards.
- Keep the `cva` definitions in the file, as shadcn generates them, so CLI updates still diff
  cleanly. This is the one exception to `*-variants.ts`.

## Sizes live here

The Figma sizes are in the primitives; feature components only lay them out.

- `Button` sizes `default`, `sm`, `icon`, `icon-sm`, `lg` and `icon-lg` follow the Figma
  buttons, with desktop under `2xl:`. Paddings are the Figma value minus the 1px border. `lg`
  takes its height from its icon, so without one it renders 49px (55px on desktop).
- `surface` (Black/06 with a Black/15 hairline) is for buttons over images: the hero's icon
  buttons and the carousel arrows.
- `Input`, `Textarea`, `Select`, `Checkbox`, `Label` and `Field` carry the form sizes.

## Deliberate differences from shadcn

- `Card` is a bare surface with no default padding; each usage sets its own.
- `Skeleton` is Black/15 and pulses only under `motion-safe:`.
- `TabsList` and `TabsTrigger` are the design's segmented control.
- `AccordionTrigger` swaps a plus and a minus icon instead of rotating a chevron.
- `Field` doesn't turn the label red when invalid; only the control's border and `FieldError`
  show the error.
- `Checkbox` has an enlarged invisible hit area. Its checked state isn't designed, so it fills
  with the brand red.
- `Input` uses `text-ellipsis` for placeholders that don't fit. `Textarea` grows with
  `field-sizing-content` and can't be resized.
- `SelectTrigger` is boxed like `Input`, with the design's Grey/60 chevron.
- `Carousel` is rewritten (`carousel.md`), and `CarouselProgress` is ours, not shadcn's.
