import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/layout/section-heading'
import { PlanComparisonTable } from '@/components/subscriptions/comparison/plan-comparison-table'
import { PlanComparisonTabs } from '@/components/subscriptions/comparison/plan-comparison-tabs'

/**
 * "Compare our plans": a table from laptop up, and below that a switch
 * between the plans over one plan's features. The id is the target of the
 * footer's "Features" link.
 *
 * Figma keeps the heading copy 150px (300px on desktop) clear of the right
 * edge, which leaves it 1129 / 1297px wide on the artboards. Here that is a
 * max width rather than padding, so on narrower laptops the copy keeps the
 * full row instead of losing a fixed 150 / 300px of it.
 */
export function PlanComparisonSection() {
  return (
    <section id='features'>
      <Container className='flex flex-col gap-section-mobile lg:gap-section-laptop 2xl:gap-section-desktop'>
        <SectionHeading
          className='gap-2 lg:max-w-282.25 lg:gap-2.5 2xl:max-w-324.25'
          titleClassName='lg:text-38 2xl:text-48'
          title='Compare our plans and find the right one for you'
          description="StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that's right for you."
        />
        <PlanComparisonTable className='hidden lg:block' />
        <PlanComparisonTabs className='lg:hidden' />
      </Container>
    </section>
  )
}
