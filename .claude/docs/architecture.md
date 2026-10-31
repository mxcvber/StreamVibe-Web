# Architecture

How the frontend fits together. It names symbols rather than paths, so search for any of them.
The folder layout is being reorganised; see "Where things live".

## Rendering model

- Next 16 with Cache Components. Every route prerenders a **static shell**. Data read at
  request time renders inside `<Suspense>` holes, with skeletons as fallbacks.
- Server components that read API data call `await connection()` first, so `next build` never
  calls the API.
- Data functions are cached per argument (`'use cache'` + `cacheLife('hours')` + `cacheTag`).
  Movie data changes only when the backend's TMDB import runs, so an hour is plenty;
  `revalidateTag(tag, 'max')` refreshes a tag on demand.

## Data flow

```
server component → await connection() → get*() ('use cache') → api (Axios, server-only)
  → NestJS /api/v1 → response DTO → to*() mapper → UI shape → cards
browser "Load more" → MovieGrid → bound Server Action (validates args) → the same get*()
```

Client components receive rendered output or plain data, never API access.

## Routes

| Route | Composition | Data → endpoint | Cache tag |
| --- | --- | --- | --- |
| `/` | `Hero`, `CategoriesSection`, `DevicesSection`, `FaqSection`, `PlansSection`, `FreeTrialBanner` | local only | — |
| `/movies` | `MoviesHero`, then `MoviesCatalog` in a `CatalogBox`: `GenresRow` (local), `TopGenresRow`, `TrendingRow`, `NewReleasesRow`, `MustWatchRow` | `getTopInGenres` → `/carousel/top-in-genres`, `getPopularMovies` → `/carousel/popular`, `getNewReleases` → `/carousel/new-releases`, `getMustWatchMovies` → `/carousel/must-watch` | `top-in-genres`, `popular-movies`, `new-releases`, `must-watch` |
| `/movies/all` | `MoviesHero`, `CatalogBox` > `MovieBrowser` (reads `searchParams`): `CatalogToolbar` over `AllMovies` → `MovieGrid` | `getMovies` → `/movies?sort&rating&cursor`, paged by `loadMoreMovies` | `movies` |
| `/movies/genres/[slug]` | `MoviesHero`, `CatalogBox` > `GenreMovies` → `MovieGrid` | `getGenreMovies` → `/movies/:id/genre?cursor`, paged by `loadMoreGenreMovies` | `genre-movies` |
| `/movies/genres/[slug]/top-10` | `MoviesHero`, `CatalogBox` > `TopTenMovies` | `getGenreTopTenMovies` → `/movies/:id/genre/top-10` | `genre-top-10` |
| `/movies/[id]` | `MovieDetailHero` (awaits `params` inside Suspense); `generateMetadata` sets the title | `getMovie` → `/movies/:id` (404 → `null` → `notFound()`) | `movie-detail` |
| `/support` | `ContactSection` (`ContactForm` → `sendSupportMessage`), `FaqSection`, `FreeTrialBanner` | none yet | — |
| `/subscriptions` | `PlansSection`, `PlanComparisonSection` (`PlanComparisonTable` from `lg`, `PlanComparisonTabs` below), `FreeTrialBanner` | local only | — |

- A genre slug resolves through `findGenre` (the local `genres` table) to the TMDB genre id the
  API expects. The API doesn't return genre names.
- The root layout is `SiteHeader` (floating over the page), `<main>` and `SiteFooter`.
  `MoviesLayout` only sets the title template.

## Client boundary

`'use client'` sits only where it's needed:
- carousels: `Carousel`, `RowCarousel`, `HeroCarousel`, `CarouselProgress`, and the autoplay and
  reduced-motion hooks
- `MovieGrid`, `CatalogToolbar`, `MainNav`, `MobileNav`
- `ContactForm` and its fields
- the Radix-based primitives

Every card is a server component.

## Building blocks

- Layout: `Container`, `SiteHeader`, `SiteFooter`, `SectionHeading`.
- Carousels: `RowCarousel` is the shell for `GenreCarousel`, `TopGenresCarousel` and `MovieRow`.
  `HeroCarousel` is separate.
- Cards: `GenreCard` and `TopGenresCard` (the "Top 10 In" card) render only their media and
  footer. Their carousels wrap each in `CardWrapper` (the `Link` and `Card`, with the hover
  border and focus ring) and set its padding and `href`. `TrendingMovieCard`,
  `NewReleaseMovieCard`, `MustWatchMovieCard` and `CatalogMovieCard` share `MovieCardLink`,
  `MovieCardPoster`, `MovieChip`, `RatingChip`, `ReleaseDateChip` and `StarRating`.
- Backdrops: `PosterMosaic`. `Hero`, `FreeTrialBanner` and `ContactPosterBox` fill it with local
  art from `posterMosaic(rows, columns)`. The genre cards pass their genre's four posters cast
  to `PosterSrc`: local art in `GenreCard`, TMDB URLs in `TopGenresCard`.
- Lists: `MovieGrid` (paged), `TopTenMovies` (fixed), both laid out by `movieGridClassName`.
- Frames and messages: `CatalogBox`, `CatalogRowHeading`, `CatalogRowMessage`, `BrowseMessage`,
  `MovieHeroFrame`.
- Skeletons: `MovieRowSkeleton` (wrapped per row), `TopGenresRowSkeleton`, `MovieGridSkeleton`,
  `MovieBrowserFallback`, `MovieDetailHeroSkeleton`.

