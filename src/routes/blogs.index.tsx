import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PenLine, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { BlogCard } from "@/components/blog-card";
import { PublicPage } from "@/components/site-shell";
import { categories, posts, type Post } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: `Blog — ${siteConfig.fullName}` },
      {
        name: "description",
        content: `Stories, updates, and learnings from the ${siteConfig.fullName} community at ${siteConfig.college}.`,
      },
      { property: "og:title", content: `Blog — ${siteConfig.fullName}` },
      {
        property: "og:description",
        content: `Stories, updates, and learnings from the ${siteConfig.fullName} community.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogsPage,
});

const matches = (post: Post, category: string, query: string) =>
  (category === "All" || post.category === category) &&
  `${post.title} ${post.excerpt} ${post.author}`.toLowerCase().includes(query.toLowerCase());

/** Wide lead card for the flagged post, shown only on the unfiltered listing. */
function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="glass-card glass-card-interactive group grid grid-cols-1 overflow-hidden lg:grid-cols-2">
      <div className="relative aspect-[16/10] overflow-hidden bg-card lg:aspect-auto lg:min-h-[22rem]">
        <img
          src={post.image}
          alt=""
          width={1600}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-md border border-gold/40 bg-background/80 px-3 py-1 text-[11px] font-bold uppercase text-gold-ink backdrop-blur-sm">
          Featured
        </span>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge-blue">{post.category}</span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        <h2 className="mt-5 font-display text-2xl font-semibold leading-snug text-balance transition-colors group-hover:text-blue-ink sm:text-3xl lg:text-4xl">
          <Link
            to="/blogs/$slug"
            params={{ slug: post.slug }}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 leading-7 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 text-xs text-muted-foreground">
            <span className="block truncate text-sm text-foreground">{post.author}</span>
            {post.date}
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-gold-ink">
            Read story{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

function BlogsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => posts.filter((post) => matches(post, category, query)),
    [category, query],
  );

  // The lead card only earns its space on the unfiltered listing; once someone
  // searches or picks a category, every result belongs in the same grid.
  const isBrowsing = category === "All" && query.trim() === "";
  const featured = isBrowsing ? posts.find((post) => post.featured) : undefined;
  const gridPosts = featured ? filtered.filter((post) => post.slug !== featured.slug) : filtered;

  const countFor = (item: string) => posts.filter((post) => matches(post, item, query)).length;

  return (
    <PublicPage>
      <section className="ambient-canvas border-b border-border bg-surface/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <span className="badge-blue">{siteConfig.fullName}</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold text-balance sm:text-6xl">
            Blog
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Stories, updates, and learnings from the {siteConfig.fullName} community at{" "}
            {siteConfig.college}.
          </p>

          {/* Search and filters only make sense once something is published. */}
          {posts.length > 0 && (
            <>
              <div className="mt-9 max-w-2xl">
                <label className="relative block">
                  <span className="sr-only">Search articles</span>
                  <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search stories, topics, and people"
                    className="glass-panel h-12 w-full rounded-md pl-12 pr-4 text-sm outline-hidden transition focus:border-blue focus:ring-2 focus:ring-blue/25"
                  />
                </label>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
                {categories.map((item) => {
                  const count = countFor(item);
                  return (
                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      aria-pressed={category === item}
                      className={
                        category === item
                          ? "flex shrink-0 items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
                          : "glass-panel flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                      }
                    >
                      {item}
                      <span
                        className={
                          category === item
                            ? "text-[10px] opacity-75"
                            : "text-[10px] text-muted-foreground"
                        }
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        {posts.length > 0 && (
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "story" : "stories"}
            </p>
            <p className="hidden text-xs uppercase text-muted-foreground sm:block">Latest first</p>
          </div>
        )}

        {posts.length === 0 ? (
          /* Nothing published yet — distinct from a search that returned nothing. */
          <div className="rounded-lg border border-dashed border-border px-6 py-20 text-center sm:py-24">
            <PenLine className="mx-auto size-8 text-blue-ink" />
            <h2 className="mt-6 font-display text-2xl font-semibold">Coming soon</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              The first {siteConfig.fullName} story will be published here.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-24 text-center">
            <h2 className="font-display text-2xl font-semibold">No stories found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-6">
                <FeaturedPost post={featured} />
              </div>
            )}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </PublicPage>
  );
}
