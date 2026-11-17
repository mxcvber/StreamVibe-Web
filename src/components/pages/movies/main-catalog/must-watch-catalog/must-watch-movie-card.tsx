import { ClockIcon } from "@/components/icons/clock"
import { MustWatch } from "@/lib/to-movies"
import { MovieCardPoster } from "../movie-card-poster"
import { MovieChip } from "../movie-chip"
import { RatingChip } from "./rating-chip"
import { Fragment } from "react"

interface MustWatchMovieCardProps {
  movie: MustWatch
}

export function MustWatchMovieCard({ movie }: MustWatchMovieCardProps) {
  return (
    <Fragment>
      <MovieCardPoster
        src={movie.posterUrl}
        alt={movie.title}
        sizes="(min-width: 1536px) 319px, (min-width: 1280px) 277px, (min-width: 1024px) 301px, (min-width: 768px) 261px, 207px"
        className="aspect-207/235 rounded-md lg:aspect-253/324 2xl:aspect-319.5/404 2xl:rounded-lg"
      />

      <div className="flex items-center gap-0.5">
        {movie.runtime && (
          <MovieChip
            icon={<ClockIcon />}
            srLabel="Runtime"
            className="min-h-8 py-1.25 pr-2.25 pl-1.25 2xl:@max-[261px]:pl-2.25 lg:@max-[212px]:pl-2.25 2xl:@max-[261px]:[&_svg]:hidden lg:@max-[212px]:[&_svg]:hidden"
          >
            {movie.runtime}
          </MovieChip>
        )}

        <RatingChip stars={movie.stars} votes={movie.votes} className="ml-auto" />
      </div>
    </Fragment>
  )
}
