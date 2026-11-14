import Image from "next/image"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type MovieCardPosterProps = {
  src: string
  alt: string
  sizes: string
  className?: string
  children?: ReactNode
}

export function MovieCardPoster({ src, alt, sizes, className, children }: MovieCardPosterProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      {children}
    </div>
  )
}
