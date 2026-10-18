import { Container } from '@/components/layout/container'
import { ContactForm } from '@/components/support/contact/contact-form'
import { ContactPosterBox } from '@/components/support/contact/contact-poster-box'

const HEADING_ID = 'support-heading'

/**
 * The support page's opening section: the welcome copy over a framed poster
 * collage, beside the contact form.
 *
 * There's no hero, so the top padding is the section's position on each
 * artboard (142 / 198 / 235px), clearing the floating header. From `lg` the
 * two columns split the row 429:800 (533:976 on desktop) rather than fixing
 * the left one at 429px, which would leave the form only ~385px wide at 1024.
 * The poster box takes whatever height the form leaves it.
 */
export function ContactSection() {
  return (
    <section aria-labelledby={HEADING_ID} className='pt-35.5 lg:pt-49.5 2xl:pt-58.75'>
      <Container className='grid gap-12.5 lg:grid-cols-[minmax(0,429fr)_minmax(0,800fr)] 2xl:grid-cols-[minmax(0,533fr)_minmax(0,976fr)] 2xl:gap-20'>
        <div className='flex flex-col gap-7.5 lg:gap-10 2xl:gap-12.5'>
          <div className='flex flex-col gap-2.5 2xl:gap-3.5'>
            <h1 id={HEADING_ID} className='text-28 font-bold lg:text-38 2xl:text-48'>
              Welcome to our support page!
            </h1>
            <p className='text-14 text-muted-foreground lg:text-16 2xl:text-18'>
              We&apos;re here to help you with any problems you may be having with our product.
            </p>
          </div>
          {/* The mobile artboard's 344px box, frame included (Figma strokes it
              outside), so the form starts where the artboard has it. */}
          <ContactPosterBox className='h-86 lg:h-auto lg:flex-1' />
        </div>

        <ContactForm />
      </Container>
    </section>
  )
}
