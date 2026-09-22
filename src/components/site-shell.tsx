import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { LinuxersLogo } from "@/components/linuxers-logo";
import { Button } from "@/components/ui/button";
import { footerLinks, siteConfig } from "@/lib/site-config";

export function Brand() {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-3"
      aria-label={`${siteConfig.name} home`}
    >
      <LinuxersLogo className="size-8 shrink-0" />
      <span className="font-display text-lg font-semibold uppercase">{siteConfig.name}</span>
    </Link>
  );
}

const links = [
  { label: "Home", to: "/" as const },
  { label: "Blog", to: "/blogs" as const },
  { label: "Admin", to: "/admin" as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:flex sm:px-6">
        <Brand />
        <nav className="ml-auto hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                path === link.to || (link.to !== "/" && path.startsWith(link.to))
                  ? "text-sm font-medium text-foreground"
                  : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="hidden md:inline-flex">
          <Link to="/blogs">
            Explore blogs <ArrowUpRight className="size-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>
      {open && (
        <nav
          className="border-t border-border bg-background px-4 py-3 md:hidden"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <Brand />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{siteConfig.tagline}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The entrepreneurship community of {siteConfig.college}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {footerLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="transition-colors hover:text-blue-ink"
            >
              {link.label}
            </a>
          ))}
          <span>© 2026 {siteConfig.name}</span>
        </div>
      </div>
    </footer>
  );
}

export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
