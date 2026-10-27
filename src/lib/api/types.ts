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

/** GET /movies?sort=&rating=&cursor= and GET /movies/:id/genre?cursor= */
export type MovieListResponse = {
  /** One page of the catalog: in the requested sort on /movies, newest first on a genre. */
  items: MovieListItem[]
  /** Pass as `cursor` to get the next page; null on the last page. */
  nextCursor: number | null
}

/** A movie reduced to what a top-10 grid card needs. */
export type TopTenMovie = {
  /** TMDB movie id. */
  id: number
  title: string
  /** TMDB image path ("/abc123.jpg"); build the URL with `tmdbPosterUrl`. */
  posterPath: string
  /** TMDB average, 0–10; halve it for the 5-star display. */
  voteAverage: number
}

/** GET /movies/:id/genre/top-10 */
export type TopTenMoviesResponse = {
  /** The genre's 10 most popular movies, most popular first. */
  items: TopTenMovie[]
}

/** A genre chip on the movie page; its id links to the genre's movies. */
export type GenreTag = {
  /** TMDB genre id. */
  id: number
  name: string
}

/** Shared base of a cast and a crew card: the person the credit is for. */
export type CreditPerson = {
  /** TMDB person id. */
  id: number
  name: string
  /** TMDB image path; null when TMDB has no photo. */
  profilePath: string | null
}

export type CastMember = CreditPerson & {
  /** The role; null when TMDB names none. */
  character: string | null
}

export type CrewMember = CreditPerson & {
  /** This person's key jobs on the movie, highest-ranked first. */
  jobs: string[]
}

/** GET /movies/:id — everything the movie page shows except its reviews. */
export type MovieDetail = {
  /** TMDB movie id. */
  id: number
  title: string
  tagline: string | null
  overview: string | null
  /** TMDB image path ("/abc123.jpg"); build the URL with `tmdbPosterUrl`. */
  posterPath: string
  /** Landscape hero image; null for a few movies — use the poster then. */
  backdropPath: string | null
  /** YouTube video id of the trailer. */
  trailerKey: string
  /** "YYYY-MM-DD"; null when TMDB had no release date. */
  releaseDate: string | null
  /** Minutes; null when unknown. */
  runtime: number | null
  /** Null when unknown, as is revenue. */
  budget: number | null
  revenue: number | null
  homepage: string | null
  /** ISO 3166-1 codes, e.g. "IN". */
  originCountry: string[]
  /** TMDB average, 0–10; halve it for the 5-star display. */
  voteAverage: number
  /** StreamVibe review average, 1–5; null until the movie has a review. */
  streamVibeRating: number | null
  reviewCount: number
  /** By name. */
  genres: GenreTag[]
  /** Top-billed, lead first. */
  cast: CastMember[]
  /** Key jobs only, one entry per person. */
  crew: CrewMember[]
}
