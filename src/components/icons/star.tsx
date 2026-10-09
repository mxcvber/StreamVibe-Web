import type { SVGProps } from "react";

/**
 * Figma: "Shape" (a 5-point star) in the Must-Watch card's rating chip — vector
 * data exported 1:1 from the StreamVibe design file; colours replaced with
 * currentColor so it follows the text colour. The viewBox is the star's 14×14
 * Figma box rather than the 14×13 export, so it sits where the design puts it.
 * Path data is generated from the Figma export — re-export from Figma rather
 * than editing the coordinates by hand.
 */
export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path d="M6.65723 0L9.08067 3.66442L13.3146 4.83688L10.5784 8.27408L10.7717 12.6631L6.65723 11.123L2.54273 12.6631L2.73602 8.27408L-0.000169277 4.83688L4.23379 3.66442L6.65723 0Z" fill="currentColor" />
    </svg>
  );
}
