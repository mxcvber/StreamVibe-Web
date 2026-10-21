import type { Metadata } from 'next'

import { FreeTrialBanner } from '@/components/home/free-trial/free-trial-banner'
import { PlansSection } from '@/components/home/plans/plans-section'
import { PlanComparisonSection } from '@/components/subscriptions/comparison/plan-comparison-section'

export const metadata: Metadata = {
  title: 'Subscriptions',
}

/**
 * There's no hero, so the top padding clears the floating header and puts the
 * plans where the artboards have them (142 / 198 / 220px down). The Plans
 * block is the home page's, with the heading at 48px on desktop as this
 * page's artboard sets it.
 */
export default function SubscriptionsPage() {
  return (
    <div className='flex flex-col gap-20 pt-35.5 lg:gap-30 lg:pt-49.5 2xl:gap-37.5 2xl:pt-55'>
      <h1 className='sr-only'>Subscriptions</h1>
      <PlansSection titleClassName='2xl:text-48' />
      <PlanComparisonSection />
      <FreeTrialBanner />
    </div>
  )
}
