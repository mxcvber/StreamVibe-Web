import { StarIcon } from '@/components/icons/star'

const STARS = 5

type StarRatingProps = {
  /** 0–5 in halves. */
  value: number
}

/**
 * Five stars, red up to `value` and grey after it, with a half star split
 * down its middle. 14px stars 1px apart, 18px and 2px on desktop. Hidden from
 * screen readers: the rating chip reads the value out instead.
 */
export function StarRating({ value }: StarRatingProps) {
  return (
    <span aria-hidden='true' className='flex gap-px 2xl:gap-0.5 [&_svg]:size-3.5 2xl:[&_svg]:size-4.5'>
      {Array.from({ length: STARS }, (_, index) => {
        const fill = value - index

        if (fill >= 1) return <StarIcon key={index} className='text-red-45' />
        if (fill <= 0) return <StarIcon key={index} className='text-grey-60' />
        return (
          <span key={index} className='relative flex'>
            <StarIcon className='text-grey-60' />
            {/* Clipped at the star's vertical axis, 6.66 of its 14px box. */}
            <StarIcon className='absolute inset-0 text-red-45 [clip-path:inset(0_52.45%_0_0)]' />
          </span>
        )
      })}
    </span>
  )
}
