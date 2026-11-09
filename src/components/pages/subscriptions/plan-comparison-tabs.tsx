import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shared/ui/tabs"
import { plans } from "@/data/plans"
import { cn } from "@/lib/utils"
import { PlanFeatureList } from "./plan-feature-list"

interface PlanComparisonTabsProps {
  className?: string
}

export function PlanComparisonTabs({ className }: PlanComparisonTabsProps) {
  const defaultPlan = plans.find((plan) => plan.popular) ?? plans[0]

  return (
    <Tabs defaultValue={defaultPlan.id} className={cn("gap-5", className)}>
      <TabsList aria-label="Plan" className="w-full">
        {plans.map((plan) => (
          <TabsTrigger key={plan.id} value={plan.id} className="flex-1 cursor-pointer data-active:cursor-default">
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
