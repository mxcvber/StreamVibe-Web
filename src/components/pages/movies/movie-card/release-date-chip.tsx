type ReleaseDateChipProps = {
  /** "YYYY-MM-DD". */
  date: string
  /** The formatted date ("30 Sept 2026"). */
  label: string
}

/**
 * A "New Releases" card's pill: "Released at" and the date in a lighter grey.
 * 30px tall with 12px text up to laptop, 36px with 16px text on desktop.
 * Padding is the design's 6/14px less the 1px border, which Figma draws inside
 * the box. Its width comes from the card: hugging the text up to laptop, the
 * card's full width on desktop.
 *
 * Figma's sample date ("14 April 2023") is short; real dates with a long month
 * would push the pill past the card's edge at every width, so the card passes
 * the short month. Where even "Released at 30 Sept 2026" doesn't fit, the lead-in
 * is left to screen readers. That's below 144px of card content at 12px (laptops
 * up to ~1220px wide) and below 220px at 16px (desktops up to ~1660px). Needs
 * an `@container` ancestor: the card.
 */
export function ReleaseDateChip({ date, label }: ReleaseDateChipProps) {
  return (
    <p className='rounded-full border border-black-15 bg-black-08 px-3.25 py-1.25 text-center text-12 font-medium whitespace-nowrap text-grey-60 2xl:text-16'>
      <span className='@max-[9rem]:sr-only 2xl:@max-[13.75rem]:sr-only'>Released at </span>
      <time dateTime={date} className='text-grey-75'>
        {label}
      </time>
    </p>
  )
}
