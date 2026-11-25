// The movie page's route, `/movies/[id]`, keyed by the TMDB movie id.

/** The largest id the API's Postgres `integer` column holds. */
const MAX_MOVIE_ID = 2_147_483_647

/**
 * The `[id]` segment as a TMDB movie id, or null for anything that can't be
 * one ("abc", "1.5", "-3"). Ids past the column's range are rejected here too:
 * the API answers them with a 400, which would show the load error rather than
 * the not-found page.
 */
export function parseMovieId(param: string): number | null {
  if (!/^\d+$/.test(param)) return null

  const id = Number(param)
  return id > 0 && id <= MAX_MOVIE_ID ? id : null
}
