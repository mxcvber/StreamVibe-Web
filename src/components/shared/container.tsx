import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Page-width wrapper. Gutters follow the Figma artboards — 16px on mobile
 * (40px from `md` as a tablet middle ground) and 80px from `lg` — while
 * `box-content` keeps `max-w-desktop` (1596px) as the content width with the
 * gutters added outside it. Centring then produces the desktop artboard's
 * 162px gutter at 1920px by itself, and between 1440 and 1920 the content
 * grows fluidly instead of jumping to a wider gutter (which would make cards
 * *smaller* at 1536px than at 1440px).
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto box-content max-w-desktop px-gutter-mobile md:px-10 lg:px-gutter-laptop",
        className
      )}
      {...props}
    />
  );
}
