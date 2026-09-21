import Link from 'next/link'

import { BellIcon } from '@/components/icons/bell'
import { Logo } from '@/components/icons/logo'
import { SearchIcon } from '@/components/icons/search'
import { Container } from '@/components/layout/container'
import { MainNav } from '@/components/layout/main-nav'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Button } from '@/components/ui/button'

/**
 * Floats over the top of the page (the hero runs underneath it, as in the
 * design). Pages without a hero should reserve the header's height of top
 * padding: 88px on mobile, 98px on laptop, 120px on desktop.
 */
export function SiteHeader() {
  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <Container className='relative flex items-center justify-between py-5 lg:py-6 2xl:py-7.5'>
        <Link href='/' className='rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50'>
          <Logo className='h-8.75 w-auto lg:h-12.5 2xl:h-section-laptop' />
        </Link>

        <MainNav className='absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex' />

        <div className='hidden items-center gap-3.5 lg:flex 2xl:gap-7.5'>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Search'
            className='p-0 text-foreground hover:text-grey-75 2xl:p-0 2xl:[&_svg]:size-8.5'
          >
            <SearchIcon />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Notifications'
            className='p-0 text-foreground hover:text-grey-75 2xl:p-0 2xl:[&_svg]:size-8.5'
          >
            <BellIcon />
          </Button>
        </div>

        <MobileNav className='lg:hidden' />
      </Container>
    </header>
  )
}
