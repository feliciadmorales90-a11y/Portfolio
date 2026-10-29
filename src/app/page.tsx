import Image from "next/image";
import Link from "next/link";
import CraftRow from "@/components/CraftRow";
import { LinkedInIcon, MailIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import {
  aboutParagraphs,
  background,
  dailyTools,
  education,
  founderNote,
  heroIntro,
  otherClients,
  site,
  skillGroups,
  toolGroups,
} from "@/data/site";
import { brands, crafts } from "@/data/work";

const card = "rounded-2xl border border-card-border/60 bg-card-bg/40 backdrop-blur-sm p-6 md:p-8";
const eyebrow = "text-xs font-mono text-accent tracking-[0.2em] uppercase";
const workBrands = [
  ...(["futurestay", "scholar", "sqe", "verve"] as const).map((id) => brands[id].name),
  ...otherClients,
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 md:px-6 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-hero-bg rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 items-center px-8 md:px-12 lg:px-16 py-12 md:py-0">
              <div className="max-w-lg order-2 md:order-1">
                <Reveal>
                  <p className={`${eyebrow} mb-6`}>Content &amp; Digital Marketing</p>
                </Reveal>
                <Reveal delay={0.05}>
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-foreground">
                    Felicia <span className="text-accent">Morales</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-muted text-base md:text-lg max-w-md mt-6 leading-relaxed">{heroIntro}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Link
                      href="#work"
                      className="px-7 py-3 bg-foreground hover:bg-foreground/80 text-background rounded-full font-medium transition-all inline-flex items-center justify-center text-sm"
                    >
                      View My Work
                    </Link>
                    <a
                      href={site.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3 border border-foreground/20 text-foreground rounded-full font-medium hover:border-foreground/50 transition-all inline-flex items-center justify-center text-sm"
                    >
                      Download Resume
                    </a>
                  </div>
                </Reveal>
              </div>
              <div
                className="relative flex justify-center md:justify-end order-1 md:order-2"
                style={{ maskImage: "linear-gradient(black 65%, transparent 95%)", WebkitMaskImage: "linear-gradient(black 65%, transparent 95%)" }}
              >
                <Image
                  src="/felicia-hero.png"
                  alt="Felicia Morales, with hand-lettered notes: Hi, I'm Fey. Content & Partnership Marketer. Dog mom, Air Force vet, former medic, BA Poli Sci."
                  width={720}
                  height={900}
                  priority
                  sizes="(min-width: 768px) 440px, 280px"
                  className="relative z-10 h-[350px] sm:h-[450px] md:h-[550px] w-auto max-w-full object-contain object-center md:object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily tools */}
      <section className="py-16 px-6" aria-labelledby="daily-tools">
        <div className="max-w-6xl mx-auto text-center">
          <p id="daily-tools" className="text-muted text-sm mb-10">
            Tools I use on a daily basis.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {dailyTools.map((t) => (
              <li key={t.name} className="group flex flex-col items-center gap-2">
                <div className="transition-transform group-hover:scale-110 group-hover:-translate-y-1 duration-200">
                  <Image src={t.logo} alt="" width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
                <span className="text-xs text-muted/70 group-hover:text-muted transition-colors">{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className={`${eyebrow} mb-4`}>About</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-12">
              <span className="text-accent">Good Energy,</span> Better Metrics
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
            <Reveal className={`${card} md:col-span-3 flex flex-col justify-center`}>
              <div className="space-y-5">
                {aboutParagraphs.map((p) => (
                  <p key={p.slice(0, 20)} className="text-muted text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.05} className={`${card} md:col-span-2`}>
              <h3 className={`${eyebrow} mb-4`}>Skills</h3>
              <div className="space-y-4">
                {skillGroups.map((g) => (
                  <div key={g.name}>
                    <p className="text-xs font-semibold text-foreground/80 mb-2">{g.name}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <li key={s} className="px-2.5 py-1 text-xs border border-card-border rounded-full text-muted hover:border-accent hover:text-accent transition-colors">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className={`${card} md:col-span-3`}>
              <h3 className={`${eyebrow} mb-4`}>Tools &amp; Platforms</h3>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                {toolGroups.map((g) => (
                  <div key={g.name}>
                    <p className="text-xs font-semibold text-foreground/80 mb-2">{g.name}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {g.items.map((t) => (
                        <li key={t} className="px-2.5 py-1 text-xs bg-accent/5 border border-accent/15 rounded-full text-muted hover:bg-accent/10 hover:text-accent transition-colors">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.05} className={`${card} md:col-span-2 flex flex-col justify-between`}>
              <h3 className={`${eyebrow} mb-4`}>Background, Before The Marketing Pivot</h3>
              <div className="space-y-4">
                {background.map((b) => (
                  <div key={b.title}>
                    <p className="text-sm font-semibold text-foreground">{b.title}</p>
                    <p className="text-xs text-muted">{b.detail}</p>
                  </div>
                ))}
                <div className="pt-2 border-t border-card-border/40">
                  <p className="text-sm font-semibold text-foreground">Education</p>
                  <p className="text-xs text-muted">{education.degree}</p>
                  <p className="text-xs text-muted mt-1">{education.certs}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Work, by craft */}
      <section id="work" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-10">
            <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Work</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">What I make.</h2>
            <p className="text-muted text-lg mt-4 max-w-2xl">
              Organized by craft, so you can go straight to the kind of work you&apos;re hiring for. Every project names the brand it was for.
            </p>
            <nav aria-label="Crafts" className="flex flex-wrap gap-2 mt-8">
              {crafts.map((c) => (
                <a
                  key={c.slug}
                  href={`#${c.slug}`}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-card-border text-muted bg-background/60 hover:border-accent hover:text-accent transition-colors"
                >
                  {c.name}
                </a>
              ))}
            </nav>
          </Reveal>
          <div>
            {crafts.map((c, i) => (
              <CraftRow key={c.slug} craft={c} index={i} />
            ))}
          </div>

          <Reveal className="mt-12 pt-12 border-t border-card-border text-center">
            <p className="text-foreground font-mono text-sm tracking-widest uppercase mb-8">Brands I&apos;ve Worked With</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {workBrands.map((b) => (
                <li key={b} className="text-lg md:text-xl font-semibold text-foreground/40 hover:text-foreground transition-colors">
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-muted max-w-xl mx-auto">
              <span className="font-semibold text-foreground">Founder, {founderNote.name}.</span> {founderNote.detail}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Get In Touch</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">Let&apos;s build something that matters.</h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Open to remote roles in content marketing, digital marketing, partner marketing, and brand strategy. If your company cares about
              doing good work and doing good in the world, I want to hear from you.
            </p>
          </Reveal>
          <Reveal className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="px-6 py-2.5 border border-card-border text-muted rounded-full text-sm hover:border-accent hover:text-accent transition-all flex items-center gap-2"
            >
              <MailIcon />
              Email
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-card-border text-muted rounded-full text-sm hover:border-accent hover:text-accent transition-all flex items-center gap-2"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </Reveal>
          <p className="text-muted/70 text-sm mt-16 font-mono text-center">Remote | Open to Relocation</p>
        </div>
      </section>
    </>
  );
}
