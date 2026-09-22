import { createFileRoute } from "@tanstack/react-router";
import { Github, Globe2, Instagram, Linkedin, Mail, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { siteConfig, socialLinks } from "@/lib/site-config";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Linuxers Workspace" },
      { name: "description", content: "Frontend mockup of the Linuxers workspace settings." },
      { property: "og:title", content: "Linuxers Workspace Settings" },
      {
        property: "og:description",
        content: "Publication details, social links, and preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminSettingsPage,
});

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  website: Globe2,
};

const preferences = [
  {
    label: "Comments on new stories",
    description: "Allow readers to respond under published articles.",
    on: true,
  },
  {
    label: "Require review before publishing",
    description: "Every draft needs one approval before publishing.",
    on: true,
  },
  {
    label: "Weekly digest",
    description: "Send subscribers a summary of new stories each Friday.",
    on: false,
  },
];

function Field({
  label,
  defaultValue,
  hint,
}: {
  label: string;
  defaultValue: string;
  hint?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        defaultValue={defaultValue}
        className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-hidden transition focus:border-blue focus:ring-2 focus:ring-blue/25"
      />
      {hint && <p className="mt-2 text-xs leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

/** Presentational switch — the mockup keeps state locally and saves nothing. */
function Toggle({ on, label }: { on: boolean; label: string }) {
  const [enabled, setEnabled] = useState(on);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => setEnabled((value) => !value)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
        enabled ? "border-gold/50 bg-gold/70" : "border-border bg-card"
      }`}
    >
      <span
        className={`absolute top-0.5 size-4.5 rounded-full bg-foreground transition-all ${
          enabled ? "left-[calc(100%-1.25rem)]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function AdminSettingsPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-gold-ink">Workspace</p>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Settings</h1>
          </div>
          <Button variant="gold" onClick={() => toast.success("Settings saved locally")}>
            <Save className="size-4" />
            <span className="hidden sm:inline">Save changes</span>
          </Button>
        </div>

        <section className="mt-8 rounded-lg border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold">Publication</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            How the publication is described across the site.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Publication name" defaultValue={siteConfig.name} />
            <Field label="Tagline" defaultValue={siteConfig.tagline} />
            <div className="sm:col-span-2">
              <label htmlFor="description" className="text-xs font-semibold text-muted-foreground">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                defaultValue={siteConfig.hero.description}
                className="mt-2 w-full resize-y rounded-md border border-input bg-background p-3 text-sm leading-6 outline-hidden transition focus:border-blue focus:ring-2 focus:ring-blue/25"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold">Social links</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Shown in the site footer and the contact section.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.key];
              return (
                <div key={link.key}>
                  <label
                    htmlFor={`social-${link.key}`}
                    className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
                  >
                    <Icon className="size-4 text-blue-ink" />
                    {link.label}
                  </label>
                  <input
                    id={`social-${link.key}`}
                    defaultValue={link.handle}
                    className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-hidden transition focus:border-blue focus:ring-2 focus:ring-blue/25"
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold">Publishing preferences</h2>
          <div className="mt-6 divide-y divide-border">
            {preferences.map((preference) => (
              <div
                key={preference.label}
                className="flex items-start justify-between gap-5 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{preference.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {preference.description}
                  </p>
                </div>
                <Toggle on={preference.on} label={preference.label} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold">Danger zone</h2>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Archiving the publication hides every story from readers. This preview does not change
              any data.
            </p>
            <Button variant="outline" className="border-destructive/40 text-destructive-ink">
              Archive publication
            </Button>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
