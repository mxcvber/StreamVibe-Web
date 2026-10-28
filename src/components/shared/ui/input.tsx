import * as React from "react"
import { cn } from "@/lib/utils"

// The design's text field: Black/08 fill, Black/15 hairline, 16px padding and
// 14px text (53px tall) on mobile and laptop, 20px and 18px (67px) on desktop.
// Paddings are the Figma value minus the 1px border, as in button.tsx.
// `text-ellipsis` cuts a placeholder that doesn't fit (the phone number field
// between 1024 and ~1120px) with an ellipsis instead of mid-letter.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 rounded-[6px] border border-input bg-background px-3.75 py-3.75 text-14 text-ellipsis transition-colors outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 2xl:rounded-sm 2xl:px-4.75 2xl:py-4.75 2xl:text-18",
        className
      )}
      {...props}
    />
  )
}

export { Input }
