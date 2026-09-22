import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import type { Post } from "@/lib/blog-data";

export function BlogCard({ post }: { post: Post }) {
  const isPrimary = post.category === "Deep Tech" || post.category === "Linux";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-glow">
      <div className="aspect-[16/10] overflow-hidden bg-card">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          width={1200}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className={isPrimary ? "badge-blue" : "badge-gold"}>{post.category}</span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        <h2 className="font-display text-xl font-semibold leading-snug text-balance transition-colors group-hover:text-blue-ink">
          {/* Stretched link: the whole card is the click target, with one accessible name. */}
          <Link
            to="/blogs/$slug"
            params={{ slug: post.slug }}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div className="min-w-0 text-xs text-muted-foreground">
            <span className="block truncate text-foreground">{post.author}</span>
            {post.date}
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-gold-ink transition-colors group-hover:text-gold-ink">
            Read more{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
