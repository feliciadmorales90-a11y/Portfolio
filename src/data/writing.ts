export type WritingSample = {
  slug: string;
  title: string;
  publication: string;
  client: string;
  date: string;
  summary: string;
  role: string;
  cover: string;
  pdf: string;
  /** Page images, stacked with no gaps so the issue reads as one continuous article. */
  pages: { src: string; width: number; height: number }[];
  /** In-page anchors, positioned as a fraction of a page's height. */
  anchors: { id: string; page: number; top: number }[];
};

export const writingSamples: WritingSample[] = [
  {
    slug: "entangled-insights-6",
    title: "Inside IBM's Starling Leap, NIST-Level Trust, and the Dark Side of the Web",
    publication: "Entangled Insights #6",
    client: "SQE.io",
    date: "June 23, 2025",
    summary:
      "SQE's newsletter for CISOs, CTOs, and enterprise decision-makers. This issue breaks down IBM's 2029 fault-tolerant quantum roadmap, spotlights a partner, and explains what Zero Trust looks like when it's built in from the ground up.",
    role: "I named, wrote, and produced the newsletter.",
    cover: "/writing/ei6/cover.webp",
    pdf: "/writing/entangled-insights-6.pdf",
    pages: [
      { src: "/writing/ei6/page-1.webp", width: 1046, height: 2034 },
      { src: "/writing/ei6/page-2.webp", width: 1046, height: 2200 },
      { src: "/writing/ei6/page-3.webp", width: 1046, height: 2200 },
      { src: "/writing/ei6/page-4.webp", width: 1046, height: 2200 },
      { src: "/writing/ei6/page-5.webp", width: 1046, height: 2200 },
      { src: "/writing/ei6/page-6.webp", width: 1046, height: 2200 },
      { src: "/writing/ei6/page-7.webp", width: 1046, height: 2200 },
      { src: "/writing/ei6/page-8.webp", width: 1046, height: 1700 },
    ],
    anchors: [{ id: "zero-trust", page: 4, top: 0.42 }],
  },
];

export function getWritingSample(slug: string) {
  return writingSamples.find((w) => w.slug === slug);
}
