import Link from "next/link";

import { FAQ_DIVIDER, FaqAccordion } from "@/components/home/faq/faq-accordion";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { faq } from "@/data/faq";
import { cn } from "@/lib/utils";

const COLUMN_SIZE = 4;

export function FaqSection() {
  const columns = [faq.slice(0, COLUMN_SIZE), faq.slice(COLUMN_SIZE)];

  return (
    <section id="faq">
      <Container className="flex flex-col gap-section-mobile lg:gap-section-laptop 2xl:gap-section-desktop">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-25">
          <SectionHeading
            className="flex-1"
            titleClassName="max-lg:text-20"
            title="Frequently Asked Questions"
            description="Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe."
          />
          <Button asChild className="self-start md:self-auto">
            <Link href="/support">Ask a Question</Link>
          </Button>
        </div>
        {/* Two independent columns: opening an item only reflows its own column.
            Under `lg` they stack into the mobile artboard's single list, so every
            column but the last keeps a divider under its final question. */}
        <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-10 2xl:gap-20">
          {columns.map((items, index) => (
            <FaqAccordion
              key={index}
              items={items}
              defaultValue={index === 0 ? items[0]?.id : undefined}
              className={cn(index < columns.length - 1 && ["max-lg:border-b", FAQ_DIVIDER])}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
