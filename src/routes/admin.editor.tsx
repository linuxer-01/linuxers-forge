import { createFileRoute } from "@tanstack/react-router";
import { Bold, Code2, Eye, ImagePlus, Italic, Link2, List, Save, Send, UploadCloud } from "lucide-react";
import { useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/editor")({
  head: () => ({ meta: [
    { title: "Blog Editor — Linuxers" },
    { name: "description", content: "Frontend preview of the Linuxers MDX blog editor." },
    { property: "og:title", content: "Linuxers Blog Editor" },
    { property: "og:description", content: "Compose and preview editorial stories in the Linuxers workspace mockup." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}),
  component: EditorPage,
});

function EditorPage() {
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Designing Campus Innovation Units That Actually Ship");
  const [body, setBody] = useState("## Start with a compact, complete team\n\nLarge committees distribute information. Small teams preserve momentum.\n\n> A student team needs a short path between a question and an honest test.\n\n- Name the riskiest assumption\n- Design the smallest believable test\n- Record what changed");
  const notify = (text:string) => { setMessage(text); window.setTimeout(()=>setMessage(""),2200); };
  return <AdminShell><div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><div className="min-w-0"><p className="text-xs font-bold uppercase text-purple-soft">New editorial</p><h1 className="mt-1 truncate font-display text-2xl font-semibold sm:text-3xl">Compose story</h1></div><div className="flex items-center gap-2"><Button variant="outline" size="icon" onClick={()=>setPreview(!preview)} aria-label="Toggle preview"><Eye className="size-4"/></Button><Button variant="outline" className="hidden sm:inline-flex" onClick={()=>notify('Draft saved locally')}><Save className="size-4"/>Save draft</Button><Button variant="emerald" onClick={()=>notify('Preview published')}><Send className="size-4"/><span className="hidden sm:inline">Publish</span></Button></div></div>{message&&<div className="fixed right-4 top-20 z-50 rounded-md border border-emerald/30 bg-surface px-4 py-3 text-sm text-emerald shadow-glow">{message}</div>}
    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.7fr)]"><section className="space-y-5"><div><label className="text-xs font-semibold text-muted-foreground" htmlFor="title">Title</label><input id="title" value={title} onChange={event=>setTitle(event.target.value)} className="mt-2 w-full border-0 border-b border-border bg-transparent pb-3 font-display text-2xl font-semibold outline-hidden focus:border-purple sm:text-4xl"/></div><div><label className="text-xs font-semibold text-muted-foreground" htmlFor="slug">Slug</label><input id="slug" defaultValue="designing-campus-innovation-units" className="mt-2 h-10 w-full rounded-md border border-input bg-surface px-3 text-sm outline-hidden focus:border-purple"/></div>
      <div className="overflow-hidden rounded-lg border border-border bg-surface"><div className="flex flex-wrap items-center gap-1 border-b border-border p-2">{[{i:Bold,l:'Bold'},{i:Italic,l:'Italic'},{i:Link2,l:'Link'},{i:List,l:'List'},{i:Code2,l:'Code'}].map(({i:Icon,l})=><Button key={l} variant="ghost" size="icon" aria-label={l}><Icon className="size-4"/></Button>)}<span className="ml-auto px-2 text-[10px] font-bold uppercase text-muted-foreground">MDX</span></div>{preview?<div className="article-prose min-h-[520px] p-5 sm:p-8"><h1>{title}</h1><h2>Start with a compact, complete team</h2><p>Large committees distribute information. Small teams preserve momentum.</p><blockquote>A student team needs a short path between a question and an honest test.</blockquote><ul><li>Name the riskiest assumption</li><li>Design the smallest believable test</li><li>Record what changed</li></ul></div>:<textarea value={body} onChange={event=>setBody(event.target.value)} className="min-h-[520px] w-full resize-y bg-background/50 p-5 font-mono text-sm leading-7 outline-hidden sm:p-8"/>}</div></section>
      <aside className="space-y-5"><div className="rounded-lg border border-border bg-surface p-5"><h2 className="font-display font-semibold">Story settings</h2><div className="mt-5 space-y-4"><label className="block text-xs font-semibold text-muted-foreground">Category<select defaultValue="Deep Tech" className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"><option>Deep Tech</option><option>Startups</option><option>Linux</option><option>Campus Ventures</option></select></label><label className="block text-xs font-semibold text-muted-foreground">Author<input defaultValue="Aarav Menon" className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"/></label></div></div>
      {[['Banner image','1600 × 900 recommended'],['Thumbnail','1200 × 800 recommended']].map(([label,hint])=><button key={label} onClick={()=>notify(`${label} selected`)} className="flex w-full flex-col items-center rounded-lg border border-dashed border-border bg-surface px-5 py-8 text-center transition hover:border-purple/50 hover:bg-card"><UploadCloud className="size-6 text-purple-soft"/><span className="mt-3 text-sm font-semibold">{label}</span><span className="mt-1 text-xs text-muted-foreground">{hint}</span></button>)}
      <div className="rounded-lg border border-border bg-surface p-5"><div className="flex items-center justify-between"><h2 className="font-display font-semibold">Attachments</h2><Button variant="ghost" size="icon" aria-label="Attach photo" onClick={()=>notify('Photo attachment selected')}><ImagePlus className="size-4"/></Button></div><p className="mt-3 text-xs leading-5 text-muted-foreground">Photos added here can be inserted into the MDX story.</p></div></aside></div>
  </div></AdminShell>;
}