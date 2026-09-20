import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Page-width wrapper. `box-content` keeps `max-w-desktop` (1596px) as the
 * content width with the 162px gutters added outside it, so at the 1920px
 * design width the content is pixel-exact, wider screens centre it, and
 * narrower ones shrink fluidly while keeping the gutters.
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto box-content max-w-desktop px-gutter-desktop", className)}
      {...props}
    />
  );
}
