import * as React from "react"
import { cn } from "@/lib/utils"

// Styled like Input. The minimum heights are the design's message box (109px
// mobile, 129px laptop, 163px desktop); `field-sizing-content` grows it with
// the text from there, so the browser's drag handle (not in the design) is
// turned off.
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-27.25 w-full resize-none rounded-[6px] border border-input bg-background px-3.75 py-3.75 text-14 transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 lg:min-h-32.25 2xl:min-h-40.75 2xl:rounded-sm 2xl:px-4.75 2xl:py-4.75 2xl:text-18",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
