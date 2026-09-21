import { PlanCard } from '@/components/home/plans/plan-card'
import { Container } from '@/components/layout/container'
import { SectionHeading } from '@/components/layout/section-heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { billingPeriods, plans } from '@/data/plans'

/**
 * Tabs wrap the heading row too, because the Monthly/Yearly switch sits
 * beside the heading in the design (under it on mobile) while the cards it
 * controls sit below.
 */
export function PlansSection() {
  return (
    <section id='pricing'>
      <Container>
        <Tabs
          defaultValue={billingPeriods[0].value}
          className='gap-section-mobile lg:gap-section-laptop 2xl:gap-section-desktop'
        >
          <div className='flex flex-col gap-5 md:flex-row md:items-end md:gap-25'>
            <SectionHeading
              className='flex-1'
              title="Choose the plan that's right for you"
              description='Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!'
            />
            <TabsList aria-label='Billing period'>
              {billingPeriods.map((period) => (
                <TabsTrigger
                  className='cursor-pointer data-active:cursor-default'
                  key={period.value}
                  value={period.value}
                >
                  {period.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {billingPeriods.map((period) => (
            <TabsContent
              key={period.value}
              value={period.value}
              className='grid grid-cols-1 gap-5 min-[1300px]:grid-cols-3 2xl:gap-7.5'
            >
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} period={period.value} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </section>
  )
}
