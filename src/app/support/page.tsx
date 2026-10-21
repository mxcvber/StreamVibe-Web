import type { Metadata } from 'next'

import { ContactSection } from '@/components/support/contact/contact-section'
import { FaqSection } from '@/components/home/faq/faq-section'
import { FreeTrialBanner } from '@/components/home/free-trial/free-trial-banner'

export const metadata: Metadata = {
  title: 'Support',
}

export default function SupportPage() {
  return (
    <div className='flex flex-col gap-[80px] md:gap-25 lg:gap-30 2xl:gap-37.5'>
      <h1 className='sr-only'>Support</h1>
      <ContactSection />
      <FaqSection />
      <FreeTrialBanner />
    </div>
  )
}
