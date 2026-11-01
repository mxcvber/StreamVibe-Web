export type BillingPeriod = 'monthly' | 'yearly'

export type PlanId = 'basic' | 'standard' | 'premium'

export type Plan = {
  id: PlanId
  name: string
  description: string
  price: Record<BillingPeriod, number>
  popular?: boolean
}
