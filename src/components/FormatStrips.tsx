import Image from "next/image";
import Link from "next/link";
import { brands, type Post, type StripSet } from "@/data/work";

export const CARD_WIDTH = 328;

export function Embed({ post, width }: { post: Post; width: number }) {
  const e = post.embed;
  const title = `${brands[post.brand].name} on ${post.platform}`;
  switch (e.type) {
    case "instagram":
      return (
        <iframe
          src={`${e.url.replace(/\/?$/, "/")}embed/`}
          width={CARD_WIDTH}
          height={e.height ?? 540}
          loading="lazy"
          scrolling="no"
          title={title}
          className="block w-full border-0 bg-white"
          allowFullScreen
        />
      );
    case "facebook":
      return (
        <iframe
          src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(e.url)}&show_text=true&width=${CARD_WIDTH}`}
          width={CARD_WIDTH}
          height={e.height ?? 560}
          loading="lazy"
          title={title}
          className="block w-full border-0 bg-white"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    case "linkedin":
      return (
        <iframe
          src={e.url}
          width={CARD_WIDTH}
          height={e.height ?? 600}
          loading="lazy"
          title={title}
          className="block w-full border-0 bg-white"
          allowFullScreen
        />
      );
    case "video":
      return (
        <video className="block w-full bg-foreground" controls playsInline preload="metadata" poster={e.poster} aria-label={title}>
          <source src={e.src} type="video/mp4" />
        </video>
      );
    case "image":
      return (
        <div className="flex overflow-x-auto snap-x snap-mandatory">
          {e.srcs.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={e.srcs.length > 1 ? `${title}, slide ${i + 1} of ${e.srcs.length}` : title}
              width={e.width}
              height={e.height}
              sizes={`${width}px`}
              className="snap-start shrink-0 w-full h-auto"
            />
          ))}
        </div>
      );
    case "search":
      return (
        <div className="p-5 bg-white">
          <p className="text-xs text-foreground/80">
            <span className="font-semibold">Sponsored</span> · {e.displayUrl}
          </p>
          <p className="mt-1.5 text-lg leading-snug text-[#1a0dab]">{e.headline}</p>
          <p className="mt-1.5 text-sm text-foreground/75 leading-relaxed">{e.description}</p>
        </div>
      );
  }
}

/** Creative grouped by format, each format a horizontal strip of posts labeled by brand and platform. */
export default function FormatStrips({ set, links }: { set: StripSet; links?: { label: string; href: string }[] }) {
  return (
    <div className="space-y-8">
      {set.formats.map(({ format, name, width }) => {
        const posts = set.posts.filter((p) => p.format === format);
        if (posts.length === 0) return null;
        return (
          <div key={format}>
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">{name}</h4>
            <div className="-mx-6 md:mx-0">
              <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-6 md:scroll-px-0 px-6 md:px-0 pb-2 items-start">
                {posts.map((p) => (
                  <figure
                    key={p.id}
                    className="snap-start shrink-0 rounded-2xl overflow-hidden bg-white border border-card-border shadow-sm"
                    style={{ width: width ?? CARD_WIDTH, maxWidth: "85vw" }}
                  >
                    <figcaption className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted border-b border-card-border">
                      {brands[p.brand].name} · {p.platform}
                    </figcaption>
                    <Embed post={p} width={width ?? CARD_WIDTH} />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      {links && links.length > 0 && (
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="font-semibold text-foreground hover:text-accent transition-colors">
              {l.label} →
            </Link>
          ))}
        </p>
      )}
    </div>
  );
}
