import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Code2, Eye, Github, Globe2, Instagram, Linkedin, Lightbulb, Mail, Rocket, Users } from "lucide-react";

import founderStory from "@/assets/founder-story.jpg";
import linuxWorkshop from "@/assets/linux-workshop.jpg";
import linuxersLab from "@/assets/linuxers-lab.jpg";
import roboticsStory from "@/assets/robotics-story.jpg";
import { BlogCard } from "@/components/blog-card";
import { PublicPage } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/blog-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Linuxers — E-Cell of Mahalakshmi Tech" },
    { name: "description", content: "Linuxers is Mahalakshmi Tech's student-led entrepreneurship cell for builders, founders, and open-source thinkers." },
    { property: "og:title", content: "Linuxers — E-Cell of Mahalakshmi Tech" },
    { property: "og:description", content: "Ideas, ventures, and technical stories from Mahalakshmi Tech's student innovation community." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  return (
    <PublicPage>
      <section className="relative overflow-hidden border-b border-border">
        <img src={linuxersLab} alt="Linuxers students building a robotics prototype in the innovation lab" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/25" />
        <div className="relative mx-auto flex min-h-[min(760px,82vh)] max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase text-emerald"><span className="h-px w-8 bg-emerald" /> E-Cell of Mahalakshmi Tech</div>
            <h1 className="font-display text-5xl font-semibold leading-[0.98] text-balance sm:text-7xl lg:text-8xl">Linuxers</h1>
            <p className="mt-5 font-display text-xl font-medium text-purple-soft sm:text-2xl">Where technical depth becomes founder momentum.</p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">A student-led laboratory for ideas, open technology, and ventures with the courage to leave the whiteboard.</p>
            <Button asChild variant="emerald" size="lg" className="mt-8"><Link to="/blogs">Explore blogs <ArrowRight className="size-4" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 lg:col-span-7">
            <span className="badge-purple">About Linuxers</span>
            <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold text-balance sm:text-4xl">A practical community for people who would rather build than speculate.</h2>
            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">Linuxers brings together engineering, entrepreneurship, and open collaboration. We create the conditions for students to test ambitious ideas, learn from users, and ship useful work.</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[['26','Builders'],['08','Active teams'],['14','Sessions'],['04','Demo days']].map(([value,label]) => <div key={label} className="rounded-md border border-border bg-card/50 p-4"><strong className="font-display text-2xl">{value}</strong><span className="mt-1 block text-xs text-muted-foreground">{label}</span></div>)}
            </div>
          </div>
          <div className="rounded-lg border border-purple/30 bg-purple/10 p-6 sm:p-8 lg:col-span-5"><Eye className="size-7 text-purple-soft" /><p className="mt-10 text-xs font-bold uppercase text-purple-soft">Vision</p><h3 className="mt-3 font-display text-2xl font-semibold">Make campus the safest place to attempt something difficult.</h3><p className="mt-4 leading-7 text-muted-foreground">A culture where thoughtful risk, technical rigor, and honest feedback compound.</p></div>
          <div className="rounded-lg border border-emerald/30 bg-emerald/10 p-6 sm:p-8 lg:col-span-5"><Rocket className="size-7 text-emerald" /><p className="mt-10 text-xs font-bold uppercase text-emerald">Mission</p><h3 className="mt-3 font-display text-2xl font-semibold">Move ideas from curiosity to validated ventures.</h3><p className="mt-4 leading-7 text-muted-foreground">Through founder sessions, build nights, technical mentorship, and public learning.</p></div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            {[{i:Lightbulb,t:'Discover',d:'Find a real problem.'},{i:Code2,t:'Build',d:'Prototype with focus.'},{i:Users,t:'Learn',d:'Test with people.'},{i:Globe2,t:'Launch',d:'Share with the world.'}].map(({i:Icon,t,d}) => <div key={t} className="rounded-lg border border-border bg-surface p-5"><Icon className="size-5 text-purple-soft"/><h3 className="mt-6 font-display text-lg font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/45 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="flex items-end justify-between gap-5"><div><span className="text-xs font-bold uppercase text-emerald">From the editorial desk</span><h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Ideas worth building on</h2></div><Link to="/blogs" className="hidden items-center gap-2 text-sm font-semibold text-purple-soft sm:flex">All stories <ArrowRight className="size-4"/></Link></div><div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.slice(0,3).map((post) => <BlogCard key={post.slug} post={post} />)}</div></div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28"><div className="mb-10"><span className="badge-purple">Field notes</span><h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Life inside the laboratory</h2></div><div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:grid-cols-4"><img src={linuxersLab} alt="Students collaborating in the Linuxers lab" loading="lazy" width={1600} height={1000} className="col-span-2 row-span-2 h-full w-full rounded-lg object-cover"/><img src={roboticsStory} alt="A student robotics prototype" loading="lazy" width={1200} height={800} className="h-full w-full rounded-lg object-cover"/><img src={linuxWorkshop} alt="Linux workshop participants" loading="lazy" width={1200} height={800} className="h-full w-full rounded-lg object-cover"/><img src={founderStory} alt="A student founder discussion" loading="lazy" width={1200} height={800} className="col-span-2 h-full w-full rounded-lg object-cover"/></div></section>

      <section className="border-y border-border bg-surface/45 py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><span className="badge-emerald">Our activities</span><div className="mt-8 grid gap-4 md:grid-cols-3">{['Founder office hours','Build nights','Venture reviews'].map((title,index) => <div key={title} className="rounded-lg border border-dashed border-border bg-background/40 p-6"><span className="font-display text-5xl font-semibold text-card">0{index+1}</span><h3 className="mt-12 font-display text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The next session will appear here when announced.</p></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28"><div className="max-w-xl"><span className="badge-purple">Contact</span><h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Find us where builders gather.</h2></div><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{[{i:Instagram,l:'Instagram'},{i:Linkedin,l:'LinkedIn'},{i:Github,l:'GitHub'},{i:Mail,l:'Email'},{i:Globe2,l:'Website'}].map(({i:Icon,l},index)=><a key={l} href={index===3?'mailto:hello@linuxers.in':'#'} className="group rounded-lg border border-border bg-surface p-5 transition hover:border-emerald/40 hover:shadow-glow"><Icon className="size-6 text-muted-foreground group-hover:text-emerald"/><span className="mt-8 block font-display font-semibold">{l}</span><ArrowRight className="mt-2 size-4 text-purple-soft"/></a>)}</div></section>
    </PublicPage>
  );
}
