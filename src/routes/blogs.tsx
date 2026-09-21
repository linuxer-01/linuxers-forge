import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { BlogCard } from "@/components/blog-card";
import { PublicPage } from "@/components/site-shell";
import { categories, posts } from "@/lib/blog-data";

export const Route = createFileRoute("/blogs")({
  head: () => ({ meta: [
    { title: "Editorial — Linuxers" },
    { name: "description", content: "Explore startup, deep tech, Linux, campus venture, and event stories from Linuxers." },
    { property: "og:title", content: "Linuxers Editorial" },
    { property: "og:description", content: "Field notes and thoughtful essays from Mahalakshmi Tech's builders." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: BlogsPage,
});

function BlogsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => posts.filter((post) => (category === "All" || post.category === category) && `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <PublicPage>
    <section className="border-b border-border bg-surface/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6"><span className="badge-purple">Linuxers Editorial</span><h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold text-balance sm:text-6xl">Field notes from people building before they feel ready.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Practical stories about startups, open technology, campus experiments, and everything we learn in public.</p>
        <div className="mt-9 max-w-2xl"><label className="relative block"><span className="sr-only">Search articles</span><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories, topics, and people" className="h-12 w-full rounded-md border border-input bg-background pl-12 pr-4 text-sm outline-hidden transition focus:border-purple focus:ring-2 focus:ring-purple/25"/></label></div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "shrink-0 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground" : "shrink-0 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"}>{item}</button>)}</div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20"><div className="mb-8 flex items-center justify-between"><p className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "story" : "stories"}</p><p className="hidden text-xs uppercase text-muted-foreground sm:block">Latest first</p></div>{filtered.length ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((post) => <BlogCard key={post.slug} post={post}/>)}</div> : <div className="rounded-lg border border-dashed border-border py-24 text-center"><h2 className="font-display text-2xl font-semibold">No stories found</h2><p className="mt-2 text-sm text-muted-foreground">Try a different search or category.</p></div>}</section>
  </PublicPage>;
}