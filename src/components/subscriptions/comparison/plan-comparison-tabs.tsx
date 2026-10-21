import { PlanFeatureList } from '@/components/subscriptions/comparison/plan-feature-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { plans } from '@/data/plans'
import { cn } from '@/lib/utils'

type PlanComparisonTabsProps = {
  className?: string
}

/**
 * The comparison on phones and tablets, where four columns don't fit: a
 * switch between the plans above the chosen plan's features. It opens on the
 * popular plan, which is the one the mobile artboard shows.
 */
export function PlanComparisonTabs({ className }: PlanComparisonTabsProps) {
  const defaultPlan = plans.find((plan) => plan.popular) ?? plans[0]

  return (
    <Tabs defaultValue={defaultPlan.id} className={cn('gap-5', className)}>
      <TabsList aria-label='Plan' className='w-full'>
        {plans.map((plan) => (
          <TabsTrigger
            key={plan.id}
            value={plan.id}
            className='flex-1 cursor-pointer data-active:cursor-default'
          >
            {plan.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {plans.map((plan) => (
        <TabsContent key={plan.id} value={plan.id}>
          <PlanFeatureList plan={plan} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
