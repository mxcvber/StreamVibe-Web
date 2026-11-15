import type { NewRelease } from "@/lib/to-movies"
import { MovieCardPoster } from "../movie-card-poster"
import { ReleaseDateChip } from "./release-date-chip"
import { Fragment } from "react"

interface NewReleaseMovieCardProps {
  movie: NewRelease
}

export function NewReleaseMovieCard({ movie }: NewReleaseMovieCardProps) {
  return (
    <Fragment>
      <MovieCardPoster src={movie.posterUrl} alt={movie.title} sizes='(min-width: 1536px) 244px, (min-width: 1024px) 192px, (min-width: 768px) 200px, 155px' className='aspect-[154.4/193] w-full rounded-md lg:aspect-192/230 2xl:aspect-[243.6/281] 2xl:rounded-lg' />
      <ReleaseDateChip date={movie.releaseDate} label={movie.releasedOn} />
    </Fragment>
  )
}
