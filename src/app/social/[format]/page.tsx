import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CARD_WIDTH, Embed } from "@/components/FormatStrips";
import Reveal from "@/components/Reveal";
import { brands, socialFormats, socialPostsFor } from "@/data/work";

type Props = { params: Promise<{ format: string }> };

const pages = socialFormats.filter((f) => socialPostsFor(f.format).length > 0);

export function generateStaticParams() {
  return pages.map((f) => ({ format: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { format } = await params;
  const f = pages.find((x) => x.slug === format);
  if (!f) return {};
  const title = `Social Media ${f.name}`;
  return {
    title,
    description: f.summary,
    alternates: { canonical: `/social/${f.slug}` },
    openGraph: { title: `${title} | Felicia Morales`, description: f.summary, url: `/social/${f.slug}`, images: ["/opengraph-image.png"] },
  };
}

export default async function SocialFormatPage({ params }: Props) {
  const { format } = await params;
  const f = pages.find((x) => x.slug === format);
  if (!f) notFound();
  const posts = socialPostsFor(f.format);

  return (
    <article>
      <header className="bg-hero-bg">
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-14 md:pt-32 md:pb-16">
          <Link href="/#social-media" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors mb-10">
            <span aria-hidden>←</span>
            <span>Social media</span>
          </Link>
          <Reveal>
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/55 mb-3">Social Media</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-4">{f.name}</h1>
            <p className="text-foreground/70 max-w-2xl">{f.summary}</p>
          </Reveal>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {posts.map((p) => (
            <figure key={p.id} className="rounded-2xl overflow-hidden bg-white border border-card-border shadow-sm mx-auto w-full" style={{ maxWidth: CARD_WIDTH }}>
              <figcaption className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted border-b border-card-border">
                {brands[p.brand].name} · {p.platform}
              </figcaption>
              <Embed post={p} width={CARD_WIDTH} />
            </figure>
          ))}
        </div>

        <nav aria-label="More social media" className="pt-10 mt-14 border-t border-card-border flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {pages
            .filter((x) => x.slug !== f.slug)
            .map((x) => (
              <Link key={x.slug} href={`/social/${x.slug}`} className="font-semibold text-foreground hover:text-accent transition-colors">
                {x.name} →
              </Link>
            ))}
          <Link href="/work/manychat" className="font-semibold text-foreground hover:text-accent transition-colors">
            ManyChat →
          </Link>
        </nav>
      </div>
    </article>
  );
}
