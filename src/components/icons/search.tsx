import type { SVGProps } from "react";

/**
 * Figma: "Icon (search)" — vector data exported 1:1 from the StreamVibe design
 * file; colours replaced with currentColor so it follows the text colour.
 * Path data is generated from the Figma export — re-export from Figma rather
 * than editing the coordinates by hand.
 */
export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={34} height={34} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path d="M29.75 29.75L22.388 22.388M22.388 22.388C24.3108 20.4653 25.5 17.809 25.5 14.875C25.5 9.00697 20.743 4.25 14.875 4.25C9.00697 4.25 4.25 9.00697 4.25 14.875C4.25 20.743 9.00697 25.5 14.875 25.5C17.809 25.5 20.4653 24.3108 22.388 22.388Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
