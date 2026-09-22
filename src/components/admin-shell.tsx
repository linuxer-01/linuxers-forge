import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowUpRight,
  FilePlus2,
  Files,
  Image,
  LayoutDashboard,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Brand } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

const adminLinks = [
  { label: "Dashboard", to: "/admin" as const, icon: LayoutDashboard, exact: true },
  { label: "Blogs", to: "/admin/blogs" as const, icon: Files, exact: false },
  { label: "Create Blog", to: "/admin/editor" as const, icon: FilePlus2, exact: false },
  { label: "Media", to: "/admin/media" as const, icon: Image, exact: false },
  { label: "Settings", to: "/admin/settings" as const, icon: Settings, exact: false },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border bg-background/90 px-4 backdrop-blur-xl lg:hidden">
        <Brand />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close workspace menu" : "Open workspace menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </header>

      <aside
        className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-y-auto border-r border-border bg-surface p-5 pt-20 transition-transform lg:translate-x-0 lg:pt-5`}
      >
        <div className="hidden lg:block">
          <Brand />
        </div>
        <p className="mt-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground lg:mt-8">
          Workspace
        </p>
        <nav className="mt-3 space-y-1" aria-label="Workspace navigation">
          {adminLinks.map(({ label, to, icon: Icon, exact }) => {
            const active = exact ? path === to : path.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex items-center gap-3 rounded-md bg-blue/15 px-3 py-2.5 text-sm font-medium text-blue-ink"
                    : "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-card hover:text-foreground"
                }
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 border-t border-border pt-4">
          <Link
            to="/blogs"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-card hover:text-foreground"
          >
            <ArrowUpRight className="size-4 shrink-0" />
            View live site
          </Link>
        </div>

        <div className="mt-auto rounded-lg border border-gold/20 bg-gold/10 p-4">
          <p className="text-xs font-semibold text-gold-ink">Frontend preview</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Changes in this workspace are not saved or published.
          </p>
        </div>
      </aside>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          aria-label="Close workspace menu"
          onClick={() => setOpen(false)}
        />
      )}

      <main className="min-w-0 lg:pl-64">{children}</main>
    </div>
  );
}
