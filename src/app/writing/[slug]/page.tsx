import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWritingSample, writingSamples } from "@/data/writing";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return writingSamples.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const w = getWritingSample((await params).slug);
  if (!w) return {};
  return {
    title: `${w.publication}: ${w.title}`,
    description: w.summary,
    alternates: { canonical: `/writing/${w.slug}` },
    openGraph: { title: `${w.publication}: ${w.title}`, description: w.summary, url: `/writing/${w.slug}`, images: [w.cover] },
  };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const w = getWritingSample(slug);
  if (!w) notFound();

  return (
    <article className="px-4 md:px-6 pt-28 md:pt-32 pb-20">
      <header className="max-w-3xl mx-auto mb-10">
        <Link href="/#newsletters" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8">
          <span aria-hidden>←</span>
          <span>Back to newsletters</span>
        </Link>
        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
          Newsletter · {w.publication}
        </p>
        <h1 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">{w.title}</h1>
        <p className="text-muted text-lg mt-5 leading-relaxed">{w.summary}</p>
        <p className="text-sm text-foreground/80 mt-3">
          {w.role} Written for {w.client}, published {w.date}.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <a
            href={w.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-foreground hover:bg-foreground/80 text-background rounded-full text-sm font-medium transition-all"
          >
            Open PDF
          </a>
          <a
            href={w.pdf}
            download
            className="px-6 py-2.5 border border-foreground/20 hover:border-foreground/50 text-foreground rounded-full text-sm font-medium transition-all"
          >
            Download
          </a>
        </div>
      </header>

      <div className="max-w-[680px] mx-auto rounded-2xl overflow-hidden bg-white shadow-xl ring-1 ring-card-border">
        {w.pages.map((p, i) => {
          const anchors = w.anchors.filter((a) => a.page === i + 1);
          return (
            <div key={p.src} className="relative">
              {anchors.map((a) => (
                <span key={a.id} id={a.id} className="absolute left-0" style={{ top: `${a.top * 100}%` }} />
              ))}
              <Image
                src={p.src}
                alt={i === 0 ? `${w.publication}: ${w.title}` : ""}
                width={p.width}
                height={p.height}
                sizes="(min-width: 712px) 680px, 100vw"
                priority={i === 0}
                className="block w-full h-auto"
              />
            </div>
          );
        })}
      </div>
    </article>
  );
}
