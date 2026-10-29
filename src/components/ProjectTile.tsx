import Image from "next/image";
import Link from "next/link";
import { brands, projectHref, socialFormats, type Project, type SocialFormat } from "@/data/work";

/** Thumbnail, or a brand-colored panel with the title when there is no image yet. */
export function Thumb({
  project,
  src,
  video,
  title,
  compact,
}: {
  project: Project;
  src?: string;
  video?: boolean;
  title: string;
  compact?: boolean;
}) {
  const brand = brands[project.brand];
  return (
    <div className={`relative ${compact ? "aspect-[16/7]" : "aspect-[16/10]"} overflow-hidden`} style={{ backgroundColor: brand.color }}>
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 320px, 80vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <span className="font-serif text-2xl leading-tight text-foreground/70">{title}</span>
        </div>
      )}
      {video && src && (
        <span aria-hidden className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-background/90 flex items-center justify-center text-sm text-foreground shadow">
          ▶
        </span>
      )}
    </div>
  );
}

export default function ProjectTile({
  project,
  title,
  summary,
  thumb,
  video,
  compact,
}: {
  project: Project;
  title?: string;
  summary?: string;
  thumb?: string;
  video?: boolean;
  compact?: boolean;
}) {
  const name = title ?? project.title;
  const text = summary ?? project.summary;
  return (
    <Link
      href={projectHref(project)}
      className="group block h-full rounded-2xl overflow-hidden bg-white border border-card-border shadow-sm hover:shadow-lg hover:border-accent/40 transition-all"
    >
      <Thumb project={project} src={thumb ?? project.thumb} video={video ?? project.video} title={name} compact={compact} />
      <div className="p-4 md:p-5">
        {!project.hideBrand && <p className="text-[11px] font-mono uppercase tracking-widest text-muted">{brands[project.brand].name}</p>}
        <h4 className={`${project.hideBrand ? "" : "mt-1.5 "}text-base md:text-[17px] font-semibold text-foreground leading-snug group-hover:text-accent transition-colors`}>
          {name}
        </h4>
        {text && <p className="mt-1.5 text-sm text-muted leading-relaxed">{text}</p>}
      </div>
    </Link>
  );
}

const formatTones: Record<SocialFormat, string> = { reel: "#EEDDD9", static: "#F1E4D3", carousel: "#D5E8D5" };

/** A tile for a social format page, labeled with the brands whose posts it holds. */
export function FormatTile({ format, compact }: { format: SocialFormat; compact?: boolean }) {
  const f = socialFormats.find((x) => x.format === format)!;
  return (
    <Link
      href={`/social/${f.slug}`}
      className="group block h-full rounded-2xl overflow-hidden bg-white border border-card-border shadow-sm hover:shadow-lg hover:border-accent/40 transition-all"
    >
      <div className={`relative ${compact ? "aspect-[16/7]" : "aspect-[16/10]"} flex items-center justify-center`} style={{ backgroundColor: formatTones[format] }}>
        <span className="font-serif text-3xl text-foreground/70 transition-transform duration-500 group-hover:scale-[1.05]">{f.name}</span>
      </div>
      <div className="p-4 md:p-5">
        <h4 className=" text-base md:text-[17px] font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
          {f.name}
        </h4>
        {f.summary && <p className="mt-1.5 text-sm text-muted leading-relaxed">{f.summary}</p>}
      </div>
    </Link>
  );
}
