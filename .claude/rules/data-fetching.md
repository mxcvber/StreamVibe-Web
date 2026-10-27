---
paths:
  - src/lib/**
  - src/components/**
  - src/app/**
---

# Data fetching

The frontend reads from the StreamVibe NestJS API (`../api`), never from TMDB directly. The
project uses **Cache Components** (`cacheComponents: true` in `next.config.ts`).

## The API client

- Every call goes through the shared Axios instance `api`. Use `fetch` only after explaining why.
- `API_URL` (from `web/.env`, including `/api/v1`) is server-only. Never prefix it with
  `NEXT_PUBLIC_`, and import API modules only from server code. They start with
  `import 'server-only'`.
- `api` checks `API_URL` in a request interceptor, not at import, so a build without it passes.
- Response types mirror the API's DTOs (`MovieDetail`, `MovieListResponse`, …). Keep them in
  sync with `../api/src/**/dto` by hand.

## Data functions

One module per API area. Each exported function:

```ts
export async function getTopInGenres(): Promise<GenreTopMovies[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('top-in-genres')

  const { data } = await api.get<TopInGenresResponse>('/carousel/top-in-genres')
  return data.items
}
```

- Always pair `'use cache'` with a `cacheLife` profile and a `cacheTag`. On-demand refresh is
  `revalidateTag(tag, 'max')`. The arguments are part of the cache key.
- Return plain data (`response.data`), never the Axios response. Cached values are serialized.
- `getMovie` returns `null` on a 404 so the page can call `notFound()`. The null is cached like
  a movie; any other failure throws.
- Map API shapes to UI shapes in a separate `to*` helper (`toGenreCards`), not inside the data
  function or the component. Stars are `Math.round(voteAverage) / 2` (Figma draws only full,
  half and empty stars), and dates format with `timeZone: 'UTC'`.
- Posters are TMDB paths. Build URLs with `tmdbPosterUrl` or `tmdbBackdropUrl`, at the smallest
  size that covers the tile at 2× DPR.

## Components that read API data

- The async server component calls `await connection()` before reading. Then `next build`
  never calls the API, and a failed request is never baked into the prerendered page.
- Render it inside `<Suspense>` with a skeleton sized like the loaded content. Pass `params`
  or `searchParams` down unawaited and await them inside the boundary.
- Catch request errors in the component. Log them with `console.error`, and render the row's
  heading with a short inline message so the rest of the page still works. Map inside the
  `try` too, so a malformed item shows the message instead of failing the page.
- `notFound()` throws: call it outside the `try`, or the `catch` swallows it.
- Rows of movie cards go through `MovieRow`: add the variant to `movie-variants.ts` and pass
  `load`, `toMovies` and `renderCard`. Reference implementation: `TopGenresRow`.
- Parse URL input before it reaches the API. `parseMovieFilters` falls back to the defaults
  (the API would answer 400), and `parseMovieId` rejects anything but a positive Postgres
  `integer` (the API would answer 500).
- Paging, Server Actions and grids: `browse.md`.
