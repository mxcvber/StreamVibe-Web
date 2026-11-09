import { planFeatures } from "@/data/plan-features"
import { plans } from "@/data/plans"
import { cn } from "@/lib/utils"

interface PlanComparisonTableProps {
  className?: string
}

export function PlanComparisonTable({ className }: PlanComparisonTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-md border 2xl:rounded-lg", className)}>
      <table className="w-full table-fixed border-separate border-spacing-0">
        <caption className="sr-only">Plan features</caption>

        <thead className="bg-black-06">
          <tr>
            <th scope="col" className="subscription-cell-header">
              Features
            </th>

            {plans.map((plan) => (
              <th key={plan.id} scope="col" className="subscription-cell-header border-l">
                <span className="flex items-center gap-2">
                  {plan.name}

                  {plan.popular && (
                    <span className="rounded-xs bg-primary px-1.5 py-1 text-14 leading-none font-medium 2xl:px-2.5">
                      Popular
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {planFeatures.map((feature) => (
            <tr key={feature.label}>
              <th scope="row" className="subscription-cell-body">
                {feature.label}
              </th>

              {plans.map((plan) => (
                <td key={plan.id} className="subscription-cell-body border-l">
                  {feature.values[plan.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
