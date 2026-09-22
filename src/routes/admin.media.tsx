import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Grid2x2, Rows3, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import founderStory from "@/assets/founder-story.jpg";
import linuxWorkshop from "@/assets/linux-workshop.jpg";
import linuxersLab from "@/assets/linuxers-lab.jpg";
import roboticsStory from "@/assets/robotics-story.jpg";
import { AdminShell } from "@/components/admin-shell";
import { DropZone } from "@/components/drop-zone";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/media")({
  head: () => ({
    meta: [
      { title: "Media — Linuxers Workspace" },
      { name: "description", content: "Frontend mockup of the Linuxers media library." },
      { property: "og:title", content: "Linuxers Media Library" },
      { property: "og:description", content: "Browse and organise images used in blog posts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminMediaPage,
});

const media = [
  { name: "linuxers-lab.jpg", src: linuxersLab, size: "1.8 MB", dimensions: "1600 × 1000" },
  { name: "robotics-story.jpg", src: roboticsStory, size: "1.2 MB", dimensions: "1200 × 800" },
  { name: "linux-workshop.jpg", src: linuxWorkshop, size: "1.4 MB", dimensions: "1200 × 800" },
  { name: "founder-story.jpg", src: founderStory, size: "1.1 MB", dimensions: "1200 × 800" },
];

function AdminMediaPage() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [copied, setCopied] = useState<string | null>(null);

  const copyName = async (name: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(`/assets/${name}`);
    }
    setCopied(name);
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-blue-ink">Asset library</p>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Media</h1>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-1">
            <Button
              variant={layout === "grid" ? "subtle" : "ghost"}
              size="icon"
              aria-label="Grid view"
              aria-pressed={layout === "grid"}
              onClick={() => setLayout("grid")}
            >
              <Grid2x2 className="size-4" />
            </Button>
            <Button
              variant={layout === "list" ? "subtle" : "ghost"}
              size="icon"
              aria-label="List view"
              aria-pressed={layout === "list"}
              onClick={() => setLayout("list")}
            >
              <Rows3 className="size-4" />
            </Button>
          </div>
        </div>

        {/* Shared with the blog editor; the mockup stores nothing. */}
        <DropZone
          label="Drop images to upload"
          hint="PNG, JPG, or WebP up to 10 MB. Uploads are not stored in this frontend preview."
          className="mt-8"
          onFiles={(names) =>
            toast.success(
              names.length === 1 ? `Received ${names[0]}` : `Received ${names.length} files`,
            )
          }
        />

        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Recent uploads</h2>
          <p className="text-sm text-muted-foreground">{media.length} files</p>
        </div>

        {layout === "grid" ? (
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {media.map((file) => (
              <figure
                key={file.name}
                className="group overflow-hidden rounded-lg border border-border bg-surface transition hover:border-blue/40 hover:shadow-glow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-card">
                  <img
                    src={file.src}
                    alt={file.name}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="p-3">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {file.dimensions} · {file.size}
                  </p>
                  <div className="mt-3 flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Copy path for ${file.name}`}
                      onClick={() => copyName(file.name)}
                    >
                      {copied === file.name ? (
                        <Check className="size-4 text-gold-ink" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" aria-label={`Delete ${file.name}`}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-5 overflow-hidden rounded-lg border border-border bg-surface divide-y divide-border">
            {media.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-4 p-4 transition hover:bg-card/40"
              >
                <img
                  src={file.src}
                  alt={file.name}
                  loading="lazy"
                  width={120}
                  height={80}
                  className="h-12 w-16 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {file.dimensions} · {file.size}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Copy path for ${file.name}`}
                    onClick={() => copyName(file.name)}
                  >
                    {copied === file.name ? (
                      <Check className="size-4 text-gold-ink" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" aria-label={`Delete ${file.name}`}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
