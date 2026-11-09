import { CategoriesSection } from "@/components/pages/home/categories-section"
import { DevicesSection } from "@/components/pages/home/devices/devices-section"
import { Hero } from "@/components/pages/home/hero"
import { FaqSection } from "@/components/shared/faq/faq-section"
import { FreeTrialBanner } from "@/components/shared/free-trial-banner"
import { PlansSection } from "@/components/shared/plans/plans-section"
import { Fragment } from "react"

export default function HomePage() {
  return (
    <Fragment>
      <Hero />

      <div className="mt-25 flex flex-col gap-20 lg:mt-37.5 lg:gap-30 2xl:mt-50 2xl:gap-37.5">
        <CategoriesSection />
        <DevicesSection />
        <FaqSection />
        <PlansSection />
        <FreeTrialBanner />
      </div>
    </Fragment>
  )
}
