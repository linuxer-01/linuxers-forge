import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import type { posts } from "@/lib/blog-data";

type Post = (typeof posts)[number];

export function BlogCard({ post }: { post: Post }) {
  const isPrimary = post.category === "Deep Tech" || post.category === "Linux";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-purple/40 hover:shadow-glow">
      <div className="aspect-[16/10] overflow-hidden bg-card">
        <img src={post.image} alt="" loading="lazy" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className={isPrimary ? "badge-purple" : "badge-emerald"}>{post.category}</span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        <h2 className="font-display text-xl font-semibold leading-snug text-balance group-hover:text-purple-soft">{post.title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div className="min-w-0 text-xs text-muted-foreground"><span className="block truncate text-foreground">{post.author}</span>{post.date}</div>
          <Link to="/blogs/campus-innovation" aria-label={`Read ${post.title}`} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald transition-colors hover:text-emerald-soft">Read more <ArrowRight className="size-4" /></Link>
        </div>
      </div>
    </article>
  );
}
