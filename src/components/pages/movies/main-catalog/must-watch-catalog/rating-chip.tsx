import { cn } from "@/lib/utils"
import { StarRating } from "../../../../shared/star-rating"

interface RatingChipProps {
  stars: number
  votes: string
  className?: string
}

export function RatingChip({ stars, votes, className }: RatingChipProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-1 rounded-full border border-black-15 bg-black-08 px-1.75 py-1.25 text-12 font-medium whitespace-nowrap text-grey-60 lg:px-2.25 2xl:text-14",
        className,
      )}
    >
      <span className="sr-only">Rated {stars} out of 5 from </span>
      <StarRating value={stars} />
      {votes}
      <span className="sr-only"> votes</span>
    </p>
  )
}
