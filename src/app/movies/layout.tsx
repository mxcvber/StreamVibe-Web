import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  // The template is repeated rather than inherited: a layout passes its own
  // `title.template` down, so a plain string here would drop the root
  // layout's and leave child pages ("All Movies") without the site name.
  title: {
    default: 'Movies',
    template: `%s | ${siteConfig.name}`,
  },
}

export default function MoviesLayout({ children }: LayoutProps<'/movies'>) {
  return children
}
