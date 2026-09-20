import type { SVGProps } from 'react'

/**
 * Figma: "Icon / Vector 619" — vector data exported 1:1 from the StreamVibe design
 * file; colours replaced with currentColor so it follows the text colour.
 * Path data is generated from the Figma export — re-export from Figma rather
 * than editing the coordinates by hand.
 */
export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={28}
      height={28}
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      {...props}
    >
      <path
        d='M22.75 14L5.25 14M13.125 6.125L5.25 14L13.125 21.875'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
