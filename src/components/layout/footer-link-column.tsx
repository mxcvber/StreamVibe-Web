import Link from "next/link";

import type { FooterColumn } from "@/config/site";

export function FooterLinkColumn({ title, links }: FooterColumn) {
  return (
    <div className="flex flex-col gap-4 lg:gap-5 2xl:gap-6">
      <h3 className="text-16 font-semibold lg:text-18 2xl:text-20">{title}</h3>
      <ul className="flex flex-col gap-2 lg:gap-2.5 2xl:gap-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="rounded-sm text-14 font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 lg:text-16 2xl:text-18"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
