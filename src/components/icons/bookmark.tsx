import type { SVGProps } from 'react'

/**
 * Figma: "heroicons-outline/bookmark" on the Icons page — vector data exported
 * 1:1 from the StreamVibe design file; colours replaced with currentColor so
 * it follows the text colour. The stroke is 2 rather than heroicons' 1.5 to
 * match the other hero icon buttons, which Figma draws at 2. Path data is
 * generated from the Figma export — re-export from Figma rather than editing
 * the coordinates by hand.
 */
export function BookmarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      {...props}
    >
      <path
        d='M19.5 21V5.50699C19.5 4.399 18.6939 3.45014 17.5933 3.32241C15.7584 3.10947 13.892 3 12 3C10.108 3 8.24156 3.10947 6.40668 3.32241C5.30608 3.45014 4.5 4.399 4.5 5.50699V21L12 17.25L19.5 21Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
