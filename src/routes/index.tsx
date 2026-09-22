import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Code2,
  Eye,
  Github,
  Globe2,
  Images,
  Instagram,
  Lightbulb,
  Linkedin,
  Mail,
  PenLine,
  Rocket,
  Users,
} from "lucide-react";

import { BlogCard } from "@/components/blog-card";
import { LinuxersLogo } from "@/components/linuxers-logo";
import { PublicPage } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/blog-data";
import { siteConfig, socialLinks } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.fullName} — ${siteConfig.college}` },
      { name: "description", content: siteConfig.hero.description },
      { property: "og:title", content: `${siteConfig.fullName} — ${siteConfig.college}` },
      { property: "og:description", content: siteConfig.hero.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  { icon: Lightbulb, title: "Learn", description: "Workshops and startup awareness sessions." },
  { icon: Code2, title: "Build", description: "Hackathons and collaborative projects." },
  { icon: Users, title: "Connect", description: "Networking and mentorship." },
  { icon: Rocket, title: "Launch", description: "Idea competitions and real ventures." },
];

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  website: Globe2,
};

function Index() {
  return (
    <PublicPage>
      {/* Hero */}
      <section className="ambient-canvas relative overflow-hidden border-b border-border">
        <div className="relative mx-auto flex min-h-[min(720px,80vh)] max-w-7xl items-center px-4 py-24 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <LinuxersLogo className="size-10 shrink-0 sm:size-12" />
              <div className="min-w-0 text-xs font-semibold uppercase leading-tight text-gold-ink">
                <span className="block">{siteConfig.fullName}</span>
                <span className="block text-muted-foreground">{siteConfig.college}</span>
              </div>
            </div>

            <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
              {siteConfig.hero.heading}
            </h1>
            <p className="mt-4 font-display text-xl font-medium text-blue-ink sm:text-3xl">
              {siteConfig.hero.subheading}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {siteConfig.hero.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/blogs">
                  Explore blogs <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#about">About us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About, vision, mission */}
      <section
        id="about"
        className="ambient-canvas mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="glass-card p-6 sm:p-8 lg:col-span-7">
            <span className="badge-blue">About {siteConfig.name}</span>
            <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold text-balance sm:text-4xl">
              {siteConfig.about.heading}
            </h2>
            {siteConfig.about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-5 max-w-2xl leading-7 text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="glass-card border-blue/30 bg-blue/10 p-6 sm:p-8 lg:col-span-5">
            <Eye className="size-7 text-blue-ink" />
            <p className="mt-10 text-xs font-bold uppercase text-blue-ink">Vision</p>
            <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-balance sm:text-2xl">
              {siteConfig.vision}
            </h3>
          </div>

          <div className="glass-card border-gold/30 bg-gold/10 p-6 sm:p-8 lg:col-span-5">
            <Rocket className="size-7 text-gold-ink" />
            <p className="mt-10 text-xs font-bold uppercase text-gold-ink">Mission</p>
            <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-balance sm:text-2xl">
              {siteConfig.mission}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div key={title} className="glass-card glass-card-interactive p-5">
                <Icon className="size-5 text-blue-ink" />
                <h3 className="mt-6 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog feed */}
      <section className="border-y border-border bg-surface/45 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="text-xs font-bold uppercase text-gold-ink">From the blog</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Stories and updates
              </h2>
            </div>
            <Link
              to="/blogs"
              className="hidden items-center gap-2 text-sm font-semibold text-blue-ink sm:flex"
            >
              All stories <ArrowRight className="size-4" />
            </Link>
          </div>
          {posts.length === 0 ? (
            <div className="mt-10 rounded-lg border border-dashed border-border px-6 py-16 text-center">
              <PenLine className="mx-auto size-7 text-blue-ink" />
              <h3 className="mt-5 font-display text-xl font-semibold">Coming soon</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Writing from the {siteConfig.fullName} community will be published here.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery — awaiting real event photography. */}
      <section className="ambient-canvas mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-8">
          <span className="badge-blue">Gallery</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Moments</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            {siteConfig.gallery.description}
          </p>
        </div>
        <div className="rounded-lg border border-dashed border-border bg-surface/40 px-6 py-20 text-center">
          <Images className="mx-auto size-8 text-blue-ink" />
          <h3 className="mt-5 font-display text-xl font-semibold">Coming soon</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Photos from our events and workshops will appear here.
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="border-y border-border bg-surface/45 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <span className="badge-gold">Our activities</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">What we run</h2>
          <div className="mt-8 rounded-lg border border-dashed border-border bg-background/40 px-6 py-16 text-center">
            <CalendarDays className="mx-auto size-8 text-gold-ink" />
            <h3 className="mt-5 font-display text-xl font-semibold">Coming soon</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              {siteConfig.activities.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="ambient-canvas mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-xl">
          <span className="badge-blue">Contact</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
            Get in touch with {siteConfig.name}.
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.key];
            const external = link.href.startsWith("http");
            return (
              <a
                key={link.key}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="glass-card glass-card-interactive group p-5"
              >
                <Icon className="size-6 text-muted-foreground transition-colors group-hover:text-gold-ink" />
                <span className="mt-8 block font-display font-semibold">{link.label}</span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">
                  {link.handle}
                </span>
                <ArrowRight className="mt-2 size-4 text-blue-ink transition-transform group-hover:translate-x-0.5" />
              </a>
            );
          })}
        </div>
      </section>
    </PublicPage>
  );
}
