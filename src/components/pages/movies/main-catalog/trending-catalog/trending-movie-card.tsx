import { ClockIcon } from "@/components/icons/clock"
import { EyeIcon } from "@/components/icons/eye"
import { TrendingMovie } from "@/lib/to-movies"
import { Fragment } from "react"
import { MovieCardPoster } from "../movie-card-poster"
import { MovieChip } from "../movie-chip"

interface TrendingMovieCardProps {
  movie: TrendingMovie
}

export function TrendingMovieCard({ movie }: TrendingMovieCardProps) {
  return (
    <Fragment>
      <MovieCardPoster
        src={movie.posterUrl}
        alt={movie.title}
        sizes="(min-width: 1536px) 244px, (min-width: 1024px) 192px, (min-width: 768px) 200px, 158px"
        className="aspect-[157.6/195] rounded-md lg:aspect-192/232 2xl:aspect-[243.6/281] 2xl:rounded-lg"
      />

      <div className="flex items-center gap-1">
        {movie.runtime && (
          <MovieChip
            icon={<ClockIcon />}
            srLabel="Runtime"
            className="2xl:@max-[197px]:pr-1.25 @max-[154px]:pr-1.25 @max-[154px]:pl-1.25 2xl:@max-[197px]:[&_svg]:hidden @max-[154px]:[&_svg]:hidden"
          >
            <span className="2xl:@max-[197px]:hidden @max-[154px]:hidden">{movie.runtime.long}</span>
            <span className="hidden 2xl:@max-[197px]:inline @max-[154px]:inline">{movie.runtime.short}</span>
          </MovieChip>
        )}

        {movie.views && (
          // ml-auto keeps it right-aligned when there is no runtime chip.
          <MovieChip
            icon={<EyeIcon />}
            srLabel="Views"
            className="ml-auto 2xl:@max-[197px]:pr-1.25 @max-[154px]:pr-1.25 @max-[154px]:pl-1.25 2xl:@max-[197px]:[&_svg]:hidden @max-[154px]:[&_svg]:hidden"
          >
            {movie.views}
          </MovieChip>
        )}
      </div>
    </Fragment>
  )
}
