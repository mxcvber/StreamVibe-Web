---
paths:
  - src/components/**
---

# Components

- Keep per-variant maps (class strings, carousel options, sizes) out of the component file. Put
  them in a sibling `*-variants.ts` (e.g. `src/components/genres/genre-variants.ts`) and key
  each one with the variant type via `satisfies Record<Variant, …>`. Then the component file
  holds only markup.
- Leave out `'use client'` there so server components (skeletons) can import the same values.
- Exception: shadcn files in `src/components/ui/` keep their `cva` definitions in place, as
  shadcn generates them, so `npx shadcn add` updates still apply cleanly.
