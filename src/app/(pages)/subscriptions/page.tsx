import type { Metadata } from "next"
import { FreeTrialBanner } from "@/components/shared/free-trial-banner"
import { PlansSection } from "@/components/shared/plans/plans-section"
import { PlanComparisonSection } from "@/components/pages/subscriptions/plan-comparison-section"

export const metadata: Metadata = {
  title: "Subscriptions",
}

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col gap-20 pt-35.5 lg:gap-30 lg:pt-49.5 2xl:gap-37.5 2xl:pt-55">
      <h1 className="sr-only">Subscriptions</h1>

      <PlansSection titleClassName="2xl:text-48" />
      <PlanComparisonSection />
      <FreeTrialBanner />
    </div>
  )
}
