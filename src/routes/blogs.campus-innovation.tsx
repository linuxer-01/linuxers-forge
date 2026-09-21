import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Copy, Linkedin, Share2 } from "lucide-react";
import { useState } from "react";

import linuxersLab from "@/assets/linuxers-lab.jpg";
import roboticsStory from "@/assets/robotics-story.jpg";
import { PublicPage } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blogs/campus-innovation")({
  head: () => ({ meta: [
    { title: "The Architecture of Campus-Led Innovation Units — Linuxers" },
    { name: "description", content: "How decentralized student teams turn technical curiosity into ventures built for the real world." },
    { property: "og:title", content: "The Architecture of Campus-Led Innovation Units" },
    { property: "og:description", content: "A Linuxers deep dive into student teams, experimentation, and venture building." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ArticlePage,
});

function ArticlePage() {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => { if (typeof navigator !== "undefined") { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } };
  return <PublicPage><article>
    <header className="mx-auto max-w-5xl px-4 pb-10 pt-16 sm:px-6 sm:pt-24"><Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4"/>Back to editorial</Link><div className="mt-10 flex flex-wrap items-center gap-3"><span className="badge-emerald">Deep Tech</span><span className="text-xs text-muted-foreground">12 min read</span></div><h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-balance sm:text-6xl">The Architecture of Campus-Led Innovation Units</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">How small, decentralized student teams turn technical curiosity into ventures built for the real world.</p><div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6"><div><p className="text-sm font-semibold">Aarav Menon</p><p className="text-xs text-muted-foreground">18 September 2026 · Linuxers Editorial</p></div><div className="flex items-center gap-2"><Button variant="outline" size="icon" aria-label="Share on LinkedIn"><Linkedin className="size-4"/></Button><Button variant="outline" size="icon" aria-label="Share article"><Share2 className="size-4"/></Button><Button variant="outline" size="sm" onClick={copyLink}><Copy className="size-4"/>{copied ? "Copied" : "Copy link"}</Button></div></div></header>
    <div className="mx-auto max-w-7xl px-4 sm:px-6"><img src={linuxersLab} alt="Linuxers students collaborating in a campus innovation laboratory" width={1600} height={1000} className="aspect-[16/8] w-full rounded-lg object-cover"/></div>
    <div className="article-prose mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="lead">The most interesting ventures on campus rarely begin with a pitch deck. They begin with an irritation: a process too slow, a tool too expensive, or a problem everyone has learned to tolerate.</p>
      <h2>Start with a compact, complete team</h2><p>Large committees are excellent at distributing information and poor at preserving momentum. Our working unit is deliberately small: one person close to the problem, one builder, and one person responsible for getting the prototype into someone else’s hands.</p><blockquote>“A student team does not need every answer. It needs a short path between a question and an honest test.”</blockquote>
      <p>The unit owns a weekly outcome, not a list of tasks. That subtle change keeps technical decisions connected to evidence from the people who might eventually use the product.</p>
      <h2>Use evidence as the operating system</h2><p>Every experiment should change a decision. If it cannot, the team is collecting theatre rather than evidence. We use a simple loop:</p><ol><li>Write the riskiest assumption in plain language.</li><li>Choose the smallest believable test.</li><li>Put it in front of five relevant people.</li><li>Record what changed—not what felt encouraging.</li></ol>
      <img src={roboticsStory} alt="Students testing a compact robotics prototype" loading="lazy" width={1200} height={800}/><p className="caption">A navigation prototype during its third hardware review.</p>
      <h2>Technical clarity compounds</h2><p>Fast does not mean careless. A readable foundation lets the next student join without reverse-engineering the previous week. For software teams, even a compact project benefits from an explicit decision record:</p>
      <pre><code>{`experiment: indoor-navigation-v3\nassumption: users trust obstacle alerts\nsignal: 4 of 5 complete route unaided\ndecision: continue; simplify audio feedback`}</code></pre>
      <h3>What we review each Friday</h3><ul><li>The clearest piece of user evidence.</li><li>The technical choice most likely to become expensive.</li><li>The one thing the team will intentionally not build next week.</li></ul>
      <h2>A laboratory, not a leaderboard</h2><p>Student ventures need ambition without artificial certainty. The goal of the unit is not to perform confidence. It is to develop the habit of converting uncertainty into a useful next move—and to leave behind a body of knowledge others can build upon.</p>
    </div>
    <nav className="mx-auto grid max-w-5xl gap-px border-y border-border bg-border sm:grid-cols-2" aria-label="Article navigation"><Link to="/blogs" className="bg-background p-6 hover:bg-surface"><span className="text-xs uppercase text-muted-foreground">Previous</span><span className="mt-2 flex items-center gap-2 font-display font-semibold"><ArrowLeft className="size-4"/>Why Open Source Is a Founder’s Advantage</span></Link><Link to="/blogs" className="bg-background p-6 text-left hover:bg-surface sm:text-right"><span className="text-xs uppercase text-muted-foreground">Next</span><span className="mt-2 flex items-center gap-2 font-display font-semibold sm:justify-end">From Breadboard to Field Test <ArrowRight className="size-4"/></span></Link></nav>
  </article></PublicPage>;
}