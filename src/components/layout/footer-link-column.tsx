import Link from "next/link";

import type { FooterColumn } from "@/config/site";

export function FooterLinkColumn({ title, links }: FooterColumn) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-20 font-semibold">{title}</h3>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="rounded-sm text-18 font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
