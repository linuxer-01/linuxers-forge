import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function Brand() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Linuxers home">
      <span className="grid size-8 place-items-center rounded-md border border-purple/40 bg-purple/15 font-display text-sm font-bold text-purple-soft">L</span>
      <span className="font-display text-lg font-semibold uppercase">Linuxers</span>
    </Link>
  );
}

const links = [
  { label: "Home", to: "/" as const },
  { label: "Editorial", to: "/blogs" as const },
  { label: "Laboratory", to: "/admin" as const },
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
            <Link key={link.to} to={link.to} className={path === link.to || (link.to !== "/" && path.startsWith(link.to)) ? "text-sm font-medium text-foreground" : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="hidden md:inline-flex">
          <Link to="/blogs">Explore blogs <ArrowUpRight className="size-4" /></Link>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden" aria-label="Mobile navigation">
          {links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground">{link.label}</Link>)}
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
          <p className="mt-4 text-sm leading-6 text-muted-foreground">The student-led entrepreneurship cell of Mahalakshmi Tech, building thoughtful ventures and sharper founders.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-purple">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <span>© 2026 Linuxers</span>
        </div>
      </div>
    </footer>
  );
}

export function PublicPage({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main>{children}</main><SiteFooter /></div>;
}
