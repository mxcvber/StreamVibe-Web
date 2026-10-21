import { planFeatures } from '@/data/plan-features'
import { plans } from '@/data/plans'
import { cn } from '@/lib/utils'

// Laptop sizes, then desktop; phones get `PlanComparisonTabs` instead.
const cellClassName = 'p-6 text-left 2xl:p-7.5'
const headCellClassName = cn(cellClassName, 'text-18 font-semibold 2xl:text-20')
// Figma draws each row's line inside the row, so the border takes 1px off the
// top padding and rows stay the artboards' 72px (87px on desktop).
const bodyCellClassName = cn(
  cellClassName,
  'border-t pt-5.75 text-16 font-medium text-muted-foreground 2xl:pt-7.25 2xl:text-18',
)

type PlanComparisonTableProps = {
  className?: string
}

/**
 * "Compare our plans" from laptop up: a feature column and one equal column
 * per plan in a framed table with a Black/06 header row. Plans head the
 * columns and features head the rows, so screen readers announce both with
 * every cell.
 */
export function PlanComparisonTable({ className }: PlanComparisonTableProps) {
  return (
    <div className={cn('overflow-hidden rounded-md border 2xl:rounded-lg', className)}>
      <table className='w-full table-fixed border-separate border-spacing-0'>
        <caption className='sr-only'>Plan features</caption>
        <thead className='bg-black-06'>
          <tr>
            <th scope='col' className={headCellClassName}>
              Features
            </th>
            {plans.map((plan) => (
              <th key={plan.id} scope='col' className={cn(headCellClassName, 'border-l')}>
                <span className='flex items-center gap-2'>
                  {plan.name}
                  {plan.popular && (
                    // leading-none + padding reproduces the design's cap-height
                    // trimmed box (22px tall) in every browser, as on the genre
                    // cards' "Top 10 In" badge.
                    <span className='rounded-xs bg-primary px-1.5 py-1 text-14 leading-none font-medium 2xl:px-2.5'>
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
              <th scope='row' className={bodyCellClassName}>
                {feature.label}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className={cn(bodyCellClassName, 'border-l')}>
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
