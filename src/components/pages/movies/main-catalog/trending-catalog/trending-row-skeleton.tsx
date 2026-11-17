import { Card } from "@/components/shared/ui/card"
import { Skeleton } from "@/components/shared/ui/skeleton"
import { CatalogRowSkeleton } from "../catalog-row-skeleton"

export function TrendingRowSkeleton() {
  return (
    <CatalogRowSkeleton
      title="Trending Now"
      placeholders={5}
      trackClassName="lg:-ml-5"
      slideClassName="basis-[197.6px] md:basis-60 lg:basis-1/5 lg:pl-5"
      card={
        <Card className="gap-3 rounded-md p-2.75 lg:gap-4 lg:p-3.75 2xl:gap-5 2xl:rounded-lg 2xl:p-4.75">
          <Skeleton className="aspect-[157.6/195] rounded-md lg:aspect-192/232 2xl:aspect-[243.6/281] 2xl:rounded-lg" />

          <div className="flex items-center gap-1">
            <Skeleton className="h-7 w-20 rounded-full 2xl:h-9 2xl:w-27" />
            <Skeleton className="ml-auto h-7 w-14 rounded-full 2xl:h-9 2xl:w-18" />
          </div>
        </Card>
      }
    />
  )
}
