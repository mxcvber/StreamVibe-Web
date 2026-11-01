import type { BillingPeriod, Plan } from '@/types/plans'
import Link from 'next/link'
import { Button } from '@/components/shared/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/shared/ui/card'
import { billingPeriods } from '@/data/plans'
import { formatPrice } from '@/lib/format-price'

type PlanCardProps = {
  plan: Plan
  period: BillingPeriod
}

export function PlanCard({ plan, period }: PlanCardProps) {
  const unit = billingPeriods.find((p) => p.value === period)?.unit ?? period

  return (
    <Card className='max-w-137.5 mx-auto gap-7.5 p-4 min-[375px]:p-5.75 sm:p-8 lg:gap-10 lg:p-9.75 2xl:gap-12.5 2xl:p-12.25'>
      <CardHeader className='flex-1'>
        <CardTitle className='font-bold'>{plan.name} Plan</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className='flex items-baseline gap-1'>
        <span className='text-24 leading-[0.73] font-semibold lg:text-30 2xl:text-40'>
          {formatPrice(plan.price[period])}
        </span>

        <span className='text-14 leading-[0.73] font-medium text-muted-foreground lg:text-16 2xl:text-18'>/{unit}</span>
      </CardContent>

      <CardFooter className='flex justify-around'>
        <Button asChild variant='outline' className='flex-1 max-w-64'>
          <Link href={`/subscriptions?plan=${plan.id}&trial=true`}>Start Free Trial</Link>
        </Button>

        <Button asChild className='flex-1 max-w-64'>
          <Link href={`/subscriptions?plan=${plan.id}`}>Choose Plan</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
