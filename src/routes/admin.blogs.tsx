import { Link, createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FilePlus2, MoreHorizontal, Search, SquarePen, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/blog-data";

export const Route = createFileRoute("/admin/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs — Linuxers Workspace" },
      { name: "description", content: "Frontend mockup of the Linuxers blog management table." },
      { property: "og:title", content: "Linuxers Blog Management" },
      {
        property: "og:description",
        content: "Review, edit, and publish Linuxers E-Cell blog posts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminBlogsPage,
});

const statuses = ["All", "Published", "Draft", "In review"] as const;

/** Deterministic placeholder workflow state — the mockup has no backend. */
const statusFor = (index: number) =>
  index % 4 === 1 ? "Draft" : index % 4 === 3 ? "In review" : "Published";

const viewsFor = (index: number) => `${(4.8 - index * 0.55).toFixed(1)}k`;

function StatusBadge({ status }: { status: string }) {
  if (status === "Published") return <span className="badge-gold">Published</span>;
  if (status === "Draft") return <span className="badge-blue">Draft</span>;
  return (
    <span className="inline-flex rounded-sm border border-border bg-card px-2 py-0.5 text-[11px] font-bold uppercase text-muted-foreground">
      In review
    </span>
  );
}

function AdminBlogsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("All");

  const rows = useMemo(
    () =>
      posts
        .map((post, index) => ({ post, status: statusFor(index), views: viewsFor(index) }))
        .filter(
          (row) =>
            (status === "All" || row.status === status) &&
            `${row.post.title} ${row.post.author} ${row.post.category}`
              .toLowerCase()
              .includes(query.toLowerCase()),
        ),
    [query, status],
  );

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-gold-ink">Content library</p>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Blogs</h1>
          </div>
          <Button asChild>
            <Link to="/admin/editor">
              <FilePlus2 className="size-4" />
              <span className="hidden sm:inline">New blog</span>
            </Link>
          </Button>
        </div>

        {/* Filters stay hidden until there is something to filter. */}
        {posts.length > 0 && (
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Search stories</span>
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, author, or category"
                className="h-10 w-full rounded-md border border-input bg-surface pl-10 pr-4 text-sm outline-hidden transition focus:border-blue focus:ring-2 focus:ring-blue/25"
              />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {statuses.map((item) => (
                <button
                  key={item}
                  onClick={() => setStatus(item)}
                  className={
                    status === item
                      ? "shrink-0 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
                      : "shrink-0 rounded-md border border-border bg-surface px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {posts.length > 0 && (
          <p className="mt-5 text-sm text-muted-foreground">
            {rows.length} {rows.length === 1 ? "story" : "stories"}
          </p>
        )}

        {posts.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-border px-6 py-20 text-center">
            <h2 className="font-display text-xl font-semibold">No stories yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Stories you publish will be listed here with their status and author.
            </p>
            <Button asChild className="mt-6">
              <Link to="/admin/editor">
                <FilePlus2 className="size-4" />
                New blog
              </Link>
            </Button>
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-border py-20 text-center">
            <h2 className="font-display text-xl font-semibold">No stories match</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term or status.
            </p>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface">
            {/* Column headers are desktop-only; each row becomes a stacked card on small screens. */}
            <div className="hidden grid-cols-[minmax(0,2.4fr)_1fr_1fr_0.8fr_auto] gap-4 border-b border-border px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground lg:grid">
              <span>Story</span>
              <span>Category</span>
              <span>Author</span>
              <span>Reads</span>
              <span className="sr-only">Actions</span>
            </div>
            <div className="divide-y divide-border">
              {rows.map(({ post, status: rowStatus, views }) => (
                <div
                  key={post.slug}
                  className="grid grid-cols-1 gap-3 p-4 transition hover:bg-card/40 sm:p-5 lg:grid-cols-[minmax(0,2.4fr)_1fr_1fr_0.8fr_auto] lg:items-center lg:gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      width={120}
                      height={80}
                      className="h-12 w-16 shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{post.title}</p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {post.date} · {post.readTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:block">
                    <StatusBadge status={rowStatus} />
                    <span className="text-xs text-muted-foreground lg:hidden">{post.category}</span>
                  </div>

                  <span className="hidden truncate text-sm text-muted-foreground lg:block">
                    {post.author}
                  </span>
                  <span className="hidden text-sm text-muted-foreground lg:block">{views}</span>

                  <div className="flex items-center gap-1 justify-self-start lg:justify-self-end">
                    <Button asChild variant="ghost" size="icon" aria-label={`Edit ${post.title}`}>
                      <Link to="/admin/editor">
                        <SquarePen className="size-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" aria-label={`View ${post.title}`}>
                      <Link to="/blogs/$slug" params={{ slug: post.slug }}>
                        <ExternalLink className="size-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" aria-label={`Delete ${post.title}`}>
                      <Trash2 className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`More options for ${post.title}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
