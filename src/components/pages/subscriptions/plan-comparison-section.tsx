import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { PlanComparisonTable } from "./plan-comparison-table"
import { PlanComparisonTabs } from "./plan-comparison-tabs"

export function PlanComparisonSection() {
  return (
    <section id="features">
      <Container className="flex flex-col gap-section-mobile lg:gap-section-laptop 2xl:gap-section-desktop">
        <SectionHeading
          className="gap-2 lg:max-w-282.25 lg:gap-2.5 2xl:max-w-324.25"
          titleClassName="lg:text-38 2xl:text-48"
          title="Compare our plans and find the right one for you"
          description="StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that's right for you."
        />
        <PlanComparisonTable className="hidden lg:block" />
        <PlanComparisonTabs className="lg:hidden" />
      </Container>
    </section>
  )
}
