import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MovieChipProps {
  icon: ReactNode
  srLabel: string
  children: ReactNode
  className?: string
}

export function MovieChip({ icon, srLabel, children, className }: MovieChipProps) {
  return (
    <p
      className={cn(
        "flex min-h-7 items-center gap-0.5 rounded-full border border-black-15 bg-black-08 py-0.75 pr-1.75 pl-0.75 text-12 font-medium whitespace-nowrap text-grey-60 2xl:min-h-9 2xl:py-1.25 2xl:pr-2.25 2xl:pl-1.25 2xl:text-16 [&_svg]:size-5 [&_svg]:shrink-0 2xl:[&_svg]:size-6",
        className,
      )}
    >
      {icon}
      <span className="sr-only">{srLabel}: </span>
      {children}
    </p>
  )
}
