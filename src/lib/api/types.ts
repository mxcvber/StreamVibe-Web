// The API's response types, generated from its OpenAPI document into
// schema.d.ts: run `npm run api:types` after ../api/openapi.json changes, and
// never edit schema.d.ts by hand. These aliases keep the names the app imports;
// the field docs are on the generated types.

import type { components } from "@/lib/api/schema"

type Schema = components["schemas"]

/** A movie reduced to what a poster tile needs. */
export type MoviePoster = Schema["MoviePosterDto"]

/** A genre with its most popular movies, most popular first. */
export type GenreTopMovies = Schema["GenreDto"]

/** GET /carousel/top-in-genres */
export type TopInGenresResponse = Schema["TopInGenresDto"]

export type PopularMovie = Schema["PopularMovieDto"]

/** GET /carousel/popular */
export type PopularMoviesResponse = Schema["PopularMoviesDto"]

export type NewReleaseMovie = Schema["NewReleaseMovieDto"]

/** GET /carousel/new-releases */
export type NewReleasesResponse = Schema["NewReleasesDto"]

export type MustWatchMovie = Schema["MustWatchMovieDto"]

/** GET /carousel/must-watch */
export type MustWatchResponse = Schema["MustWatchMoviesDto"]

export type MovieListItem = Schema["MovieListItemDto"]

/** GET /movies?sort=&rating=&cursor= and GET /movies/:id/genre?cursor= */
export type MovieListResponse = Schema["MovieListDto"]

export type TopTenMovie = Schema["TopTenMovieDto"]

/** GET /movies/:id/genre/top-10 */
export type TopTenMoviesResponse = Schema["TopTenMoviesDto"]

/** A genre chip on the movie page; its id links to the genre's movies. */
export type GenreTag = Schema["GenreTagDto"]

export type CastMember = Schema["CastMemberDto"]

export type CrewMember = Schema["CrewMemberDto"]

/** GET /movies/:id — everything the movie page shows except its reviews. */
export type MovieDetail = Schema["MovieDetailDto"]