## Local data

- Real, or copy from the design: `genres` (TMDB ids, slugs and names; routing depends on
  them), `siteConfig` (nav and footer), `plans` and `planFeatures`, `faq` questions, `devices`,
  `countries`.
- `genres` lists all 19 TMDB movie genres. The first five (Action, Adventure, Comedy, Drama,
  Horror) are Figma's first carousel page with its exact posters, and the rest follow
  alphabetically with posters picked loosely from the same pool. Keep that order.
- Placeholders until the API provides them: `featuredMovies` (the Movies hero),
  `trendingViews`, the poster art from `poster()` and `posterMosaic()`, yearly prices and FAQ
  answers 2–7. See `state.md`.
- The poster art is 54 Figma exports (`poster-01…54.webp`). 01–36 are the hero mosaic in
  Figma's order, nine to a row, and 37–54 appear only in genre cards. `posterMosaic` numbers
  tiles row by row from 01, so only nine columns reproduce the hero's rows.

## Patterns

- **Variants files.** The movie cards' per-variant class strings, sizes and carousel options
  live in `movie-variants.ts` (the browse grid's in `browse-variants.ts`), typed
  `satisfies Record<Variant, …>`. A missing variant is a type error, and server skeletons can
  import the maps because the files have no `'use client'`. The genre cards don't use one:
  `GenreCard` and `TopGenresCard` are separate components with literal classes.
- **`to*` mappers.** Plain functions turn an API DTO into a UI shape (`toTrendingMovies`,
  `toCatalogMovies`). Components never format API data, and data functions never shape it
  for the UI.
- **Generic server row.** `MovieRow<TItem, TMovie>` takes `load`, `toMovies` and `renderCard`
  and owns every movie row's loading, error and empty states. Function props are allowed
  because it is a server component; only the rendered cards reach the client.
- **Bound Server Action.** The server parent binds the list's arguments
  (`loadMoreMovies.bind(null, filters)`). `MovieGrid` only knows `loadMoreAction(cursor)`, so one
  grid serves every list.
- **URL as state.** Filters live in the query string. `CatalogToolbar` pushes them,
  `useOptimistic` shows the press at once, and a keyed `<Suspense>` remounts the grid.
- **Embla as an external store.** Carousel state is read with `useSyncExternalStore` instead
  of being copied into React state from effects.
- **Container queries.** Cards are `@container`, so chips compact by card width, not
  viewport width.
- **Caller-set CSS variables.** `PosterMosaic` reads `--mosaic-gap`, which the caller sets once.
- **Pseudo-element hit areas.** `before:` and `after:` insets enlarge tap targets without
  moving the layout.
- **`box-content` container.** `Container` keeps 1596px of content with the gutters outside
  it, so the desktop gutter falls out of centring.

## Where things live

Being reorganised. Settled so far:
- Every page except home is in the route group `src/app/(pages)/`, which URLs don't include.
  Home stays at `src/app/page.tsx` beside the root layout and `globals.css`. A route's Server
  Actions sit beside it as `actions.ts`.
- Local data and the site config are in `src/data/` (`siteConfig` in `site-config.ts`).
  `src/config/` is gone.
- A type that other modules import goes in `src/types/`, so far one file per module, named
  after it (`NavLink` and `FooterColumn` in `site-config.ts`). A type used only in its own file
  stays there and isn't exported (`SocialLink`). `Genre`, `MoviesPage`, `MovieFilters` and the
  API response types still sit beside their code because the refactor hasn't reached them.
- `src/components/shared/` holds `Container` and `CardWrapper` at its root, the header
  (`SiteHeader`, `MainNav`, `MobileNav`) in `header/`, the footer (`SiteFooter`,
  `FooterLinkColumn`, `CopyrightYear`) in `footer/`, `RowCarousel` and `CarouselProgress` in
  `row-carousel/`, `GenreCarousel` and `GenreCard` in `genre-carousel/`, and the shadcn
  primitives in `ui/`, where `components.json` points the CLI. They came from
  `src/components/layout/`, `src/components/ui/`, `src/components/carousel/` and
  `src/components/genres/`. `CardWrapper` is the link and card the old `GenreCard` drew itself.
- The "Top 10 In" genre carousel sits with its only row in `src/components/movies/catalog/`
  (`TopGenresCarousel`, `TopGenresCard`). `genre-variants.ts` is gone: its values are literal
  classes in the two genre carousels, their cards and `TopGenresRowSkeleton`.
- `src/components/home/` holds `Hero`, `CategoriesSection` and `SectionHeading` at its root; the
  other home sections are still in subfolders. `CategoriesSection` came from
  `src/components/home/categories/`, and `SectionHeading` (also used by `PlanComparisonSection`)
  from `src/components/layout/`.
- `PosterMosaic` is in `src/components/shared/`, `poster()` and `posterMosaic()` in
  `src/lib/poster-mosaic.ts`, and `PosterSrc` in `src/types/poster-mosaic.ts`. They came from
  `src/components/home/hero/` and `src/data/posters.ts`, where `heroPosterRows` is now
  `posterMosaic(4, 9)`. `HeroPlayGraphic` came from `src/components/icons/abstract-design.tsx`.
- `findGenre` is in `src/lib/find-genre.ts`, split out of `src/data/genres.ts`, which keeps
  `genres` and `Genre`.

Until this section is complete, map old paths to new ones with
`git diff -M --name-status pre-refactor HEAD -- src`.
