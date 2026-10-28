import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";

export default function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <Link className="block group" href={`/work/${study.slug}`}>
      <div
        className="rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-xl shadow-lg"
        style={{ backgroundColor: study.color }}
      >
        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[320px]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest opacity-50 mb-4 block">{study.industry}</span>
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-5">{study.company}</h3>
            {study.headline && (
              <p className="mb-5 max-w-2xl inline-flex items-start gap-3 rounded-2xl bg-background/60 px-4 py-3 text-foreground text-base md:text-lg font-semibold leading-snug">
                <span aria-hidden className="mt-2 w-2 h-2 rounded-full bg-accent shrink-0" />
                {study.headline.text}
              </p>
            )}
            <p className="text-foreground/70 text-lg leading-relaxed mb-6 max-w-2xl">{study.summary}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {study.tags.map((t) => (
                <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-foreground/[0.08] text-foreground/60 border border-foreground/10">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:gap-3 transition-all duration-300">
            View Project<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
