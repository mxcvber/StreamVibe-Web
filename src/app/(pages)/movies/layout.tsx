import type { Metadata } from "next"
import { siteConfig } from "@/data/site-config"

export const metadata: Metadata = {
  title: {
    default: "Movies",
    template: `%s | ${siteConfig.name}`,
  },
}

export default function MoviesLayout({ children }: LayoutProps<"/movies">) {
  return children
}
