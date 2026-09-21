import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { type BillingPeriod, billingPeriods, formatPrice, type Plan } from '@/data/plans'

type PlanCardProps = {
  plan: Plan
  period: BillingPeriod
}

export function PlanCard({ plan, period }: PlanCardProps) {
  const unit = billingPeriods.find((p) => p.value === period)?.unit ?? period

  return (
    <Card className='max-w-137.5 mx-auto gap-7.5 p-4 sm:p-8 lg:gap-10 lg:p-9.75 2xl:gap-12.5 2xl:p-12.25'>
      <CardHeader>
        <CardTitle className='font-bold'>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      {/* Figma gives the price row a 0.73 line-height (18 / 22 / 29px tall). It
          has to sit on each span: the text-* utilities set their own line-height. */}
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
