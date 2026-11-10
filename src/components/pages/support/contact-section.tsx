import { Container } from "@/components/shared/container"
import { ContactPosterBox } from "./contact-poster-box"
import { ContactForm } from "../../../features/contact-form/components/contact-form"

const HEADING_ID = "support-heading"

export function ContactSection() {
  return (
    <section aria-labelledby={HEADING_ID} className="pt-35.5 lg:pt-49.5 2xl:pt-58.75">
      <Container className="grid gap-12.5 lg:grid-cols-[minmax(0,429fr)_minmax(0,800fr)] 2xl:grid-cols-[minmax(0,533fr)_minmax(0,976fr)] 2xl:gap-20">
        <div className="flex flex-col gap-7.5 lg:gap-10 2xl:gap-12.5">
          <div className="flex flex-col gap-2.5 2xl:gap-3.5">
            <h1 id={HEADING_ID} className="text-28 font-bold lg:text-38 2xl:text-48">
              Welcome to our support page!
            </h1>

            <p className="text-14 text-muted-foreground lg:text-16 2xl:text-18">
              We&apos;re here to help you with any problems you may be having with our product.
            </p>
          </div>

          <ContactPosterBox className="aspect-5/6 h-86 max-lg:mx-auto sm:h-150 lg:h-auto lg:flex-1" />
        </div>

        <ContactForm />
      </Container>
    </section>
  )
}
