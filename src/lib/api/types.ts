// Mirrors of the NestJS API's response DTOs (../api/src/**/dto). Keep in sync
// by hand until the API publishes generated types.

/** A movie reduced to what a poster tile needs. */
export type MoviePoster = {
  /** TMDB movie id. */
  id: number
  title: string
  /** TMDB image path ("/abc123.jpg"); build the URL with `tmdbPosterUrl`. */
  posterPath: string
}

/** A genre with its most popular movies, most popular first. */
export type GenreTopMovies = {
  /** TMDB genre id. */
  id: number
  name: string
  /** Up to four; empty for a genre with no movies. */
  movies: MoviePoster[]
}

/** GET /carousel/top-in-genres */
export type TopInGenresResponse = {
  items: GenreTopMovies[]
}
