import type { Genre } from "@/data/genres"
import type { GenreTopMovies, MustWatchMovie, NewReleaseMovie, PopularMovie } from "@/lib/api/types"
import { slugify } from "@/lib/slugify"
import { tmdbPosterUrl } from "@/lib/tmdb-image"
import { formatCount, formatReleaseDate, formatRuntime } from "./format"

const trendingViews: readonly number[] = [
  1_240_000, 986_000, 874_000, 812_000, 745_000, 690_000, 634_000, 581_000, 527_000, 476_000, 432_000, 389_000, 341_000,
  296_000, 254_000, 213_000, 178_000, 142_000, 96_000, 58_000,
]

/**
 * Maps the API's genres to the cards' `Genre` shape. The card's 2×2 mosaic
 * needs exactly four posters, so genres with fewer are left out.
 */
export function toGenreTopCards(items: GenreTopMovies[]): Genre[] {
  return items.flatMap(({ id, name, movies }) => {
    const [a, b, c, d] = movies.map((movie) => tmdbPosterUrl(movie.posterPath))
    if (!d) return []

    return [{ id, slug: slugify(name), name, posters: [a, b, c, d] }]
  })
}

/** What a "Trending Now" card renders. */
export type TrendingMovie = {
  id: number
  title: string
  posterUrl: string
  /** Formatted ("1h 30min", or "1h 30m" for narrow cards); null hides the runtime chip. */
  runtime: { long: string; short: string } | null
  /** Formatted ("986K"); null past the placeholder list hides the views chip. */
  views: string | null
}

/** What a "New Releases" card renders. */
export type NewRelease = {
  id: number
  title: string
  posterUrl: string
  /** "YYYY-MM-DD", for `<time dateTime>`. */
  releaseDate: string
  /** Formatted ("30 Sept 2026"). */
  releasedOn: string
}

/** What a "Must - Watch Movies" card renders. */
export type MustWatch = {
  id: number
  title: string
  posterUrl: string
  /** Formatted ("1h 57min"); null hides the runtime chip. */
  runtime: string | null
  /** 0–5 in halves: the 0–10 average rounded to a whole number, then halved. */
  stars: number
  /** Formatted ("20K"). */
  votes: string
}

/** Maps the API's popular movies to the cards' shape, keeping their order. */
export function toTrendingMovies(items: PopularMovie[]): TrendingMovie[] {
  return items.map(({ id, title, posterPath, runtime }, index) => {
    const views = trendingViews[index]

    return {
      id,
      title,
      posterUrl: tmdbPosterUrl(posterPath, "w500"),
      runtime: runtime === null ? null : { long: formatRuntime(runtime), short: formatRuntime(runtime, "short") },
      views: views === undefined ? null : formatCount(views),
    }
  })
}

/** Maps the API's new releases to the cards' shape, keeping their order. */
export function toNewReleases(items: NewReleaseMovie[]): NewRelease[] {
  return items.map(({ id, title, posterPath, releaseDate }) => ({
    id,
    title,
    // 244px at most (desktop), so 488px at 2×.
    posterUrl: tmdbPosterUrl(posterPath, "w500"),
    releaseDate,
    releasedOn: formatReleaseDate(releaseDate),
  }))
}

/** Maps the API's must-watch movies to the cards' shape, keeping their order. */
export function toMustWatch(items: MustWatchMovie[]): MustWatch[] {
  return items.map(({ id, title, posterPath, runtime, voteAverage, voteCount }) => ({
    id,
    title,
    posterUrl: tmdbPosterUrl(posterPath, "w780"),
    runtime: runtime === null ? null : formatRuntime(runtime),
    // Figma draws only full, half and empty stars, so 8.3 → 4 and 8.6 → 4.5.
    stars: Math.round(voteAverage) / 2,
    votes: formatCount(voteCount),
  }))
}
