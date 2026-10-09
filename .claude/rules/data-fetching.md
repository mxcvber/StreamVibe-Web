---
paths:
  - src/lib/api/**
  - src/components/**
  - src/app/**
---

# Data fetching

The frontend reads from the StreamVibe NestJS API (`../api`), never from TMDB directly. The
project uses **Cache Components** (`cacheComponents: true` in `next.config.ts`).

## The API client

- Every call goes through the shared Axios instance in `src/lib/api/client.ts`. Use `fetch`
  only after explaining why.
- `API_URL` (from `web/.env`, including `/api/v1`) is server-only. Never prefix it with
  `NEXT_PUBLIC_`, and import API modules only from server code. They start with
  `import 'server-only'`.
- Response types mirror the API's DTOs in `src/lib/api/types.ts`. Keep them in sync with
  `../api/src/**/dto` by hand.

## Data functions

One module per API area in `src/lib/api/` (e.g. `carousel.ts`). Each exported function:

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
  `revalidateTag(tag, 'max')`, and the second argument is required in Next 16.
- Return plain data (`response.data`), never the Axios response. Cached values are serialized.
- Map API shapes to UI shapes in a separate `src/lib/*.ts` helper (e.g. `toGenreCards`), not
  inside the data function or the component.

## Components that read API data

- The async server component calls `await connection()` before reading. Then `next build`
  never calls the API, and a failed request is never baked into the prerendered page. Requests
  are still served from the data function's cache.
- Render it inside `<Suspense>` with a skeleton composed from `@/components/ui/skeleton`, sized
  like the loaded content so nothing shifts.
- Catch request errors in the component. Log them with `console.error`, and render the row's
  heading with a short inline message so the rest of the page still works.
- Map API data to UI shapes inside the `try` too, so a malformed item shows the inline message
  instead of failing the page.
- Rows of movie cards go through `MovieRow` (`src/components/movies/catalog/movie-row.tsx`):
  add the variant to `movie-variants.ts` and pass `load`, `toMovies` and `renderCard`.
- Posters are TMDB paths. Build URLs with `tmdbPosterUrl` (`src/lib/tmdb-image.ts`).
  `image.tmdb.org` is allowed in `images.remotePatterns`.

Reference implementation: `src/components/movies/catalog/top-genres-row.tsx`.
