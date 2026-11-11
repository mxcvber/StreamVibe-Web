import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "@/components/icons/arrow-right"
import { cn } from "@/lib/utils"

interface CatalogBoxProps {
  label: string
  href?: string
  children: ReactNode
}

export function CatalogBox({ label, href, children }: CatalogBoxProps) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "relative z-10 lg:-mb-5.5 lg:flex lg:px-10 2xl:-mb-7.5 2xl:px-12.5",
          href ? "mb-5 flex" : "hidden",
        )}
      >
        {href ? (
          <Link
            href={href}
            className="catalog-box-label flex items-center gap-1 transition-colors outline-none hover:bg-red-50 focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-5 2xl:[&_svg]:size-6"
          >
            {label}
            <ArrowRightIcon />
          </Link>
        ) : (
          <p className={"catalog-box-label"}>{label}</p>
        )}
      </div>

      <div className="flex flex-col gap-12.5 lg:gap-20 lg:rounded-lg lg:border lg:border-black-15 lg:p-10 2xl:gap-25 2xl:p-12.5">
        {children}
      </div>
    </div>
  )
}
