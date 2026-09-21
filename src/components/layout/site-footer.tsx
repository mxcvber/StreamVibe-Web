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
    <footer className="mt-20 bg-black-06 lg:mt-30 2xl:mt-37.5">
      <Container className="flex flex-col gap-12.5 pt-12.5 pb-5 lg:gap-20 lg:pt-20 lg:pb-10 2xl:gap-25 2xl:pt-25 2xl:pb-12.5">
        {/* Figma stacks the columns two per row on phones (three on tablets
            is our own middle ground) and lays all of them out in one row
            from laptop up. */}
        <div className="grid grid-cols-2 gap-y-7.5 md:grid-cols-3 lg:grid-cols-5 lg:gap-5 2xl:gap-7.5">
          {columns.map((column) => (
            <FooterLinkColumn key={column.title} {...column} />
          ))}

          <div className="flex flex-col gap-4 lg:gap-5 2xl:gap-6">
            <h3 className="text-16 font-semibold lg:text-18 2xl:text-20">Connect With Us</h3>
            <ul className="flex gap-2.5 2xl:gap-3.5">
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

        <div className="flex flex-col gap-5 2xl:gap-6">
          <Separator />
          <div className="flex flex-col gap-5 text-14 text-muted-foreground md:flex-row md:items-center md:justify-between 2xl:text-18">
            <p>© {new Date().getFullYear()} StreamVibe, All Rights Reserved</p>
            <nav aria-label="Legal" className="flex items-center gap-4 2xl:gap-5">
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
