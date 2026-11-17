import { Card } from "@/components/shared/ui/card"
import { Skeleton } from "@/components/shared/ui/skeleton"
import { CatalogRowSkeleton } from "../catalog-row-skeleton"

export function TopGenresRowSkeleton() {
  return (
    <CatalogRowSkeleton
      title="Popular Top 10 In Genres"
      placeholders={4}
      trackClassName="-ml-5 2xl:-ml-7.5"
      slideClassName="basis-63 pl-5 md:basis-80 lg:basis-1/4 2xl:pl-7.5"
      card={
        <Card className="p-4.75 lg:p-7.25">
          <Skeleton className="aspect-191.75/177 rounded-lg lg:aspect-225/206 2xl:aspect-292/252" />

          <div className="flex flex-col items-start gap-0.5 2xl:gap-1">
            <Skeleton className="h-6.25 w-18 rounded-lg 2xl:h-8 2xl:w-23" />

            <div className="flex h-6 w-full items-center 2xl:h-7.5">
              <Skeleton className="h-6 w-2/4 2xl:h-6" />
            </div>
          </div>
        </Card>
      }
    />
  )
}
