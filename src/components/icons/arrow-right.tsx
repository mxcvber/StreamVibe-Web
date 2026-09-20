import type { SVGProps } from 'react'

/**
 * Figma: "Icon / Vector 619" — vector data exported 1:1 from the StreamVibe design
 * file; colours replaced with currentColor so it follows the text colour.
 * Path data is generated from the Figma export — re-export from Figma rather
 * than editing the coordinates by hand.
 */
export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={30}
      height={30}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      {...props}
    >
      <path
        d='M5.625 15L24.375 15M15.9375 23.4375L24.375 15L15.9375 6.5625'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
