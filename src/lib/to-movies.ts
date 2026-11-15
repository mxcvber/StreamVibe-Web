import type { Genre } from "@/data/genres"
import type { GenreTopMovies, NewReleaseMovie, PopularMovie } from "@/lib/api/types"
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
    posterUrl: tmdbPosterUrl(posterPath, 'w500'),
    releaseDate,
    releasedOn: formatReleaseDate(releaseDate),
  }))
}
