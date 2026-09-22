import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, Eye, FilePenLine, FilePlus2 } from "lucide-react";

import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/blog-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Linuxers E-Cell" },
      { name: "description", content: "Frontend preview of the Linuxers E-Cell dashboard." },
      { property: "og:title", content: "Linuxers E-Cell Dashboard" },
      {
        property: "og:description",
        content: "A frontend dashboard mockup for managing Linuxers stories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-gold-ink">Workspace</p>
            <h1 className="mt-2 truncate font-display text-3xl font-semibold sm:text-4xl">
              Dashboard
            </h1>
          </div>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/admin/editor">
              <FilePlus2 className="size-4" />
              New blog
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {/* Counts derive from the real post list rather than invented figures. */}
          {[
            {
              l: "Published",
              v: String(posts.length).padStart(2, "0"),
              i: Eye,
              c: "text-gold-ink",
            },
            { l: "Drafts", v: "00", i: FilePenLine, c: "text-blue-ink" },
            { l: "In review", v: "00", i: Clock3, c: "text-gold-ink" },
            { l: "Total reads", v: "—", i: ArrowUpRight, c: "text-blue-ink" },
          ].map(({ l, v, i: Icon, c }) => (
            <div key={l} className="rounded-lg border border-border bg-surface p-4 sm:p-5">
              <Icon className={`size-5 ${c}`} />
              <p className="mt-8 text-xs text-muted-foreground">{l}</p>
              <p className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)]">
          <section className="overflow-hidden rounded-lg border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="font-display text-xl font-semibold">Recent stories</h2>
                <p className="mt-1 text-sm text-muted-foreground">Latest activity</p>
              </div>
              <Link to="/admin/blogs" className="text-sm font-semibold text-blue-ink">
                View all
              </Link>
            </div>
            {posts.length === 0 && (
              <div className="px-5 py-14 text-center">
                <p className="text-sm text-muted-foreground">No stories yet.</p>
                <Button asChild variant="outline" className="mt-5">
                  <Link to="/admin/editor">
                    <FilePlus2 className="size-4" />
                    Write the first one
                  </Link>
                </Button>
              </div>
            )}
            <div className="divide-y divide-border">
              {posts.slice(0, 5).map((post, index) => (
                <div
                  key={post.slug}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 sm:p-5"
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
                      <p className="mt-1 text-xs text-muted-foreground">
                        {post.category} · {post.date}
                      </p>
                    </div>
                  </div>
                  <span className={index === 1 || index === 4 ? "badge-blue" : "badge-gold"}>
                    {index === 1 || index === 4 ? "Draft" : "Published"}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <aside className="space-y-6">
            {/* Chart frame with no invented data behind it. */}
            <div className="rounded-lg border border-border bg-surface p-5">
              <h2 className="font-display text-lg font-semibold">Publishing rhythm</h2>
              <div className="mt-6 flex h-36 items-end gap-2" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-sm border border-dashed border-border"
                  />
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Activity appears once stories are published.
              </p>
            </div>
            <div className="rounded-lg border border-gold/25 bg-gold/10 p-5">
              <p className="text-xs font-bold uppercase text-gold-ink">Get started</p>
              <h3 className="mt-4 font-display text-xl font-semibold">Publish your first story</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Draft it in the editor, add a banner, and preview before publishing.
              </p>
              <Button asChild variant="outline" className="mt-6 w-full">
                <Link to="/admin/editor">Open editor</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </AdminShell>
  );
}
