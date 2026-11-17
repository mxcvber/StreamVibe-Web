import type { ReactNode } from "react"
import { Skeleton } from "@/components/shared/ui/skeleton"
import { cn } from "@/lib/utils"
import { CatalogRowHeading } from "./catalog-row-heading"

interface CatalogRowSkeletonProps {
  title: string
  placeholders: number
  trackClassName?: string
  slideClassName?: string
  card: ReactNode
}

export function CatalogRowSkeleton({
  title,
  placeholders,
  trackClassName,
  slideClassName,
  card,
}: CatalogRowSkeletonProps) {
  return (
    <div className="flex flex-col gap-5 lg:gap-10 2xl:gap-12.5">
      <div className="row-carousel-header">
        <CatalogRowHeading>{title}</CatalogRowHeading>

        <div aria-hidden="true" className="row-carousel-controls">
          <Skeleton className="size-11 rounded-sm 2xl:size-14" />
          <Skeleton className="h-1 w-17.25 rounded-full 2xl:w-20.25" />
          <Skeleton className="size-11 rounded-sm 2xl:size-14" />
        </div>
      </div>

      <div aria-hidden="true" className="flex flex-col gap-6">
        <div className={cn("-ml-4 flex overflow-hidden", trackClassName)}>
          {Array.from({ length: placeholders }, (_, index) => (
            <div key={index} className={cn("min-w-0 shrink-0 grow-0 pl-4", slideClassName)}>
              {card}
            </div>
          ))}
        </div>

        <Skeleton className="mx-auto h-1.25 w-19.75 rounded-full lg:hidden" />
      </div>
    </div>
  )
}
