import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Copy, Linkedin, Share2, Twitter } from "lucide-react";
import { useState } from "react";

import { BlogCard } from "@/components/blog-card";
import { PublicPage } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import {
  getAdjacentPosts,
  getPostBySlug,
  getRelatedPosts,
  type ContentBlock,
  type Post,
} from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post, ...getAdjacentPosts(params.slug), related: getRelatedPosts(params.slug) };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    return {
      meta: [
        { title: `${post.title} — ${siteConfig.fullName}` },
        { name: "description", content: post.excerpt },
        { name: "author", content: post.author },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: post.image },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
});

/** Renders one typed content block with the shared `.article-prose` styles. */
function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "lead":
      return <p className="lead">{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return <p>{block.text}</p>;
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre>
          <code>{block.code}</code>
        </pre>
      );
    case "image":
      return (
        <figure>
          <img src={block.src} alt={block.alt} loading="lazy" width={1200} height={800} />
          <figcaption className="caption">{block.caption}</figcaption>
        </figure>
      );
  }
}

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="icon" aria-label={`Share "${title}" on LinkedIn`}>
        <Linkedin className="size-4" />
      </Button>
      <Button variant="outline" size="icon" aria-label={`Share "${title}" on X`}>
        <Twitter className="size-4" />
      </Button>
      <Button variant="outline" size="icon" aria-label={`Share "${title}"`}>
        <Share2 className="size-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={copyLink}>
        {copied ? <Check className="size-4 text-gold-ink" /> : <Copy className="size-4" />}
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}

function AdjacentLink({ post, direction }: { post: Post; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      to="/blogs/$slug"
      params={{ slug: post.slug }}
      className={`group bg-background p-6 transition hover:bg-surface sm:p-8 ${
        isNext ? "sm:text-right" : ""
      }`}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {isNext ? "Next story" : "Previous story"}
      </span>
      <span
        className={`mt-3 flex items-center gap-2 font-display text-base font-semibold leading-snug text-balance group-hover:text-blue-ink sm:text-lg ${
          isNext ? "sm:justify-end" : ""
        }`}
      >
        {!isNext && <ArrowLeft className="size-4 shrink-0" />}
        {post.title}
        {isNext && <ArrowRight className="size-4 shrink-0" />}
      </span>
    </Link>
  );
}

function ArticlePage() {
  const { post, previous, next, related } = Route.useLoaderData();
  const isPrimary = post.category === "Deep Tech" || post.category === "Linux";

  return (
    <PublicPage>
      <article>
        <header className="mx-auto max-w-5xl px-4 pb-10 pt-12 sm:px-6 sm:pt-20">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <span className={isPrimary ? "badge-blue" : "badge-gold"}>{post.category}</span>
            <span className="text-xs text-muted-foreground">{post.readTime}</span>
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-3xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full border border-blue/40 bg-blue/15 font-display text-sm font-bold text-blue-ink"
                aria-hidden="true"
              >
                {post.author.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{post.author}</p>
                <p className="text-xs text-muted-foreground">
                  {post.authorRole} · {post.date}
                </p>
              </div>
            </div>
            <ShareBar title={post.title} />
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <img
            src={post.image}
            alt={`Banner image for ${post.title}`}
            width={1600}
            height={1000}
            className="aspect-[16/10] w-full rounded-lg object-cover sm:aspect-[16/8]"
          />
        </div>

        <div className="article-prose mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
          {post.content.map((block, index) => (
            <Block key={index} block={block} />
          ))}

          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-5 sm:p-6">
            <p className="text-sm text-muted-foreground">Found this useful? Pass it along.</p>
            <ShareBar title={post.title} />
          </div>
        </div>

        {(previous || next) && (
          <nav
            className="mx-auto grid max-w-5xl gap-px border-y border-border bg-border sm:grid-cols-2"
            aria-label="Article navigation"
          >
            {previous ? (
              <AdjacentLink post={previous} direction="previous" />
            ) : (
              <div className="hidden bg-background sm:block" />
            )}
            {next ? (
              <AdjacentLink post={next} direction="next" />
            ) : (
              <div className="hidden bg-background sm:block" />
            )}
          </nav>
        )}
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="badge-gold">Keep reading</span>
              <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">More stories</h2>
            </div>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-ink"
            >
              All stories <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      )}
    </PublicPage>
  );
}
