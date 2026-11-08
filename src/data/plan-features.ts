import type { PlanId } from '@/types/plans'
import { plans } from './plans'
import { formatPrice } from '@/lib/format-price'

const monthlyPrices = Object.fromEntries(
  plans.map((plan) => [plan.id, `${formatPrice(plan.price.monthly)}/Month`]),
) as Record<PlanId, string>

type PlanFeature = {
  label: string
  values: Record<PlanId, string>
  wide?: boolean
}

export const planFeatures: PlanFeature[] = [
  { label: 'Price', values: monthlyPrices },
  {
    label: 'Content',
    wide: true,
    values: {
      basic: 'Access to a wide selection of movies, including some new releases.',
      standard: 'Access to a wider selection of movies, including most new releases and exclusive content',
      premium: 'Access to the widest selection of movies, including all new releases and Offline Viewing',
    },
  },
  {
    label: 'Devices',
    wide: true,
    values: {
      basic: 'Watch on one device simultaneously',
      standard: 'Watch on two devices simultaneously',
      premium: 'Watch on four devices simultaneously',
    },
  },
  { label: 'Free Trial', values: { basic: '7 Days', standard: '7 Days', premium: '7 Days' } },
  { label: 'Cancel Anytime', values: { basic: 'Yes', standard: 'Yes', premium: 'Yes' } },
  { label: 'HDR', values: { basic: 'No', standard: 'Yes', premium: 'Yes' } },
  { label: 'Dolby Atmos', values: { basic: 'No', standard: 'Yes', premium: 'Yes' } },
  { label: 'Ad-Free', values: { basic: 'No', standard: 'Yes', premium: 'Yes' } },
  {
    label: 'Offline Viewing',
    values: { basic: 'No', standard: 'Yes, for select titles.', premium: 'Yes, for all titles.' },
  },
  {
    label: 'Family Sharing',
    values: { basic: 'No', standard: 'Yes, up to 5 family members.', premium: 'Yes, up to 6 family members.' },
  },
]
