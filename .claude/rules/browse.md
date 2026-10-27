---
paths:
  - src/components/movies/browse/**
  - src/app/movies/all/**
  - src/app/movies/genres/**
  - src/lib/movie-filters.ts
  - src/lib/catalog-movies.ts
---

# Browse grids

"All Movies", a genre's page and a genre's top 10.

- Paging from the browser goes through a Server Action that calls the cached data function and
  returns UI-shaped data (`loadMoreMovies`, `loadMoreGenreMovies`). The browser never gets
  `API_URL`. Anyone can POST to an action, so it validates its arguments: known filters or a
  known genre id, and a positive safe-integer cursor.
- Paginated grids go through `MovieGrid`. The server parent passes the first page and the action
  bound to the list's arguments as `loadMoreAction` (`loadMoreGenreMovies.bind(null, genre.id)`),
  so a new list needs no new grid.
- A fixed list (a genre's top 10) skips `MovieGrid`: `TopTenMovies` renders `CatalogMovieCard`s
  in `movieGridClassName` itself, with no client JavaScript.
- In `MovieGrid`, state set after an `await` needs its own `startTransition`. Appended pages are
  de-duplicated by id, since a cache refresh can move a movie across a page boundary. A failed
  page keeps the loaded cards and turns the button into a retry.
- On "All Movies" the grid's `<Suspense>` is keyed by `movieFiltersSearch(filters)`, so a filter
  change shows the skeleton and restarts at page one. `CatalogToolbar` pushes the filters into
  the URL with `scroll: false` (Back undoes them, links can be shared) and shows the press at
  once with `useOptimistic`. Pressing the active sort does nothing; pressing the active rating
  clears it.
- `movie-filters.ts` is shared with the client toolbar, so it isn't `server-only`.
  `movieFiltersSearch` leaves out the defaults, so the unfiltered page stays `/movies/all`.
