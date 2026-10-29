export const site = {
  name: "Felicia Morales",
  title: "Felicia Morales | Content & Digital Marketing Strategist",
  description:
    "Content and partner marketer for SaaS, tech, and mission-driven brands. Lifecycle email, SEO, creator partnerships, and video, with results that show up in the pipeline.",
  // Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is connected.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-livid-alpha-92.vercel.app",
  email: "felicia.d.morales90@gmail.com",
  linkedin: "https://linkedin.com/in/felicia-d-morales/",
  resume: "/Felicia_Morales_Resume.pdf",
};

export const heroIntro =
  "I start with the audience: who they are, where they live, and what they actually need. Then I build the content, email, and partner programs that serve them and grow your pipeline. Good marketing should feel like generosity, not a transaction.";

export const aboutParagraphs = [
  "Across SaaS, nonprofit, and e-commerce brands, I've built referral systems, launched ambassador programs, produced podcasts, filmed ad creative, and coded interactive tools that convert.",
  "Before marketing, I spent 11 years in the U.S. Air Force and 11 years in ophthalmology as an ophthalmic technician, working in rare disease and refractive surgery. Both taught me the same thing: stay flexible, pivot without losing momentum, and treat every outcome as a learning point.",
  "BA in Political Science with a Minor in Human Rights (UMass Boston). Certified in Digital Marketing (Meta), Email Marketing (HubSpot), Google Analytics, and Figma.",
];

export const background = [
  { title: "U.S. Air Force", detail: "11 years of service" },
  { title: "Ophthalmology", detail: "11 years as an ophthalmic technician in rare disease & refractive surgery" },
];

export const education = {
  degree: "BA in Political Science, Minor in Human Rights (UMass Boston)",
  certs: "Certified: Digital Marketing (Meta), Email Marketing (HubSpot), Google Analytics, Figma",
};

export const dailyTools = [
  { name: "Claude Code", logo: "/logos/claude.svg" },
  { name: "HubSpot", logo: "/logos/hubspot.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Canva", logo: "/logos/canva.svg" },
  { name: "Figma", logo: "/logos/figma.svg" },
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "Upfluence", logo: "/logos/upfluence.svg" },
  { name: "Google", logo: "/logos/google.svg" },
];

// Ordered so the strongest B2B skills lead.
export const skillGroups = [
  {
    name: "Content and brand",
    items: ["Content Strategy", "Brand Voice", "SEO", "Landing Page Copy", "Podcast Production", "Video Production"],
  },
  {
    name: "Lifecycle and demand",
    items: ["Email Marketing", "Nurture Sequences", "Marketing Automation", "Lead Generation", "Cold Outreach"],
  },
  {
    name: "Partners and community",
    items: [
      "Partner Marketing",
      "Influencer Marketing",
      "Referral Programs",
      "Ambassador Programs",
      "Community Engagement",
      "Social Media",
    ],
  },
  {
    name: "Growth and testing",
    items: ["Campaign Optimization", "A/B Testing", "Paid Social & Google Ads", "AI-Powered Marketing"],
  },
];

export const toolGroups = [
  {
    name: "CRM, email and analytics",
    items: ["HubSpot", "Google Analytics", "BigQuery", "Microsoft Clarity", "Mailchimp", "Lemlist"],
  },
  {
    name: "Social, influencer and ads",
    items: ["Meta Business Suite", "Google Ads", "Buffer", "Loomly", "Metricool", "Modash", "Upfluence"],
  },
  { name: "Video and podcast", items: ["Riverside.FM", "CapCut", "YouTube Studio"] },
  {
    name: "Design and web",
    items: ["Figma", "Canva", "Adobe Creative Suite", "Shopify", "Squarespace"],
  },
  { name: "Build and AI", items: ["Claude Code", "Apify", "ManyChat", "Vercel", "GitHub"] },
  { name: "Workspace", items: ["Notion", "Slack", "Microsoft Teams", "Dropbox", "Google Workspace"] },
];

export const otherClients = [
  "Horses of Hope PR",
  "Gunrock Industries",
  "Luxe Marketing Management",
  "Origami Collective",
];

export const founderNote = {
  name: "Clever Casita",
  detail:
    "Founded and ran a home-focused e-commerce brand (2021–2023): Shopify store, SEO blog, organic social, Meta ads, email, and customer service.",
};
