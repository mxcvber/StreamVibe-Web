import type { ComponentType, SVGProps } from 'react'

import { FacebookIcon } from '@/components/icons/facebook'
import { LinkedinIcon } from '@/components/icons/linkedin'
import { TwitterIcon } from '@/components/icons/twitter'

export type NavLink = { title: string; href: string }

export type FooterColumn = { title: string; links: NavLink[] }

export type SocialLink = NavLink & {
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

/**
 * Site-wide navigation. Only the home page exists yet; the other hrefs are
 * the routes the Figma pages will get, so links already point at them.
 */
export const siteConfig = {
  name: 'StreamVibe',
  description:
    'StreamVibe is the best streaming experience for watching your favorite movies on demand, anytime, anywhere.',
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Movies', href: '/movies' },
    { title: 'Support', href: '/support' },
    { title: 'Subscriptions', href: '/subscriptions' },
  ] satisfies NavLink[],
  footer: {
    columns: [
      {
        title: 'Home',
        links: [
          { title: 'Categories', href: '/#categories' },
          { title: 'Devices', href: '/#devices' },
          { title: 'Pricing', href: '/#pricing' },
          { title: 'FAQ', href: '/#faq' },
        ],
      },
      {
        title: 'Movies',
        links: [
          { title: 'Genres', href: '/movies#genres' },
          { title: 'Trending', href: '/movies#trending' },
          { title: 'New Release', href: '/movies#new-releases' },
          { title: 'Popular', href: '/movies#popular' },
        ],
      },
      {
        title: 'Support',
        links: [{ title: 'Contact Us', href: '/support' }],
      },
      {
        title: 'Subscription',
        links: [
          { title: 'Plans', href: '/subscriptions' },
          { title: 'Features', href: '/subscriptions#features' },
        ],
      },
    ] satisfies FooterColumn[],
    social: [
      { title: 'Facebook', href: 'https://www.facebook.com', icon: FacebookIcon },
      { title: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
      { title: 'LinkedIn', href: 'https://www.linkedin.com', icon: LinkedinIcon },
    ] satisfies SocialLink[],
    legal: [
      { title: 'Terms of Use', href: '/terms' },
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Cookie Policy', href: '/cookies' },
    ] satisfies NavLink[],
  },
}
