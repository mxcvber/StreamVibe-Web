import { Card } from "@/components/shared/ui/card"
import { Skeleton } from "@/components/shared/ui/skeleton"
import { CatalogRowSkeleton } from "../catalog-row-skeleton"

export function MustWatchRowSkeleton() {
  return (
    <CatalogRowSkeleton
      title="Must - Watch Movies"
      placeholders={4}
      trackClassName="lg:-ml-5"
      slideClassName="basis-61.75 md:basis-75.25 lg:basis-1/3 lg:pl-5 xl:basis-1/4"
      card={
        <Card className="gap-3 rounded-md p-2.75 lg:gap-4 lg:p-3.75 2xl:gap-5 2xl:rounded-lg 2xl:p-4.75">
          <Skeleton className="aspect-207/235 rounded-md lg:aspect-253/324 2xl:aspect-319.5/404 2xl:rounded-lg" />

          <div className="flex items-center justify-between gap-0.5">
            <Skeleton className="h-8 w-22 rounded-full 2xl:h-9 2xl:w-27" />
            <Skeleton className="h-7.5 w-29 rounded-full lg:w-30 2xl:h-8.25 2xl:w-37" />
          </div>
        </Card>
      }
    />
  )
}
