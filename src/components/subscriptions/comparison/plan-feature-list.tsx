import { planFeatures } from '@/data/plan-features'
import type { Plan } from '@/data/plans'
import { cn } from '@/lib/utils'

/**
 * One plan's features as the mobile artboard's card: label over value, two to
 * a row, with Content and Devices across both columns. Padding is the
 * artboard's 24px less the 1px border.
 *
 * Dense packing lifts Free Trial into the slot left beside Price, so the
 * table-ordered list lays out as the artboard's Price | Free Trial, Content,
 * Devices, … while the DOM (and screen-reader) order stays the table's.
 */
export function PlanFeatureList({ plan }: { plan: Plan }) {
  return (
    <dl className='grid grid-flow-row-dense grid-cols-2 gap-x-5 gap-y-6 rounded-lg border bg-black-06 p-5.75 text-14 font-medium'>
      {planFeatures.map((feature) => (
        <div key={feature.label} className={cn('flex flex-col gap-1', feature.wide && 'col-span-2')}>
          <dt className='text-muted-foreground'>{feature.label}</dt>
          <dd className='text-grey-95'>{feature.values[plan.id]}</dd>
        </div>
      ))}
    </dl>
  )
}
