import type { Metadata } from 'next'

import { ContactSection } from '@/components/support/contact/contact-section'

export const metadata: Metadata = {
  title: 'Support',
}

export default function SupportPage() {
  return <ContactSection />
}
