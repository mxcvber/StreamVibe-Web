import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Movies',
}

export default function MoviesLayout({ children }: LayoutProps<'/movies'>) {
  return children
}
