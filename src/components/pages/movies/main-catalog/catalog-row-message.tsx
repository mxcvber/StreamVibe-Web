import type { ReactNode } from "react"
import { CatalogRowHeading } from "../main-catalog/catalog-row-heading"

interface CatalogRowMessageProps {
  title: string
  children: ReactNode
}

export function CatalogRowMessage({ title, children }: CatalogRowMessageProps) {
  return (
    <div className="flex flex-col gap-5 lg:gap-10 2xl:gap-12.5">
      <CatalogRowHeading>{title}</CatalogRowHeading>
      <p className="text-14 text-grey-60 lg:text-20 2xl:text-22">{children}</p>
    </div>
  )
}
