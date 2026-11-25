// The API's response types, generated from its OpenAPI document into
// schema.d.ts: run `npm run api:types` after ../api/openapi.json changes, and
// never edit schema.d.ts by hand. Each alias is its schema's name without `Dto`.

import type { components } from "@/api/schema"

type Schema = components["schemas"]

/** A movie reduced to what a poster tile needs. */
export type MoviePoster = Schema["MoviePosterDto"]

/** A genre with its most popular movies, most popular first. */
export type CarouselTopInGenres = Schema["CarouselTopInGenresDto"]

export type CarouselTrendingNow = Schema["CarouselTrendingNowDto"]

export type CarouselNewReleases = Schema["CarouselNewReleasesDto"]

export type CarouselMustWatch = Schema["CarouselMustWatchDto"]

export type MovieListItem = Schema["MovieListItemDto"]

/** GET /movies?sort=&rating=&cursor= and GET /movies/:id/genre?cursor= */
export type MovieList = Schema["MovieListDto"]

export type TopTenMovie = Schema["TopTenMovieDto"]

/** A genre chip on the movie page; its id links to the genre's movies. */
export type GenreTag = Schema["GenreTagDto"]

export type CastMember = Schema["CastMemberDto"]

export type CrewMember = Schema["CrewMemberDto"]

/** GET /movies/:id — everything the movie page shows except its reviews. */
export type MovieDetail = Schema["MovieDetailDto"]
