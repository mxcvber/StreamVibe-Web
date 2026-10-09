import { StarRating } from '@/components/movies/movie-card/star-rating'
import { cn } from '@/lib/utils'

type RatingChipProps = {
  /** 0–5 in halves. */
  stars: number
  /** Formatted vote count ("20K"). */
  votes: string
  className?: string
}

/**
 * A Must-Watch card's rating pill: five stars and the vote count, read out as
 * "Rated 4.5 out of 5 from 20K votes". 30px tall with 12px text, 33px with
 * 14px text on desktop. Padding is the design's 6/8px (6/10px from laptop)
 * less the 1px border Figma draws inside the box.
 *
 * Not a `MovieChip`: that sizes every icon inside it to 20/24px, and this one
 * holds five 14/18px stars.
 */
export function RatingChip({ stars, votes, className }: RatingChipProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-1 rounded-full border border-black-15 bg-black-08 px-1.75 py-1.25 text-12 font-medium whitespace-nowrap text-grey-60 lg:px-2.25 2xl:text-14',
        className,
      )}
    >
      <span className='sr-only'>Rated {stars} out of 5 from </span>
      <StarRating value={stars} />
      {votes}
      <span className='sr-only'> votes</span>
    </p>
  )
}
