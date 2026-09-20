import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description: string;
  className?: string;
};

/** The heading + intro paragraph pair that opens every home page section. */
export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <h2 className="text-38 font-bold">{title}</h2>
      <p className="text-18 text-muted-foreground">{description}</p>
    </div>
  );
}
