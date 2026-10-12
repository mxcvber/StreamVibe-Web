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

/** A movie reduced to what a popular-carousel card needs. */
export type PopularMovie = {
  /** TMDB movie id. */
  id: number
  title: string
  /** TMDB image path ("/abc123.jpg"); build the URL with `tmdbPosterUrl`. */
  posterPath: string
  /** Minutes; null when TMDB had no runtime. */
  runtime: number | null
}

/** GET /carousel/popular */
export type PopularMoviesResponse = {
  /** The 20 most popular movies, most popular first. */
  items: PopularMovie[]
}

/** A movie reduced to what a new-releases card needs. */
export type NewReleaseMovie = {
  /** TMDB movie id. */
  id: number
  title: string
  /** TMDB image path ("/abc123.jpg"); build the URL with `tmdbPosterUrl`. */
  posterPath: string
  /** "YYYY-MM-DD" — a calendar date, so no timestamp to shift across time zones. */
  releaseDate: string
}

/** GET /carousel/new-releases */
export type NewReleasesResponse = {
  /** The 20 newest movies, newest first; already released only. */
  items: NewReleaseMovie[]
}

/** A movie reduced to what a must-watch card needs. */
export type MustWatchMovie = {
  /** TMDB movie id. */
  id: number
  title: string
  /** TMDB image path ("/abc123.jpg"); build the URL with `tmdbPosterUrl`. */
  posterPath: string
  /** Minutes; null when TMDB had no runtime. */
  runtime: number | null
  /** TMDB average, 0–10; halve it for the 5-star display. */
  voteAverage: number
  /** TMDB vote count, raw; abbreviate it ("20K") for display. */
  voteCount: number
}

/** GET /carousel/must-watch */
export type MustWatchResponse = {
  /** The 20 highest-rated movies, by weighted rating. */
  items: MustWatchMovie[]
}

/** A movie reduced to what a catalog grid card needs. */
export type MovieListItem = {
  /** TMDB movie id. */
  id: number
  title: string
  /** TMDB image path ("/abc123.jpg"); build the URL with `tmdbPosterUrl`. */
  posterPath: string
  /** "YYYY-MM-DD"; null when TMDB had no release date. */
  releaseDate: string | null
  /** TMDB average, 0–10; halve it for the 5-star display. */
  voteAverage: number
}

/** GET /movies?sort=&rating=&cursor= and GET /genres/:id/movies?cursor= */
export type MovieListResponse = {
  /** One page of the catalog: in the requested sort on /movies, newest first on a genre. */
  items: MovieListItem[]
  /** Pass as `cursor` to get the next page; null on the last page. */
  nextCursor: number | null
}
