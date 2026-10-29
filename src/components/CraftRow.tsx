"use client";

import { useEffect, useRef, useState } from "react";
import { getProject, type Craft } from "@/data/work";
import ProjectTile from "./ProjectTile";

export default function CraftRow({ craft, index }: { craft: Craft; index: number }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const page = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "w-9 h-9 rounded-full border border-card-border bg-background flex items-center justify-center text-foreground transition-opacity hover:border-accent disabled:opacity-30 disabled:cursor-default";

  return (
    <section id={craft.slug} aria-labelledby={`${craft.slug}-title`} className="py-10 md:py-12 border-t border-card-border">
      <div className="grid md:grid-cols-[15rem_minmax(0,1fr)] gap-6 md:gap-8">
        <div className="flex md:flex-col justify-between md:justify-start gap-4">
          <div>
            <p className="font-mono text-sm text-accent mb-2">{String(index + 1).padStart(2, "0")}</p>
            <h3 id={`${craft.slug}-title`} className="font-serif text-3xl text-foreground leading-tight">
              {craft.name}
            </h3>
            <p className="mt-3 text-muted leading-relaxed">{craft.description}</p>
          </div>
          {(canPrev || canNext) && (
            <div className="hidden md:flex gap-2 mt-6">
              <button type="button" className={arrow} onClick={() => page(-1)} disabled={!canPrev} aria-label={`Scroll ${craft.name} back`}>
                ←
              </button>
              <button type="button" className={arrow} onClick={() => page(1)} disabled={!canNext} aria-label={`Scroll ${craft.name} forward`}>
                →
              </button>
            </div>
          )}
        </div>
        <div className="relative min-w-0 -mx-6 md:mx-0">
          <div
            ref={scroller}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-6 md:scroll-px-0 px-6 md:px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {craft.items.map((item) => {
              const project = getProject(item.project)!;
              return (
                <div key={item.project} className="snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
                  <ProjectTile project={project} title={item.title} summary={item.summary} thumb={item.thumb} video={item.video} />
                </div>
              );
            })}
          </div>
          {canNext && (
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
          )}
        </div>
      </div>
    </section>
  );
}
