import type { SVGProps } from "react";

/**
 * Figma: "Icon / Frame (tablet)" — vector data exported 1:1 from the StreamVibe design
 * file; colours replaced with currentColor so it follows the text colour.
 * Path data is generated from the Figma export — re-export from Figma rather
 * than editing the coordinates by hand.
 */
export function TabletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <g transform="translate(6.4 1.6)">
        <g clipPath="url(#tablet-clip0_0_12)">
          <path d="M10.1055 32.2373H17.3359V29.2354H10.1055V32.2373ZM0.511719 32.501C0.500475 27.6658 0.5 22.8193 0.5 17.9834V3.53125C0.500028 2.50776 0.794359 1.76537 1.2793 1.2793C1.76412 0.793522 2.50344 0.5 3.52051 0.5H23.9326C24.9498 0.500019 25.689 0.793402 26.1738 1.2793C26.6588 1.76537 26.9531 2.50776 26.9531 3.53125V32.502C26.9531 33.4993 26.6581 34.2353 26.1738 34.7207C25.6897 35.2059 24.9569 35.5 23.9658 35.5H3.49805C2.50832 35.5 1.77566 35.2036 1.29102 34.7168C0.806054 34.2296 0.511719 33.4931 0.511719 32.502V32.501Z" fill="currentColor" stroke="currentColor" />
        </g>
        <defs>
          <clipPath id="tablet-clip0_0_12">
            <rect width="27.4527" height="36" fill="white" />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}
