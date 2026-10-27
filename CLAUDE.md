# CLAUDE.md

@AGENTS.md

## Project

StreamVibe is a movie platform. **This repo is the Next.js frontend only.** The backend
(NestJS, Prisma, PostgreSQL, Redis) is the separate repo `../api`, with its own CLAUDE.md. The
frontend reads only from that API, through the server-only `API_URL`, never from TMDB.
Stripe (planned) belongs to the backend.

It is a portfolio project, and its learning goals are part of the point: working with a large
database, seeding and handling large numbers of fake users, and working with Claude across a
long-running multi-session build. It is the largest project this author has taken on, so
**explain architectural reasoning rather than silently making large-scale decisions**. When a
choice is expensive to reverse, surface the trade-off instead of just picking one.

## Commands

- `npm run dev`: dev server on http://localhost:3000 (Turbopack, outputs to `.next/dev`)
- `npm run build` / `npm start`: production build / serve it
- `npm run lint`: bare `eslint` (`next lint` no longer exists)
- `npx tsc --noEmit`: type-check

## Essentials

- **Next.js 16.3.4, React 19.2.8, Cache Components on.** Request APIs (`params`,
  `searchParams`, `cookies()`, `headers()`) are Promises; `PageProps`/`LayoutProps` are global,
  never imported; no `dynamic`/`revalidate`/`fetchCache`/`dynamicParams` exports; an uncached
  `new Date()` fails the prerender; `revalidateTag` takes two arguments; middleware is
  `proxy.ts`. Details: `.claude/rules/nextjs.md`.
- **Mobile-first classes:** base = Mobile 390, `md:` = tablet tweaks, `lg:` = Laptop 1440,
  `2xl:` = Desktop 1920. Details: `.claude/rules/styling.md`.

## Where knowledge lives

- `.claude/rules/*.md` load automatically when you touch matching files: nextjs, styling,
  components, ui-primitives, carousel, data-fetching, browse and forms.
- `.claude/docs/` (read on demand):
  - `architecture.md`: before cross-cutting work, or to find where something lives.
  - `design.md`: before comparing with Figma (lists the deliberate deviations).
  - `state.md`: what's built, placeholders, what's missing, known issues.
- A change that moves or renames something a rule or doc names updates them in the same change.

## Refactor in progress (temporary)

The author is restructuring folders and removing most comments. Tag `pre-refactor` keeps the
commented code: when the reason behind something is unclear, read
`git show pre-refactor:<old path>` (map paths with
`git diff -M --name-status pre-refactor HEAD -- src`). Rule `paths:` and doc references may
lag; `.claude/docs/state.md` records the last sync.
