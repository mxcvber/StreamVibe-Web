# State

**Docs synced to:** `bb937b5` (2026-10-27). To see what changed since:
`git log --oneline bb937b5..HEAD` and `git diff -M --stat bb937b5 HEAD -- src`.

## Refactor

The author is restructuring folders and removing most comments, with no change in behaviour.
The tag `pre-refactor` (= `bb937b5`) keeps the commented code. Commit moves and renames
separately from content edits, so git keeps detecting renames.

When it's done, sync the docs:
1. Map old paths to new with `git diff -M --name-status pre-refactor HEAD -- src`.
2. Re-scope each rule's `paths:` and check every glob still matches
   (`git ls-files ':(glob)<glob>'`). Keep `(…)` and `[…]` out of globs
   (`src/app/**/movies/all/**`, not `src/app/(pages)/movies/all/**`). Some glob libraries read
   them as syntax, and git treats parentheses literally, so this check can't tell.
3. Check every backticked symbol in `.claude/rules/` and `.claude/docs/` still exists; fix
   renames.
4. Re-check the rules' landmines against the new code.
5. Write "Where things live" in `architecture.md`, and update the paths in Claude's memory.
6. Update "Docs synced to", and remove the refactor notice from `CLAUDE.md`.

## Built

`/`, `/movies`, `/movies/all`, `/movies/genres/[slug]`, `/movies/genres/[slug]/top-10`,
`/movies/[id]` (hero only), `/support` and `/subscriptions`.

## Placeholders waiting on the backend

- `featuredMovies` (the Movies hero) uses local backdrops and copy. Its Play Now links to
  `/movies/<slug>`, which 404s because the movie route takes TMDB ids. It needs a featured
  endpoint.
- `trendingViews` holds fixed view counts until plays are tracked.
- The genre cards on the home page and in "Our Genres" use local poster art. "Popular Top 10 In
  Genres" already uses the API.
- `sendSupportMessage` validates the message and then discards it, because the API has no
  support endpoint yet.
- Inert buttons: Play Now and the bookmark on the movie page; watchlist, like and sound on the
  Movies hero; search and notifications in the header.
- Yearly plan prices (ten months' price) and FAQ answers 2–7.

## Not built yet

Seen in the code or in Figma; StreamVibe is movies only, so the Figma Shows pages are out of
scope (`design.md`). The order is the author's call. The backend schema already models users,
reviews, watchlist items, plans and subscriptions, but the API serves only the carousel and
movie endpoints so far.
- Movie page sections: description, cast, reviews and details. `getMovie` already returns
  everything but reviews (cast, crew, genres, budget, revenue, ratings).
- Auth (`proxy.ts`), subscriptions with Stripe (owned by the backend), search and
  notifications.

## Known issues

- The footer links `/movies#genres`, `#trending`, `#new-releases` and `#popular` have no
  matching ids on the Movies page.
- `/terms`, `/privacy` and `/cookies` (linked from the footer) return 404.
- The plan cards and the free-trial banner link to `/subscriptions?plan=…&trial=true`, and
  the page ignores both parameters.
- `MainNav` and `MobileNav` call `usePathname()` outside `<Suspense>`, which forces the
  `generateStaticParams` + `instant = false` workaround on dynamic routes (`nextjs.md`).
  Wrapping both navs in `<Suspense>` with a fallback that has no active item would fix it, but
  it changes the header on every page. Undecided.
- `HeroSlide` and `MovieDetailHero` still pass next/image's `priority`, deprecated in Next 16.
  The home `Hero` already uses `loading='eager'`.
