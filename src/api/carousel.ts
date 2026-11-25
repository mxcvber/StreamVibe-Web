import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import { api } from "@/api/client"
import type { CarouselMustWatch, CarouselNewReleases, CarouselTopInGenres, CarouselTrendingNow } from "@/api/types"

export async function getTopInGenres(): Promise<CarouselTopInGenres[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("top-in-genres")

  const { data } = await api.get<CarouselTopInGenres[]>("/carousel/top-in-genres")
  return data
}

// The 20 trending now movies, for the Movies page's "Trending Now" row.
export async function getTrendingNowMovies(): Promise<CarouselTrendingNow[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("trending-now")

  const { data } = await api.get<CarouselTrendingNow[]>("/carousel/trending-now")
  return data
}

// The 20 newest already-released movies, for the Movies page's "New Releases" row.
export async function getNewReleases(): Promise<CarouselNewReleases[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("new-releases")

  const { data } = await api.get<CarouselNewReleases[]>("/carousel/new-releases")
  return data
}

// The 16 highest-rated movies, for the Movies page's "Must - Watch Movies" row.
export async function getMustWatchMovies(): Promise<CarouselMustWatch[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("must-watch")

  const { data } = await api.get<CarouselMustWatch[]>("/carousel/must-watch")
  return data
}
