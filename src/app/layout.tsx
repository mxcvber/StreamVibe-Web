import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

import { SiteFooter } from '@/components/shared/footer/site-footer'
import { SiteHeader } from '@/components/shared/header/site-header'
import { siteConfig } from '@/data/site-config'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={`${manrope.variable} h-full antialiased`}>
      <body className='relative flex min-h-full flex-col'>
        <SiteHeader />
        <main className='flex-1'>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
