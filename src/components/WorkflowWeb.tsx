import Link from "next/link";
import type { WorkflowWeb as Web } from "@/data/work";

const tones = ["#EEDDD9", "#F1E4D3", "#D5E8D5", "#E8E4D8", "#E0D5E8", "#D9E5EE"];

export default function WorkflowWeb({ web }: { web: Web }) {
  const all = [...web.stages, ...(web.parallel ?? [])];
  const tone = (stage: string) => tones[all.indexOf(stage) % tones.length];
  const names = Object.fromEntries(web.workflows.map((w) => [w.id, w.name]));

  return (
    <div>
      <ol aria-label="Host journey" className="flex flex-wrap items-center gap-y-3 mb-8">
        {web.stages.map((s, i) => (
          <li key={s} className="flex items-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded-full text-foreground/80" style={{ backgroundColor: tone(s) }}>
              {s}
            </span>
            {i < web.stages.length - 1 && (
              <span aria-hidden className="mx-2 text-muted">
                →
              </span>
            )}
          </li>
        ))}
        {web.parallel?.map((s) => (
          <li key={s} className="flex items-center ml-4 pl-4 border-l border-card-border">
            <span className="text-xs text-muted mr-2">Alongside:</span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full text-foreground/80" style={{ backgroundColor: tone(s) }}>
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="grid md:grid-cols-2 gap-4">
        {web.workflows.map((w) => (
          <section
            key={w.id}
            id={`flow-${w.id}`}
            aria-labelledby={`flow-${w.id}-name`}
            className="rounded-2xl border border-card-border bg-white overflow-hidden target:ring-2 target:ring-accent"
          >
            <div className="px-5 py-3 flex items-center justify-between gap-3" style={{ backgroundColor: tone(w.stage) }}>
              <h3 id={`flow-${w.id}-name`} className="font-semibold text-foreground">
                {w.href ? (
                  <Link href={w.href} className="hover:text-accent transition-colors">
                    {w.name} →
                  </Link>
                ) : (
                  w.name
                )}
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-widest text-foreground/60 text-right">{w.stage}</span>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-accent mb-1">When</p>
                <p className="text-foreground/80 leading-relaxed">{w.trigger}</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-accent mb-1">Logic</p>
                <ul className="space-y-1.5">
                  {w.logic.map((l) => (
                    <li key={l} className="flex gap-2 text-muted leading-relaxed">
                      <span aria-hidden className="text-accent">
                        •
                      </span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-accent mb-2">Then</p>
                <ul className="flex flex-wrap gap-2">
                  {w.next.map((n) => (
                    <li key={n.label}>
                      {n.to ? (
                        <a
                          href={`#flow-${n.to}`}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-card-border hover:border-accent hover:text-accent transition-colors text-foreground/80"
                        >
                          {n.label}
                          <span aria-hidden>→</span>
                          <span className="font-semibold">{names[n.to]}</span>
                        </a>
                      ) : (
                        <span className="inline-block text-xs px-3 py-1.5 rounded-full bg-card-bg text-foreground/70">{n.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
