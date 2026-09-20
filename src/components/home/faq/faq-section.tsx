import Link from "next/link";

import { FaqAccordion } from "@/components/home/faq/faq-accordion";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { faq } from "@/data/faq";

const COLUMN_SIZE = 4;

export function FaqSection() {
  const columns = [faq.slice(0, COLUMN_SIZE), faq.slice(COLUMN_SIZE)];

  return (
    <section id="faq">
      <Container className="flex flex-col gap-20">
        <div className="flex items-end gap-25">
          <SectionHeading
            className="flex-1"
            title="Frequently Asked Questions"
            description="Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe."
          />
          <Button asChild>
            <Link href="/support">Ask a Question</Link>
          </Button>
        </div>
        {/* Two independent columns: opening an item only reflows its own column. */}
        <div className="grid grid-cols-2 items-start gap-20">
          {columns.map((items, index) => (
            <FaqAccordion
              key={index}
              items={items}
              defaultValue={index === 0 ? items[0]?.id : undefined}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
