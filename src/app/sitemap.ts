import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/work";
import { writingSamples } from "@/data/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...projects.filter((p) => !p.href).map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.8 })),
    ...writingSamples.map((w) => ({ url: `${site.url}/writing/${w.slug}`, priority: 0.6 })),
  ];
}
