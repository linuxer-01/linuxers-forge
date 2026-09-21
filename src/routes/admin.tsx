import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, Eye, FilePenLine, FilePlus2 } from "lucide-react";

import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/blog-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Editorial Workspace — Linuxers" },
    { name: "description", content: "Frontend preview of the Linuxers editorial dashboard." },
    { property: "og:title", content: "Linuxers Editorial Workspace" },
    { property: "og:description", content: "A frontend dashboard mockup for managing Linuxers stories." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}),
  component: AdminPage,
});

function AdminPage() {
  return <AdminShell><div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-10"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"><div className="min-w-0"><p className="text-xs font-bold uppercase text-emerald">Editorial laboratory</p><h1 className="mt-2 truncate font-display text-3xl font-semibold sm:text-4xl">Good afternoon, Ananya.</h1></div><Button asChild className="hidden sm:inline-flex"><Link to="/admin/editor"><FilePlus2 className="size-4"/>New blog</Link></Button></div>
    <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">{[{l:'Published',v:'24',i:Eye,c:'text-emerald'},{l:'Drafts',v:'04',i:FilePenLine,c:'text-purple-soft'},{l:'In review',v:'03',i:Clock3,c:'text-emerald-soft'},{l:'Total reads',v:'18.2k',i:ArrowUpRight,c:'text-purple-soft'}].map(({l,v,i:Icon,c})=><div key={l} className="rounded-lg border border-border bg-surface p-4 sm:p-5"><Icon className={`size-5 ${c}`}/><p className="mt-8 text-xs text-muted-foreground">{l}</p><p className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{v}</p></div>)}</div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)]"><section className="overflow-hidden rounded-lg border border-border bg-surface"><div className="flex items-center justify-between border-b border-border p-5"><div><h2 className="font-display text-xl font-semibold">Recent stories</h2><p className="mt-1 text-sm text-muted-foreground">Latest editorial activity</p></div><Link to="/blogs" className="text-sm font-semibold text-purple-soft">View site</Link></div><div className="divide-y divide-border">{posts.slice(0,5).map((post,index)=><div key={post.slug} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 sm:p-5"><div className="flex min-w-0 items-center gap-3"><img src={post.image} alt="" loading="lazy" width={120} height={80} className="h-12 w-16 shrink-0 rounded-md object-cover"/><div className="min-w-0"><p className="truncate text-sm font-semibold">{post.title}</p><p className="mt-1 text-xs text-muted-foreground">{post.category} · {post.date}</p></div></div><span className={index===1||index===4?'badge-purple':'badge-emerald'}>{index===1||index===4?'Draft':'Published'}</span></div>)}</div></section>
      <aside className="space-y-6"><div className="rounded-lg border border-border bg-surface p-5"><h2 className="font-display text-lg font-semibold">Publishing rhythm</h2><div className="mt-6 flex h-36 items-end gap-2">{[42,58,34,75,54,88,66].map((height,index)=><div key={index} className="flex-1 rounded-t-sm bg-purple/70" style={{height:`${height}%`}}/>)}</div><div className="mt-3 flex justify-between text-[10px] uppercase text-muted-foreground"><span>Mon</span><span>Sun</span></div></div><div className="rounded-lg border border-emerald/25 bg-emerald/10 p-5"><p className="text-xs font-bold uppercase text-emerald">Next review</p><h3 className="mt-4 font-display text-xl font-semibold">Friday editorial circle</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Three drafts are ready for peer review.</p><Button asChild variant="outline" className="mt-6 w-full"><Link to="/admin/editor">Open editor</Link></Button></div></aside>
    </div>
  </div></AdminShell>;
}