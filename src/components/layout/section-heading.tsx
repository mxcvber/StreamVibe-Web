import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description: string;
  className?: string;
  /** Extra classes for the h2, e.g. `max-lg:text-20` for the two long titles Figma sets smaller on mobile. */
  titleClassName?: string;
};

/** The heading + intro paragraph pair that opens every home page section. */
export function SectionHeading({ title, description, className, titleClassName }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2.5 2xl:gap-3.5", className)}>
      <h2 className={cn("text-24 font-bold lg:text-28 2xl:text-38", titleClassName)}>{title}</h2>
      <p className="text-14 text-muted-foreground lg:text-16 2xl:text-18">{description}</p>
    </div>
  );
}
