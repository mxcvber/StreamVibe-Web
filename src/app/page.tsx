import { CategoriesSection } from '@/components/home/categories/categories-section'
import { DevicesSection } from '@/components/home/devices/devices-section'
import { FaqSection } from '@/components/home/faq/faq-section'
import { FreeTrialBanner } from '@/components/home/free-trial/free-trial-banner'
import { Hero } from '@/components/home/hero/hero'
import { PlansSection } from '@/components/home/plans/plans-section'

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className='mt-25 flex flex-col gap-20 lg:mt-37.5 lg:gap-30 2xl:mt-50 2xl:gap-37.5'>
        <CategoriesSection />
        <DevicesSection />
        <FaqSection />
        <PlansSection />
        <FreeTrialBanner />
      </div>
    </>
  )
}
