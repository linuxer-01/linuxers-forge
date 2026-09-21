import { Link, useRouterState } from "@tanstack/react-router";
import { FilePlus2, Files, Image, LayoutDashboard, Menu, Settings, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Brand } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

const adminLinks = [
  { label: "Dashboard", to: "/admin" as const, icon: LayoutDashboard },
  { label: "Blogs", to: "/blogs" as const, icon: Files },
  { label: "Create Blog", to: "/admin/editor" as const, icon: FilePlus2 },
  { label: "Media", to: "/admin" as const, icon: Image },
  { label: "Settings", to: "/admin" as const, icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border bg-background/90 px-4 backdrop-blur-xl lg:hidden">
        <Brand />
        <Button variant="ghost" size="icon" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close workspace menu" : "Open workspace menu"}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</Button>
      </header>
      <aside className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-surface p-5 transition-transform lg:translate-x-0`}>
        <Brand />
        <p className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
        <nav className="mt-3 space-y-1">
          {adminLinks.map(({ label, to, icon: Icon }, index) => {
            const active = index < 3 && (path === to || (to === "/admin/editor" && path.startsWith(to)));
            return <Link key={`${label}-${index}`} to={to} onClick={() => setOpen(false)} className={active ? "flex items-center gap-3 rounded-md bg-purple/15 px-3 py-2.5 text-sm font-medium text-purple-soft" : "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground"}><Icon className="size-4 shrink-0" />{label}</Link>;
          })}
        </nav>
        <div className="mt-auto rounded-lg border border-emerald/20 bg-emerald/10 p-4">
          <p className="text-xs font-semibold text-emerald">Frontend preview</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Changes in this workspace are not saved or published.</p>
        </div>
      </aside>
      {open && <button type="button" className="fixed inset-0 z-30 bg-background/70 lg:hidden" aria-label="Close workspace menu" onClick={() => setOpen(false)} />}
      <main className="min-w-0 lg:pl-64">{children}</main>
    </div>
  );
}