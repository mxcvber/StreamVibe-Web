import { cn } from "@/lib/utils"

// Adapted from the shadcn CLI output: the project's `cn` (registers the pixel
// font sizes), Black/15 instead of `bg-muted` (Black/12 barely shows on the
// Black/10 cards), and the pulse only when motion is allowed.
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-md bg-black-15 motion-safe:animate-pulse", className)}
      {...props}
    />
  )
}

export { Skeleton }
