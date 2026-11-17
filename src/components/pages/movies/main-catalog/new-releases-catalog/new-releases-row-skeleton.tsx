import { Card } from "@/components/shared/ui/card"
import { Skeleton } from "@/components/shared/ui/skeleton"
import { CatalogRowSkeleton } from "../catalog-row-skeleton"

export function NewReleasesRowSkeleton() {
  return (
    <CatalogRowSkeleton
      title="New Releases"
      placeholders={5}
      trackClassName="-ml-5"
      slideClassName="basis-[198.4px] pl-5 md:basis-61 lg:basis-1/5"
      card={
        <Card className="items-center gap-3 rounded-md p-2.75 lg:gap-4 lg:p-3.75 2xl:items-stretch 2xl:gap-5 2xl:rounded-lg 2xl:p-4.75">
          <Skeleton className="aspect-[154.4/193] w-full rounded-md lg:aspect-192/230 2xl:aspect-[243.6/281] 2xl:rounded-lg" />

          <Skeleton className="h-7.5 w-36 max-w-full rounded-full 2xl:h-9 2xl:w-auto" />
        </Card>
      }
    />
  )
}
