/** What a "Trending Now" card renders. */
export type TrendingMovie = {
  id: number
  title: string
  posterUrl: string
  runtime: { long: string; short: string } | null
  views: string | null
}

/** What a "New Releases" card renders. */
export type NewRelease = {
  id: number
  title: string
  posterUrl: string
  releaseDate: string
  releasedOn: string
}

/** What a "Must - Watch Movies" card renders. */
export type MustWatch = {
  id: number
  title: string
  posterUrl: string
  runtime: string | null
  stars: number
  votes: string
}
