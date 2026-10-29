"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@/data/work";
import InstagramEmbed from "./InstagramEmbed";
import Lightbox, { type LightboxImage } from "./Lightbox";

function Caption({ label, description }: { label: string; description: string }) {
  return (
    <div className="p-4 bg-card-bg">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted mt-1 leading-relaxed">{description}</p>
    </div>
  );
}

function Video({ srcs, label, poster }: { srcs: string[]; label: string; poster?: string }) {
  return (
    <>
      {srcs.map((src) => (
        <video key={src} className="w-full bg-foreground" controls playsInline preload="metadata" poster={poster} aria-label={label}>
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </>
  );
}

/**
 * Renders a list of media items. More than four screenshots become a numbered walkthrough;
 * "mockups" stacks framed images with their story underneath.
 */
export default function MediaShowcase({ items, layout = "grid" }: { items: Media[]; layout?: "grid" | "mockups" }) {
  const images: LightboxImage[] = [];
  const indexOf = new Map<string, number>();
  for (const m of items) {
    if (m.type !== "image") continue;
    for (const src of m.gallery ?? [m.src]) {
      if (!indexOf.has(src)) {
        indexOf.set(src, images.length);
        images.push({ src, alt: m.label });
      }
    }
  }
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const onlyImages = items.every((m) => m.type === "image");
  const lightbox = <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />;

  if (onlyImages && items.length > 4) {
    return (
      <>
        <ol className="relative space-y-8">
          <span aria-hidden className="absolute left-4 top-2 bottom-2 w-px bg-card-border" />
          {items.map((m, i) =>
            m.type === "image" ? (
              <li key={m.src} className="relative pl-14 grid sm:grid-cols-[11rem_1fr] gap-4 items-start">
                <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center text-xs font-mono text-accent font-semibold">
                  {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(indexOf.get(m.src)!)}
                  className="w-40 sm:w-44 rounded-lg overflow-hidden border border-card-border hover:border-accent hover:shadow-md transition-all"
                  aria-label={`Enlarge: ${m.label}`}
                >
                  <Image src={m.src} alt={m.label} width={352} height={384} className="w-full max-h-48 object-cover object-top" />
                </button>
                <div>
                  <p className="text-sm font-semibold text-foreground">{m.label}</p>
                  <p className="text-sm text-muted mt-1 leading-relaxed">{m.description}</p>
                </div>
              </li>
            ) : null,
          )}
        </ol>
        {lightbox}
      </>
    );
  }

  if (layout === "mockups") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {items.map((m) =>
            m.type === "image" ? (
              <figure key={m.src}>
                <button type="button" onClick={() => setOpen(indexOf.get(m.src)!)} className="block w-full" aria-label={`Enlarge: ${m.label}`}>
                  <Image src={m.src} alt={m.label} width={1200} height={800} className="w-full h-auto" sizes="(min-width: 768px) 50vw, 100vw" />
                </button>
                <figcaption className="mt-4">
                  <p className="text-base font-semibold text-foreground">{m.label}</p>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{m.description}</p>
                </figcaption>
              </figure>
            ) : null,
          )}
        </div>
        {lightbox}
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((m) => {
          switch (m.type) {
            case "image": {
              const gallery = m.gallery && m.gallery.length > 1 ? m.gallery : null;
              return (
                <div key={m.label} className={gallery && expanded === m.label ? "sm:col-span-2" : undefined}>
                  <div className="rounded-xl overflow-hidden border border-card-border">
                    <button type="button" onClick={() => setOpen(indexOf.get(m.src)!)} className="block w-full" aria-label={`Enlarge: ${m.label}`}>
                      <Image src={m.src} alt={m.label} width={1000} height={700} className="w-full h-auto" sizes="(min-width: 640px) 50vw, 100vw" />
                    </button>
                    <Caption label={m.label} description={m.description} />
                  </div>
                  {m.href && (
                    <a href={m.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-mono text-accent hover:text-accent-light">
                      Open it live ↗
                    </a>
                  )}
                  {gallery && (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === m.label ? null : m.label)}
                        className="mt-2 text-xs text-accent font-mono hover:text-accent-light transition-colors"
                      >
                        {expanded === m.label ? "Collapse" : `View all ${gallery.length} screens`}
                      </button>
                      {expanded === m.label && (
                        <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {gallery.map((src, i) => (
                            <button
                              key={src}
                              type="button"
                              onClick={() => setOpen(indexOf.get(src)!)}
                              className="rounded-lg overflow-hidden border border-card-border hover:border-accent transition-colors"
                              aria-label={`${m.label}, screen ${i + 1}`}
                            >
                              <Image src={src} alt={`${m.label}, screen ${i + 1}`} width={300} height={600} className="w-full h-auto" />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            }
            case "video":
              return (
                <div key={m.label} className="rounded-xl overflow-hidden border border-card-border">
                  <div className="space-y-px">
                    <Video srcs={m.srcs} label={m.label} poster={m.poster} />
                  </div>
                  <Caption label={m.label} description={m.description} />
                </div>
              );
            case "vimeo":
              return (
                <div key={m.id} className="rounded-xl overflow-hidden border border-card-border">
                  <div className="relative aspect-video bg-foreground">
                    <iframe
                      src={`https://player.vimeo.com/video/${m.id}?h=${m.hash}&title=0&byline=0&portrait=0&dnt=1`}
                      title={m.label}
                      loading="lazy"
                      allow="autoplay; fullscreen; picture-in-picture"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <Caption label={m.label} description={m.description} />
                </div>
              );
            case "instagram":
              return (
                <div key={m.url}>
                  <InstagramEmbed url={m.url} />
                  <div className="mt-2 text-center">
                    <p className="text-sm font-semibold text-foreground">{m.label}</p>
                    <p className="text-xs text-muted mt-1">{m.description}</p>
                  </div>
                </div>
              );
            case "link":
              return (
                <a
                  key={m.href}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-card-border bg-card-bg/60 p-5 flex flex-col justify-between hover:border-accent transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{m.label}</p>
                    <p className="text-xs text-muted mt-1 leading-relaxed">{m.description}</p>
                  </div>
                  <span className="mt-4 text-xs font-mono text-accent">Read it ↗</span>
                </a>
              );
          }
        })}
      </div>
      {lightbox}
    </>
  );
}
