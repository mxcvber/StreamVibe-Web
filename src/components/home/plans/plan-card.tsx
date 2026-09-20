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
    <Card className='gap-12.5 p-12.25'>
      <CardHeader>
        <CardTitle className='font-bold'>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      {/* Figma gives the price row a 0.73 line-height (29px tall). It has to sit
          on each span: the text-* utilities set their own line-height. */}
      <CardContent className='flex items-baseline gap-1'>
        <span className='text-40 leading-[0.73] font-semibold'>{formatPrice(plan.price[period])}</span>
        <span className='text-18 leading-[0.73] font-medium text-muted-foreground'>/{unit}</span>
      </CardContent>
      <CardFooter className='flex justify-between gap-5'>
        <Button asChild variant='outline' className='flex-1'>
          <Link href={`/subscriptions?plan=${plan.id}&trial=true`}>Start Free Trial</Link>
        </Button>
        <Button asChild className='flex-1'>
          <Link href={`/subscriptions?plan=${plan.id}`}>Choose Plan</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
