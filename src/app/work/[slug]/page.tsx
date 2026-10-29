import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Accordion";
import DmFlow from "@/components/DmFlow";
import EmailInbox from "@/components/EmailInbox";
import MediaShowcase from "@/components/MediaShowcase";
import ProjectTile from "@/components/ProjectTile";
import Reveal from "@/components/Reveal";
import StatGrid from "@/components/StatGrid";
import WorkflowWeb from "@/components/WorkflowWeb";
import { brands, craftsFor, getProject, projects } from "@/data/work";

type Props = { params: Promise<{ slug: string }> };

const pages = projects.filter((p) => !p.href);

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project || project.href) return {};
  const brand = brands[project.brand];
  const title = `${project.title} for ${brand.name}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${title} | Felicia Morales`, description: project.summary, url: `/work/${project.slug}`, images: ["/opengraph-image.png"] },
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

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="space-y-4 max-w-3xl">
      {text.split("\n\n").map((p) => (
        <p key={p.slice(0, 24)} className="text-muted text-lg leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.href) notFound();

  const brand = brands[project.brand];
  const projectCrafts = craftsFor(project.slug);
  const related = projectCrafts
    .flatMap((c) => c.items.flatMap((i) => (i.project ? [i.project] : [])))
    .filter((s, i, all) => s !== project.slug && all.indexOf(s) === i)
    .slice(0, 3)
    .map((s) => getProject(s)!);

  return (
    <article>
      <header style={{ backgroundColor: brand.color }}>
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-14 md:pt-32 md:pb-16">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors mb-10">
            <span aria-hidden>←</span>
            <span>All work</span>
          </Link>
          <Reveal>
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/55 mb-3">
              {projectCrafts.map((c) => c.name).join(" · ")}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-4">{project.title}</h1>
            <p className="text-sm text-foreground/70">
              <span className="font-semibold text-foreground">{brand.name}</span>
              {" · "}
              {project.role ?? brand.role}
              {(project.period ?? brand.period) && <> · {project.period ?? brand.period}</>}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="mb-10 space-y-5">
          {project.overview && <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">{project.overview}</p>}
          <p className="text-muted max-w-3xl">
            <span className="font-semibold text-foreground">About {brand.name}: </span>
            {brand.about}
          </p>
          {project.collaborators && (
            <p className="text-muted max-w-3xl">
              <span className="font-semibold text-foreground">Worked with: </span>
              {project.collaborators}
            </p>
          )}
          {project.links && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.links.map((l) =>
                l.external ? (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-foreground hover:bg-foreground/80 text-background rounded-full text-sm font-medium transition-all"
                  >
                    {l.label} ↗
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="px-6 py-2.5 border border-foreground/20 hover:border-foreground/50 text-foreground rounded-full text-sm font-medium transition-all"
                  >
                    {l.label} →
                  </Link>
                ),
              )}
            </div>
          )}
        </div>

        <div className="border-t border-card-border">
          {project.problem && (
            <Section title="The Challenge">
              <Paragraphs text={project.problem} />
            </Section>
          )}

          {project.myRole && (
            <Section title="My Role">
              <Paragraphs text={project.myRole} />
            </Section>
          )}

          {project.process && project.process.length > 0 && (
            <Section title="What I Did">
              <Bullets items={project.process} />
            </Section>
          )}

          {project.emails && project.emails.length > 0 && (
            <Section title="The Emails">
              <EmailInbox emails={project.emails} sender={brand.name} />
            </Section>
          )}

          {project.dmFlows && project.dmFlows.length > 0 && (
            <Section title={project.dmFlows.length > 1 ? "The Flows" : "The Flow"}>
              <div className="space-y-16">
                {project.dmFlows.map((f) => (
                  <DmFlow key={f.name} flow={f} />
                ))}
              </div>
            </Section>
          )}

          {project.media && project.media.length > 0 && (
            <Section title="The Work">
              <MediaShowcase items={project.media} layout={project.mediaLayout} />
            </Section>
          )}

          {project.workflowWeb && (
            <Section title="The Workflow Web">
              <WorkflowWeb web={project.workflowWeb} />
            </Section>
          )}

          {project.results && project.results.length > 0 && (
            <Section title="Results">
              <StatGrid stats={project.results} columns={project.results.length === 4 ? 4 : 3} />
              {project.resultsNote && <p className="text-sm text-muted mt-4 max-w-3xl">{project.resultsNote}</p>}
            </Section>
          )}

          {project.sections?.map((x) => (
            <Section key={x.title} title={x.title}>
              <div className="space-y-4 max-w-3xl">
                {x.paragraphs?.map((p) => (
                  <p key={p.slice(0, 24)} className="text-muted text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
                {x.bullets && <Bullets items={x.bullets} />}
              </div>
            </Section>
          ))}
        </div>

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related">
            <h2 id="related" className="text-sm font-mono text-accent tracking-widest uppercase mb-6">
              More {projectCrafts[0].name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProjectTile key={p.slug} project={p} />
              ))}
            </div>
          </section>
        )}

        <div className="pt-10 mt-10 border-t border-card-border">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
            <span aria-hidden>←</span>
            <span>All work</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
