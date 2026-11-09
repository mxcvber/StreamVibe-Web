import { planFeatures } from "@/data/plan-features"
import { cn } from "@/lib/utils"
import { Plan } from "@/types/plans"

export function PlanFeatureList({ plan }: { plan: Plan }) {
  return (
    <dl className="grid grid-flow-row-dense grid-cols-2 gap-x-5 gap-y-6 rounded-lg border bg-black-06 p-5.75 text-14 font-medium">
      {planFeatures.map((feature) => (
        <div key={feature.label} className={cn("flex flex-col gap-1", feature.wide && "col-span-2")}>
          <dt className="text-muted-foreground">{feature.label}</dt>

          <dd className="text-grey-95">{feature.values[plan.id]}</dd>
        </div>
      ))}
    </dl>
  )
}
