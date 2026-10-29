import { brands, socialFormats, socialPosts, type SocialPost } from "@/data/work";

const CARD_WIDTH = 328;

function Embed({ post }: { post: SocialPost }) {
  const e = post.embed;
  switch (e.type) {
    case "instagram":
      return (
        <iframe
          src={`${e.url.replace(/\/?$/, "/")}embed/`}
          width={CARD_WIDTH}
          height={e.height ?? 540}
          loading="lazy"
          scrolling="no"
          title={`${brands[post.brand].name} on Instagram`}
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
          title={`${brands[post.brand].name} on Facebook`}
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
          title={`${brands[post.brand].name} on LinkedIn`}
          className="block w-full border-0 bg-white"
          allowFullScreen
        />
      );
    case "video":
      return (
        <video className="block w-full bg-foreground" controls playsInline preload="metadata" poster={e.poster}>
          <source src={e.src} type="video/mp4" />
        </video>
      );
  }
}

/** Social posts grouped by format, each format a horizontal strip of live posts labeled by account. */
export default function SocialStrips() {
  return (
    <div className="space-y-8">
      {socialFormats.map(({ format, name }) => {
        const posts = socialPosts.filter((p) => p.format === format);
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
                    style={{ width: CARD_WIDTH }}
                  >
                    <figcaption className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted border-b border-card-border">
                      {brands[p.brand].name} · {p.platform}
                    </figcaption>
                    <Embed post={p} />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
