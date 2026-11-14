import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import { api } from "@/lib/api/client"
import type {
  GenreTopMovies,
  MustWatchMovie,
  MustWatchResponse,
  NewReleaseMovie,
  NewReleasesResponse,
  PopularMovie,
  PopularMoviesResponse,
  TopInGenresResponse,
} from "@/lib/api/types"

export async function getTopInGenres(): Promise<GenreTopMovies[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("top-in-genres")

  const { data } = await api.get<TopInGenresResponse>("/carousel/top-in-genres")
  return data.items
}

// The 20 most popular movies, for the Movies page's "Trending Now" row.
export async function getPopularMovies(): Promise<PopularMovie[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("popular-movies")

  const { data } = await api.get<PopularMoviesResponse>("/carousel/popular")
  return data.items
}

/**
 * The 20 newest already-released movies, for the Movies page's "New Releases"
 * row. The API decides "today" per request, so with an hour-long cache a movie
 * joins the row within an hour of its release date;
 * `revalidateTag('new-releases', 'max')` refreshes it sooner.
 */
export async function getNewReleases(): Promise<NewReleaseMovie[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("new-releases")

  const { data } = await api.get<NewReleasesResponse>("/carousel/new-releases")
  return data.items
}

/**
 * The 20 highest-rated movies, for the Movies page's "Must - Watch Movies"
 * row. Ratings only move when the TMDB import runs, so it is cached like
 * `getPopularMovies`; `revalidateTag('must-watch', 'max')` refreshes it.
 */
export async function getMustWatchMovies(): Promise<MustWatchMovie[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("must-watch")

  const { data } = await api.get<MustWatchResponse>("/carousel/must-watch")
  return data.items
}
