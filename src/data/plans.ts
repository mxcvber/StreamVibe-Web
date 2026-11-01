import type { BillingPeriod, Plan } from '@/types/plans'

export const billingPeriods: { value: BillingPeriod; label: string; unit: string }[] = [
  { value: 'monthly', label: 'Monthly', unit: 'month' },
  { value: 'yearly', label: 'Yearly', unit: 'year' },
]

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description:
      'Enjoy an extensive library of movies, featuring a range of content, including recently released titles.',
    price: { monthly: 9.99, yearly: 99.9 },
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Access to a wider selection of movies, including most new releases and exclusive content',
    price: { monthly: 12.99, yearly: 129.9 },
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Access to the widest selection of movies, including all new releases and Offline Viewing',
    price: { monthly: 14.99, yearly: 149.9 },
  },
]
