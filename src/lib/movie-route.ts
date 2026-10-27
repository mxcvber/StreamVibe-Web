// The movie page's route, `/movies/[id]`, keyed by the TMDB movie id.

/** The largest id the API's Postgres `integer` column holds. */
const MAX_MOVIE_ID = 2_147_483_647

/** Where a movie card leads. */
export function movieHref(id: number) {
  return `/movies/${id}`
}

/**
 * The `[id]` segment as a TMDB movie id, or null for anything that can't be
 * one ("abc", "1.5", "-3"). Ids past the column's range are rejected here too:
 * the API would fail on them with a 500 rather than answer 404.
 */
export function parseMovieId(param: string): number | null {
  if (!/^\d+$/.test(param)) return null

  const id = Number(param)
  return id > 0 && id <= MAX_MOVIE_ID ? id : null
}
