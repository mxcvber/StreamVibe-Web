// The API's response types, generated from its OpenAPI document into
// schema.d.ts: run `npm run api:types` after ../api/openapi.json changes, and
// never edit schema.d.ts by hand. Each alias is its schema's name without `Dto`.

import type { components } from "@/api/schema"

type Schema = components["schemas"]

// ------------------------------- common ------------------------------- //

/** A movie reduced to what a poster tile needs. */
export type MoviePoster = Schema["MoviePosterDto"]

// ------------------------------- carousel ------------------------------- //

export type CarouselTopInGenres = Schema["CarouselTopInGenresDto"]

export type CarouselTrendingNow = Schema["CarouselTrendingNowDto"]

export type CarouselNewReleases = Schema["CarouselNewReleasesDto"]

export type CarouselMustWatch = Schema["CarouselMustWatchDto"]

// ------------------------------- movie ------------------------------- //

export type MovieList = Schema["MovieListDto"]
export type MovieListItem = Schema["MovieListItemDto"]

export type MovieDetail = Schema["MovieDetailDto"]
export type CastMember = Schema["CastMemberDto"]
export type CrewMember = Schema["CrewMemberDto"]
export type GenreTag = Schema["GenreTagDto"]

export type TopTenMovie = Schema["TopTenMovieDto"]
