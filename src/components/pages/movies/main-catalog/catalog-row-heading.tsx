import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function CatalogRowHeading({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={cn("flex-1 text-24 font-bold lg:self-center lg:text-30 2xl:text-38", className)} {...props} />
}
