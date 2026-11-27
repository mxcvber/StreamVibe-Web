import type { Genre } from "@/data/genres"
import type { CarouselMustWatch, CarouselNewReleases, CarouselTopInGenres, CarouselTrendingNow } from "@/api/types"
import type { MustWatch, NewRelease, TrendingMovie } from "@/types/movie-carousel"
import { slugify } from "@/lib/slugify"
import { tmdbPosterUrl } from "@/lib/tmdb-image"
import { formatCount, formatReleaseDate, formatRuntime } from "./format"

const trendingViews: readonly number[] = [
  1_240_000, 986_000, 874_000, 812_000, 745_000, 690_000, 634_000, 581_000, 527_000, 476_000, 432_000, 389_000, 341_000,
  296_000, 254_000, 213_000, 178_000, 142_000, 96_000, 58_000,
]

export function toGenreTopCards(items: CarouselTopInGenres[]): Genre[] {
  return items.flatMap(({ id, name, movies }) => {
    const [a, b, c, d] = movies.map((movie) => tmdbPosterUrl(movie.posterPath))
    if (!d) return []

    return [{ id, slug: slugify(name), name, posters: [a, b, c, d] }]
  })
}

export function toTrendingMovies(items: CarouselTrendingNow[]): TrendingMovie[] {
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

export function toNewReleases(items: CarouselNewReleases[]): NewRelease[] {
  return items.map(({ id, title, posterPath, releaseDate }) => ({
    id,
    title,
    posterUrl: tmdbPosterUrl(posterPath, "w500"),
    releaseDate,
    releasedOn: formatReleaseDate(releaseDate),
  }))
}

export function toMustWatch(items: CarouselMustWatch[]): MustWatch[] {
  return items.map(({ id, title, posterPath, runtime, voteAverage, voteCount }) => ({
    id,
    title,
    posterUrl: tmdbPosterUrl(posterPath, "w780"),
    runtime: runtime === null ? null : formatRuntime(runtime),
    stars: Math.round(voteAverage) / 2,
    votes: formatCount(voteCount),
  }))
}
