---
paths:
  - src/**
---

# Code style

- Prettier runs on save from the author's VS Code user settings; the repo has no Prettier
  config. Single quotes (JSX too), no semicolons, 120 columns, `quoteProps: "preserve"`.
  Don't run the Prettier CLI here: without a config it uses double quotes, semicolons and
  80 columns.
- Files that predate this or come from the shadcn CLI (much of `components/ui` and
  `components/icons`) still use double quotes and semicolons. In those, match the file. The
  author's next save converts the whole file, so its diff mixes reformatting with the real
  change.
- Import types with `import type`, or inline `type` in a mixed import. VS Code's auto-import
  leaves it out.
- Imports: packages first, then a blank line, then `@/` imports.
