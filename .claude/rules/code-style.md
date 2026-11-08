---
paths:
  - src/**
---

# Code style

- Prettier formats on save from the repo's `.prettierrc`: double quotes (JSX too), no
  semicolons, 120 columns. VS Code's `prettier.*` settings don't apply while a config file
  exists, so every option belongs in `.prettierrc`. `npx prettier --write <path>` formats a
  file as a save would.
- `prettier-plugin-tailwindcss` sorts the classes in `className` and `@apply` against
  `globals.css` (`tailwindStylesheet`). Classes passed to `cn()` aren't sorted.
- Files Prettier hasn't formatted with this config yet keep an older style: single quotes in
  most of `src`, semicolons in a few of `components/icons`. In those, match the file. The
  author's next save converts the whole file, so its diff mixes reformatting with the real
  change.
- Import types with `import type`, or inline `type` in a mixed import. VS Code's auto-import
  leaves it out.
- Name a props type with `interface`, not `type` (`PlanComparisonTableProps`). Older files
  still use `type`.
- Imports: packages first, then `@/` imports. The blank line between the groups is optional;
  match the file.
- Import `cn` from `@/lib/utils`, not from the `cn` package that auto-import also offers: ours
  registers the px text sizes and section gaps (`styling.md`).
- Put a blank line between sibling JSX elements (not inline ones within text), as `SiteHeader`
  and `SiteFooter` do. Many older components don't yet.
- Use `<Fragment>` from `react` (auto-import may pick `react/jsx-runtime`), not `<>`. Older
  files still use `<>`; convert a file's fragments when you edit it.
