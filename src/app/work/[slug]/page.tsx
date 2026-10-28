import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeepDive, Section } from "@/components/Accordion";
import MediaShowcase from "@/components/MediaShowcase";
import Reveal from "@/components/Reveal";
import StatGrid from "@/components/StatGrid";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const description = study.headline ? `${study.headline.text} ${study.summary}` : study.summary;
  return {
    title: `${study.company} Case Study`,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.company} Case Study | Felicia Morales`,
      description,
      url: `/work/${study.slug}`,
      images: ["/opengraph-image.png"],
    },
  };
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 max-w-3xl">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-muted">
          <span aria-hidden className="text-accent mt-1 shrink-0 text-lg leading-none">
            •
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const label = "text-sm font-mono text-accent tracking-widest uppercase";

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article>
      <header style={{ backgroundColor: study.color }}>
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-16 md:pt-32 md:pb-20">
          <Link href="/#case-studies" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors mb-10">
            <span aria-hidden>←</span>
            <span>Back to all work</span>
          </Link>
          <Reveal>
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/50 mb-3">{study.industry}</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-4">{study.company}</h1>
            <p className="text-sm text-foreground/70">
              {study.role}
              {study.period && <> · {study.period}</>}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        {study.headline && (
          <Reveal className="mb-10">
            <div className="rounded-3xl border border-card-border bg-card-bg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
              <p className="font-mono font-bold text-4xl md:text-5xl text-accent shrink-0">{study.headline.value}</p>
              <div>
                <p className="text-lg md:text-xl text-foreground font-semibold leading-snug">{study.headline.text}</p>
                {study.headline.note && <p className="text-sm text-muted mt-2">{study.headline.note}</p>}
              </div>
            </div>
          </Reveal>
        )}

        {study.results && study.results.length > 0 && (
          <Reveal className="mb-12">
            <h2 className={`${label} mb-4`}>Results</h2>
            <StatGrid stats={study.results} />
            {study.resultsNote && <p className="text-sm text-muted mt-4 max-w-3xl">{study.resultsNote}</p>}
          </Reveal>
        )}

        <div className="mb-10 space-y-5">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">{study.overview}</p>
          {study.collaborators && (
            <p className="text-muted max-w-3xl">
              <span className="font-semibold text-foreground">Worked with: </span>
              {study.collaborators}
            </p>
          )}
          {study.proof && (
            <div className="flex flex-wrap gap-3 pt-2">
              {study.proof.map((p) =>
                p.external ? (
                  <a
                    key={p.href}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-foreground hover:bg-foreground/80 text-background rounded-full text-sm font-medium transition-all"
                  >
                    {p.label} ↗
                  </a>
                ) : (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="px-6 py-2.5 border border-foreground/20 hover:border-foreground/50 text-foreground rounded-full text-sm font-medium transition-all"
                  >
                    {p.label} →
                  </Link>
                ),
              )}
            </div>
          )}
        </div>

        <div className="border-t border-card-border">
          <Section title="The Problem">
            <div className="space-y-4 max-w-3xl">
              {study.problem.split("\n\n").map((p) => (
                <p key={p.slice(0, 24)} className="text-muted text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Section>

          <Section title="What I Did">
            <Bullets items={study.strategy} />
          </Section>

          {study.campaigns && study.campaigns.length > 0 && (
            <Section title="Campaign Deep Dives">
              <div className="space-y-4">
                {study.campaigns.map((c) => (
                  <DeepDive key={c.title} title={c.title} period={c.period} summary={c.overview}>
                    <div>
                      <h4 className={`${label} mb-3`}>My Role</h4>
                      <p className="text-muted leading-relaxed max-w-3xl">{c.myRole}</p>
                    </div>
                    <div>
                      <h4 className={`${label} mb-3`}>Process</h4>
                      <Bullets items={c.process} />
                    </div>
                    <div>
                      <h4 className={`${label} mb-3`}>Output</h4>
                      <p className="text-muted leading-relaxed max-w-3xl">{c.output}</p>
                    </div>
                    {c.results && c.results.length > 0 && (
                      <div>
                        <h4 className={`${label} mb-4`}>Results</h4>
                        <StatGrid stats={c.results} tone="plain" columns={4} />
                        {c.resultsNote && <p className="text-sm text-muted mt-3">{c.resultsNote}</p>}
                      </div>
                    )}
                    {c.media && c.media.length > 0 && (
                      <div>
                        <h4 className={`${label} mb-4`}>{c.media.length > 4 ? "Product Walkthrough" : "The Work"}</h4>
                        <MediaShowcase items={c.media} />
                      </div>
                    )}
                  </DeepDive>
                ))}
              </div>
            </Section>
          )}

          {study.media && study.media.length > 0 && (
            <Section title="The Work">
              <MediaShowcase items={study.media} layout={study.mediaLayout} />
            </Section>
          )}
        </div>

        <nav className="pt-8 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" aria-label="More work">
          <Link href="/#case-studies" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
            <span aria-hidden>←</span>
            <span>Back to all work</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="group inline-flex items-center gap-2 text-sm text-foreground font-semibold">
            Next: {next.company}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
