import type { SVGProps } from "react";

/**
 * Figma: "Icon (play)" — vector data exported 1:1 from the StreamVibe design
 * file; colours replaced with currentColor so it follows the text colour.
 * Path data is generated from the Figma export — re-export from Figma rather
 * than editing the coordinates by hand.
 */
export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.25 6.59479C5.25 4.93097 7.03383 3.87625 8.4917 4.67807L21.9557 12.0833C23.4668 12.9144 23.4668 15.0856 21.9557 15.9167L8.4917 23.3219C7.03383 24.1238 5.25 23.069 5.25 21.4052V6.59479Z" fill="currentColor" />
    </svg>
  );
}
