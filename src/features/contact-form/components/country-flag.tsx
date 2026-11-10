import type { Country } from "../types"
import { cn } from "@/lib/utils"

export function CountryFlag({ country, className }: { country: Country; className?: string }) {
  const { Flag } = country

  return (
    <span className={cn("block shrink-0 overflow-hidden rounded-xs", className)}>
      <Flag aria-hidden="true" preserveAspectRatio="xMidYMid slice" className="block size-full" />
    </span>
  )
}
