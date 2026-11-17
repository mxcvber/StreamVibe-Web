import { StarIcon } from "@/components/icons/star"

const STARS = 5

export function StarRating({ value }: { value: number }) {
  return (
    <span aria-hidden="true" className="flex gap-px 2xl:gap-0.5 [&_svg]:size-3.5 2xl:[&_svg]:size-4.5">
      {Array.from({ length: STARS }, (_, index) => {
        const fill = value - index

        if (fill >= 1) return <StarIcon key={index} className="text-red-45" />
        if (fill <= 0) return <StarIcon key={index} className="text-grey-60" />

        return (
          <span key={index} className="relative flex">
            <StarIcon className="text-grey-60" />
            <StarIcon className="absolute inset-0 text-red-45 [clip-path:inset(0_52.45%_0_0)]" />
          </span>
        )
      })}
    </span>
  )
}
