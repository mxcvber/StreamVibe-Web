/**
 * The "All Movies" page's sort and rating filter, as the URL carries them
 * (`/movies/all?sort=top-rated&rating=4`) and the API's `GET /movies` takes
 * them. Not server-only: the client toolbar builds URLs with it too.
 */

/** The `sort` values the API accepts (../api/src/movies/movie-sort.ts). */
export const MOVIE_SORTS = ['popular', 'top-rated', 'newest'] as const

export type MovieSort = (typeof MOVIE_SORTS)[number]

export const DEFAULT_MOVIE_SORT: MovieSort = 'popular'

/** The `rating` values the API accepts: N matches cards showing N or N.5 stars. */
export const MOVIE_RATINGS = [1, 2, 3, 4, 5] as const

export type MovieRating = (typeof MOVIE_RATINGS)[number]

export type MovieFilters = {
  sort: MovieSort
  /** Null shows every rating. */
  rating: MovieRating | null
}

type SearchParams = Record<string, string | string[] | undefined>

function isMovieSort(value: unknown): value is MovieSort {
  return MOVIE_SORTS.includes(value as MovieSort)
}

function isMovieRating(value: unknown): value is MovieRating {
  return MOVIE_RATINGS.includes(value as MovieRating)
}

/**
 * The filters in a page's searchParams. An unknown sort falls back to the
 * default and an invalid rating to none, so a hand-edited URL never sends the
 * API a value it would reject with a 400.
 */
export function parseMovieFilters(params: SearchParams): MovieFilters {
  const sort = params.sort
  const rating = Number(params.rating)

  return {
    sort: isMovieSort(sort) ? sort : DEFAULT_MOVIE_SORT,
    rating: isMovieRating(rating) ? rating : null,
  }
}

/**
 * The query string for `filters` ("?sort=top-rated&rating=4"), leaving out
 * the defaults so the unfiltered page stays at a plain `/movies/all`. Also
 * keys the grid's <Suspense>, so a change of filters shows its skeleton.
 */
export function movieFiltersSearch({ sort, rating }: MovieFilters) {
  const params = new URLSearchParams()
  if (sort !== DEFAULT_MOVIE_SORT) params.set('sort', sort)
  if (rating !== null) params.set('rating', String(rating))

  const search = params.toString()
  return search ? `?${search}` : ''
}

/** Whether a Server Action argument really is a `MovieFilters`. */
export function isMovieFilters(value: unknown): value is MovieFilters {
  if (typeof value !== 'object' || value === null) return false

  const { sort, rating } = value as Record<string, unknown>
  return isMovieSort(sort) && (rating === null || isMovieRating(rating))
}
