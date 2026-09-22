import { createFileRoute } from "@tanstack/react-router";
import { Bold, Code2, Eye, ImagePlus, Italic, Link2, List, Save, Send, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import founderStory from "@/assets/founder-story.jpg";
import linuxWorkshop from "@/assets/linux-workshop.jpg";
import linuxersLab from "@/assets/linuxers-lab.jpg";
import roboticsStory from "@/assets/robotics-story.jpg";
import { AdminShell } from "@/components/admin-shell";
import { DropZone } from "@/components/drop-zone";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/editor")({
  head: () => ({
    meta: [
      { title: "Blog Editor — Linuxers" },
      { name: "description", content: "Frontend preview of the Linuxers MDX blog editor." },
      { property: "og:title", content: "Linuxers Blog Editor" },
      {
        property: "og:description",
        content: "Compose and preview blog posts in the Linuxers E-Cell workspace mockup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EditorPage,
});

const toolbar = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Link2, label: "Link" },
  { icon: List, label: "List" },
  { icon: Code2, label: "Code" },
];

const library = [
  { name: "linuxers-lab.jpg", src: linuxersLab },
  { name: "robotics-story.jpg", src: roboticsStory },
  { name: "linux-workshop.jpg", src: linuxWorkshop },
  { name: "founder-story.jpg", src: founderStory },
];

/** Structural scaffold only — no invented claims, so nothing here can ship as fact. */
const initialBody = `## Section heading

Write the opening paragraph here.

> Pull out a quote worth remembering.

- First point
- Second point
- Third point`;

/**
 * Minimal Markdown renderer for the preview pane, covering what the toolbar
 * produces: headings, quotes, bullet lists, images and paragraphs. The mockup
 * has no MDX pipeline, so this keeps the preview honest about the real draft
 * instead of showing canned text.
 */
function renderPreview(source: string) {
  const blocks: ReactNode[] = [];
  const lines = source.split("\n");
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(<p key={`p-${blocks.length}`}>{paragraph.join(" ")}</p>);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`}>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const raw of lines) {
    const line = raw.trim();
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

    if (!line) {
      flushAll();
    } else if (line.startsWith("### ")) {
      flushAll();
      blocks.push(<h3 key={`h3-${blocks.length}`}>{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      flushAll();
      blocks.push(<h2 key={`h2-${blocks.length}`}>{line.slice(3)}</h2>);
    } else if (line.startsWith("> ")) {
      flushAll();
      blocks.push(<blockquote key={`q-${blocks.length}`}>{line.slice(2)}</blockquote>);
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
    } else if (image) {
      flushAll();
      blocks.push(
        <figure key={`img-${blocks.length}`}>
          <img src={image[2]} alt={image[1] ?? ""} />
          {image[1] ? <figcaption className="caption">{image[1]}</figcaption> : null}
        </figure>,
      );
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushAll();

  return blocks.length ? blocks : <p className="text-muted-foreground">Nothing to preview yet.</p>;
}

function EditorPage() {
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(initialBody);
  const [banner, setBanner] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [attachments, setAttachments] = useState(library.slice(0, 2));

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  /** Appends an MDX image reference at the end of the draft body. */
  const insertImage = (name: string) => {
    setBody((current) => `${current.trimEnd()}\n\n![${name.replace(/\.[a-z]+$/, "")}](/${name})\n`);
    toast.success(`Inserted ${name} into the story`);
  };

  const removeAttachment = (name: string) => {
    setAttachments((current) => current.filter((file) => file.name !== name));
    toast(`Removed ${name}`);
  };

  const addAttachment = () => {
    const next = library.find((file) => !attachments.some((a) => a.name === file.name));
    if (!next) {
      toast("All sample photos are already attached");
      return;
    }
    setAttachments((current) => [...current, next]);
    toast.success(`Attached ${next.name}`);
  };

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-blue-ink">New post</p>
            <h1 className="mt-1 truncate font-display text-2xl font-semibold sm:text-3xl">
              Compose story
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPreview(!preview)}
              aria-label="Toggle preview"
              aria-pressed={preview}
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden sm:inline-flex"
              onClick={() => toast.success("Draft saved locally")}
            >
              <Save className="size-4" />
              Save draft
            </Button>
            <Button variant="gold" onClick={() => toast.success("Preview published")}>
              <Send className="size-4" />
              <span className="hidden sm:inline">Publish</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.7fr)]">
          <section className="min-w-0 space-y-5">
            <div>
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Story title"
                className="mt-2 w-full border-0 border-b border-border bg-transparent pb-3 font-display text-2xl font-semibold outline-hidden placeholder:text-muted-foreground focus:border-blue sm:text-4xl"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="slug">
                Slug
              </label>
              {/* Derived from the title so the URL always matches the story. */}
              <input
                id="slug"
                value={slug}
                readOnly
                placeholder="auto-generated-from-title"
                className="mt-2 h-10 w-full rounded-md border border-input bg-surface px-3 text-sm text-muted-foreground outline-hidden focus:border-blue"
              />
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
                {toolbar.map(({ icon: Icon, label }) => (
                  <Button key={label} variant="ghost" size="icon" aria-label={label}>
                    <Icon className="size-4" />
                  </Button>
                ))}
                <span className="ml-auto px-2 text-[10px] font-bold uppercase text-muted-foreground">
                  MDX
                </span>
              </div>
              {preview ? (
                <div className="article-prose min-h-[520px] p-5 sm:p-8">
                  <h1>{title || "Untitled story"}</h1>
                  {renderPreview(body)}
                </div>
              ) : (
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  aria-label="Story body in MDX"
                  className="min-h-[520px] w-full resize-y bg-background/50 p-5 font-mono text-sm leading-7 outline-hidden sm:p-8"
                />
              )}
            </div>
          </section>

          <aside className="min-w-0 space-y-5">
            <div className="rounded-lg border border-border bg-surface p-5">
              <h2 className="font-display font-semibold">Story settings</h2>
              <div className="mt-5 space-y-4">
                <label className="block text-xs font-semibold text-muted-foreground">
                  Category
                  <select
                    defaultValue="Deep Tech"
                    className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
                  >
                    <option>Deep Tech</option>
                    <option>Startups</option>
                    <option>Linux</option>
                    <option>Campus Ventures</option>
                  </select>
                </label>
                <label className="block text-xs font-semibold text-muted-foreground">
                  Author
                  <input
                    placeholder="Author name"
                    className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
                  />
                </label>
              </div>
            </div>

            <DropZone
              label="Banner image"
              hint="1600 × 900 recommended"
              onFiles={([name]) => {
                if (!name) return;
                setBanner(name);
                toast.success(`Banner set to ${name}`);
              }}
              preview={
                banner ? (
                  <span className="flex w-full flex-col items-center">
                    <img
                      src={linuxersLab}
                      alt=""
                      className="aspect-[16/9] w-full rounded-md object-cover"
                    />
                    <span className="mt-3 truncate text-sm font-semibold">{banner}</span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Drop another file to replace
                    </span>
                  </span>
                ) : undefined
              }
            />

            <DropZone
              label="Thumbnail"
              hint="1200 × 800 recommended"
              onFiles={([name]) => {
                if (!name) return;
                setThumbnail(name);
                toast.success(`Thumbnail set to ${name}`);
              }}
              preview={
                thumbnail ? (
                  <span className="flex w-full flex-col items-center">
                    <img
                      src={roboticsStory}
                      alt=""
                      className="aspect-[3/2] w-full rounded-md object-cover"
                    />
                    <span className="mt-3 truncate text-sm font-semibold">{thumbnail}</span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Drop another file to replace
                    </span>
                  </span>
                ) : undefined
              }
            />

            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display font-semibold">Attachments</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Attach photo"
                  onClick={addAttachment}
                >
                  <ImagePlus className="size-4" />
                </Button>
              </div>

              {attachments.length === 0 ? (
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  No photos attached yet. Use the button above to add one.
                </p>
              ) : (
                <>
                  <ul className="mt-4 grid grid-cols-2 gap-3">
                    {attachments.map((file) => (
                      <li key={file.name} className="group relative">
                        <img
                          src={file.src}
                          alt={file.name}
                          loading="lazy"
                          width={600}
                          height={400}
                          className="aspect-[4/3] w-full rounded-md border border-border object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeAttachment(file.name)}
                          aria-label={`Remove ${file.name}`}
                          className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-md border border-border bg-background/85 text-muted-foreground backdrop-blur-sm transition hover:text-destructive"
                        >
                          <X className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertImage(file.name)}
                          className="mt-1.5 w-full truncate rounded-md px-1 text-left text-[11px] text-muted-foreground transition hover:text-blue-ink"
                        >
                          Insert {file.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-5 text-muted-foreground">
                    Selecting a photo appends an MDX image reference to the story body.
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </AdminShell>
  );
}
