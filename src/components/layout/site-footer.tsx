import Link from "next/link";
import { Fragment } from "react";

import { Container } from "@/components/layout/container";
import { FooterLinkColumn } from "@/components/layout/footer-link-column";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const { columns, social, legal } = siteConfig.footer;

  return (
    <footer className="mt-37.5 bg-black-06">
      <Container className="flex flex-col gap-25 pt-25 pb-12.5">
        <div className="grid grid-cols-5 gap-7.5">
          {columns.map((column) => (
            <FooterLinkColumn key={column.title} {...column} />
          ))}

          <div className="flex flex-col gap-6">
            <h3 className="text-20 font-semibold">Connect With Us</h3>
            <ul className="flex gap-3.5">
              {social.map(({ title, href, icon: Icon }) => (
                <li key={href}>
                  <Button asChild variant="secondary" size="icon-sm" className="border-border">
                    <a href={href} target="_blank" rel="noreferrer" aria-label={title}>
                      <Icon />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Separator />
          <div className="flex items-center justify-between text-18 text-muted-foreground">
            <p>© {new Date().getFullYear()} StreamVibe, All Rights Reserved</p>
            <nav aria-label="Legal" className="flex items-center gap-5">
              {legal.map((link, index) => (
                <Fragment key={link.href}>
                  {index > 0 && <Separator orientation="vertical" />}
                  <Link
                    href={link.href}
                    className="rounded-sm transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {link.title}
                  </Link>
                </Fragment>
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}
