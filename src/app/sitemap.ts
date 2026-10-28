import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";
import { writingSamples } from "@/data/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}`, priority: 0.8 })),
    ...writingSamples.map((w) => ({ url: `${site.url}/writing/${w.slug}`, priority: 0.6 })),
  ];
}
