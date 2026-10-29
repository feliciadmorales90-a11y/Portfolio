export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

export type Media =
  | { type: "image"; label: string; description: string; src: string; gallery?: string[]; href?: string }
  | { type: "video"; label: string; description?: string; srcs: string[]; poster?: string }
  | { type: "vimeo"; label: string; description: string; id: string; hash: string }
  | { type: "instagram"; label: string; description: string; url: string }
  | { type: "link"; label: string; description: string; href: string };

export type ProofLink = { label: string; href: string; external?: boolean };

export type ExtraSection = { title: string; paragraphs?: string[]; bullets?: string[] };

export type BrandId = "futurestay" | "scholar" | "sqe" | "verve" | "ripple" | "feybeans";

export type Brand = {
  name: string;
  color: string;
  /** One line on what the company does. */
  about: string;
  role: string;
  period?: string;
};

export const brands: Record<BrandId, Brand> = {
  futurestay: {
    name: "Futurestay",
    color: "#EEDDD9",
    about: "Direct-booking SaaS for independent short-term rental hosts.",
    role: "Marketing Content Manager",
    period: "Apr 2024 – Present",
  },
  scholar: {
    name: "Scholar and a Dream",
    color: "#D5E8D5",
    about: "Mentorship and scholarships for BIPOC students in NYC.",
    role: "Content Marketer (Contract)",
    period: "Nov 2023 – Present",
  },
  sqe: {
    name: "SQE",
    color: "#E0D5E8",
    about: "A quantum-secure cybersecurity and blockchain startup.",
    role: "Content & Partner Marketing (Contract)",
    period: "Jul 2022 – Nov 2025",
  },
  verve: {
    name: "Verve, LLC",
    color: "#E8E4D8",
    about: "A Service-Disabled Veteran-Owned and Woman-Owned federal contractor in Baltimore.",
    role: "Marketing Consultant (Contract)",
    period: "Sep 2026 – Present",
  },
  ripple: {
    name: "Ripple",
    color: "#D9E5EE",
    about: "My own side project: a two-sided marketplace for short-notice volunteering.",
    role: "Founder & Brand Strategist",
  },
  feybeans: {
    name: "Fey + Beans",
    color: "#F1E4D3",
    about: "My own account: my dog's Instagram.",
    role: "My own account",
  },
};

export type Project = {
  slug: string;
  title: string;
  brand: BrandId;
  /** Overrides the brand's role, when this project's role differs. */
  role?: string;
  period?: string;
  /** Send the tile somewhere other than /work/[slug] (e.g. the writing sample). */
  href?: string;
  /** One or two sentences for the tile. */
  summary: string;
  thumb?: string;
  /** Shows a play badge on the tile. */
  video?: boolean;
  overview?: string;
  collaborators?: string;
  myRole?: string;
  /** Paragraphs separated by blank lines. */
  problem?: string;
  process?: string[];
  results?: Stat[];
  resultsNote?: string;
  media?: Media[];
  mediaLayout?: "grid" | "mockups";
  sections?: ExtraSection[];
  links?: ProofLink[];
  workflowWeb?: WorkflowWeb;
  /** An email sequence, shown as an inbox list beside a preview of the selected email. */
  emails?: EmailItem[];
};

/** How a set of automated workflows connect: what triggers each, its logic, and where contacts go next. */
export type WorkflowWeb = {
  /** The journey stages, in order, that workflows attach to. */
  stages: string[];
  /** Stages that run alongside the journey rather than after it. */
  parallel?: string[];
  workflows: {
    id: string;
    name: string;
    stage: string;
    trigger: string;
    logic: string[];
    next: { label: string; to?: string }[];
    href?: string;
  }[];
};

/** One email in a sequence, shown in the inbox-style viewer. */
export type EmailItem = { label: string; subject: string; src: string; width: number; height: number; href?: string };

/** One piece of creative (a social post or an ad), shown in its format strip and labeled by brand and platform. */
export type Post = {
  id: string;
  brand: BrandId;
  platform: string;
  format: string;
  embed:
    | { type: "instagram"; url: string; height?: number }
    | { type: "facebook"; url: string; height?: number }
    | { type: "linkedin"; url: string; height?: number }
    | { type: "video"; src: string; poster?: string }
    /** One image for a static, several for a carousel. */
    | { type: "image"; srcs: string[]; width: number; height: number }
    | { type: "search"; headline: string; displayUrl: string; description: string };
};

/** A set of format strips: the formats in order, and the posts to sort into them. */
export type StripSet = {
  /** `width` overrides the card width for formats that need more room, like search ads. */
  formats: { format: string; name: string; width?: number }[];
  posts: Post[];
};

/** Top-performing posts, grouped on the page by format rather than by account. */
const socialPosts: Post[] = [
  {
    id: "scholar-giving-tuesday-reel",
    brand: "scholar",
    platform: "Instagram",
    format: "reel",
    embed: { type: "instagram", url: "https://www.instagram.com/reel/DRxIHPPDv8s/" },
  },
  {
    id: "futurestay-carousel-1",
    brand: "futurestay",
    platform: "Instagram",
    format: "carousel",
    embed: { type: "instagram", url: "https://www.instagram.com/p/DaOgTksnTZP/" },
  },
];

export const strips: Record<"social" | "ads", StripSet> = {
  social: {
    formats: [
      { format: "reel", name: "Reels" },
      { format: "carousel", name: "Carousels" },
      { format: "static", name: "Statics" },
    ],
    posts: socialPosts,
  },
  ads: {
    formats: [
      { format: "video", name: "Video" },
      { format: "static", name: "Static" },
      { format: "carousel", name: "Carousel" },
      { format: "search", name: "Google Search", width: 520 },
    ],
    posts: [
      {
        id: "futurestay-ad-your-own-booking-site",
        brand: "futurestay",
        platform: "Meta",
        format: "video",
        embed: { type: "video", src: "/futurestay/meta-ads/your-own-booking-site.mp4", poster: "/futurestay/meta-ads/your-own-booking-site.jpg" },
      },
      {
        id: "futurestay-ad-a-website-thats-actually-yours",
        brand: "futurestay",
        platform: "Meta",
        format: "video",
        embed: {
          type: "video",
          src: "/futurestay/meta-ads/a-website-thats-actually-yours.mp4",
          poster: "/futurestay/meta-ads/a-website-thats-actually-yours.jpg",
        },
      },
      {
        id: "futurestay-ad-1",
        brand: "futurestay",
        platform: "Meta",
        format: "video",
        embed: { type: "video", src: "/futurestay/meta-ads/meta-ad-1.mp4", poster: "/futurestay/meta-ads/meta-ad-1.jpg" },
      },
      {
        id: "futurestay-ad-2",
        brand: "futurestay",
        platform: "Meta",
        format: "video",
        embed: { type: "video", src: "/futurestay/meta-ads/meta-ad-2.mp4", poster: "/futurestay/meta-ads/meta-ad-2.jpg" },
      },
      {
        id: "scholar-search-career-skills",
        brand: "scholar",
        platform: "Google Search",
        format: "search",
        embed: { type: "image", srcs: ["/scholar/google-search-ad.png"], width: 732, height: 298 },
      },
    ],
  },
};

/** A tile in a craft row. Title, summary, and thumbnail can be tailored per craft. */
export type CraftItem = { project: string; title?: string; summary?: string; thumb?: string; video?: boolean };

export type Craft = {
  slug: string;
  name: string;
  description: string;
  items: CraftItem[];
  /** Show a set of format strips instead of project tiles. */
  strips?: "social" | "ads";
  /** Project pages with the story behind the strips. */
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "trialist-bootcamp",
    title: "Trialist Bootcamp",
    brand: "futurestay",
    period: "Shipped 2026 · Live",
    summary: "A 9-step in-app guide that turns the 14-day trial into a launch plan, with founder videos and a reward at the end.",
    thumb: "/bootcamp/guide-stage-1.png",
    overview: "An in-app onboarding guidebook that turns Futurestay's 14-day trial into a visible 9-step checklist with a graduation reward at the end. 66.4% of bootcamp hosts with a finished trial became paying customers. My most cross-functional project: I owned it end to end, from product and copy to video, build, and measurement.",
    collaborators: "The CEO (on camera), the Analytics team, Product, and Customer Success.",
    problem: "Futurestay's 14-day trial exposes new hosts to the product's real value: direct bookings via Stripe, Google Vacation Rentals, the Billboard Effect, Smart Rates, and listing optimization. But value only lands if hosts actually finish setup. Many didn't. They'd land on the dashboard, not know where to start, and churn before any of it mattered.\n\nThe product had the right features. What it lacked was a guided path from signup to competence, and a reason to finish.",
    process: [
      "Designed the trial as a 3-tab, 9-step checklist (Set Your Goals, Accept Direct Bookings, Boost Your Listing Performance) that shows exactly what to do, in what order, and how close you are to done",
      "Wrote the video scripts, then recorded and edited the founder-led videos that open each stage, with Futurestay's CEO on camera",
      "Wrote the guide copy and the bootcamp email series, starting with a personalized HubSpot welcome from each host's assigned CSM and a one-click link into their own guidebook",
      "Built a live market comp set (AirROI, with a ZIP-code fallback for hosts without an Airbnb listing) and goal sliders that turn market percentiles into real dollar targets",
      "Made it CSM-aware: every host sees their Success Manager's name, photo, and calendar, assigned by a round-robin that respects existing HubSpot ownership",
      "Gave the trial a finish line: complete all 9 steps and the host's CSM registers a free .com domain that redirects to their Futurestay direct booking site",
      "Built it as a single-file front end on Vercel with Node serverless functions, integrating HubSpot, AirROI, NameSilo, Vercel KV, and Slack",
    ],
    results: [
      { value: 66.4, suffix: "%", decimals: 1, label: "Trial → Customer (Finished Trials)" },
      { value: 13, prefix: "+", suffix: " pts", label: "Conversion for Hosts Who Engaged" },
      { value: 2.3, suffix: "×", decimals: 1, label: "Fewer Failed Trials" },
    ],
    resultsNote: "Measured in HubSpot on bootcamp hosts whose trials have finished, test accounts excluded. The engagement comparison is hosts who clicked into the guidebook (44% converted, 11% failed) vs those who didn't (31% converted, 25% failed), within the same market, workflows, and CSMs.",
    media: [
      {
        type: "image",
        label: "Stage 1: Set Your Goals",
        description: "Each stage opens with a founder video and a short checklist, with the host's CSM in the corner and the graduation reward always in view.",
        src: "/bootcamp/guide-stage-1.png",
        href: "https://futurestay-bootcamp-guide.vercel.app/",
      },
      {
        type: "image",
        label: "Market Comp Set",
        description: "Hosts paste their Airbnb listing (or enter a ZIP) to see what top properties like theirs earn.",
        src: "/bootcamp/comps.png",
      },
      {
        type: "image",
        label: "Earnings & Direct Booking Goals",
        description: "Sliders tied to real market percentiles turn a target into dollar outcomes.",
        src: "/bootcamp/goals.png",
      },
      {
        type: "image",
        label: "Graduation Rewards",
        description: "A visible finish line: finish all 9 steps to unlock a free .com domain, a Canva kit, and guest email templates.",
        src: "/bootcamp/rewards.png",
      },
      {
        type: "vimeo",
        label: "Stage 1 Video",
        description: "Opens the bootcamp and frames the two goals. Scripted, recorded, and edited by me.",
        id: "1201428890",
        hash: "2269697b24",
      },
      {
        type: "vimeo",
        label: "Stage 2 Video: Connect Stripe & Set Your Booking Mode",
        description: "Walks hosts through taking direct payments and choosing how guests book.",
        id: "1201441262",
        hash: "314159716e",
      },
      {
        type: "vimeo",
        label: "Stage 3 Video: Consider Smart Rates",
        description: "Explains daily pricing tuned to the host's market.",
        id: "1201809275",
        hash: "a4f5d9e0f2",
      },
    ],
    sections: [
      {
        title: "Measurement, Built In From Day One",
        paragraphs: [
          "Every step completion, graduation, and domain claim is written back to HubSpot contact properties, so the funnel can be measured instead of guessed. That data drives four reporting surfaces:",
        ],
        bullets: [
          "Real-time Slack notifications on every step completion, graduation, domain registration, and error",
          "A daily 9am digest of new graduates, hosts who made progress, and currently active trialists",
          "A weekly funnel digest every Monday, plus a CSM outreach list of trialists who haven't engaged",
          "A live performance dashboard with per-CSM breakdowns, conversion split by guidebook engagement, and engagement for every bootcamp email",
        ],
      },
      {
        title: "What I Took From It",
        bullets: [
          "Visible progress beats a feature list. The dashboard already had every feature a host needed. Putting them in order, with a count, changed behavior.",
          "Tangible rewards earn commitment. A free domain costs about ten dollars but reframes the trial from obligation to accomplishment.",
          "Measurement built on day one pays compounding interest. Because every step was recorded from the start, the guidebook's impact could be compared against a matched population.",
          "Design for the edge cases. Hosts without an Airbnb listing, hosts on VRBO, cancelled graduates, and Puerto Rico ZIP codes each needed a graceful path, not an error page.",
          "Choose durable identifiers early. Goals were first linked to Airbnb URLs, so manual entries silently vanished. Switching to a property ID fixed it.",
        ],
      },
    ],
    links: [
      { label: "Open the live guide", href: "https://futurestay-bootcamp-guide.vercel.app/", external: true },
    ],
  },
  {
    slug: "ready-to-launch-drip",
    title: "Ready-to-Launch Drip",
    brand: "futurestay",
    summary: "10 emails over 13 days that move hosts with a built site into a trial, then hand off to Sales.",
    overview: "Hosts who had built a direct booking site but hadn't started a trial were Futurestay's highest-intent segment. I wrote a 10-email, 13-day drip that takes them from \"your site is ready\" to taking bookings, then hands anyone who hasn't converted to Sales. It is the best-performing drip in Futurestay's HubSpot portal.",
    myRole: "Wrote every email in the sequence, set the cadence and A/B tests in HubSpot, and set up the handoff to Sales through automated tasks.",
    problem: "Hosts who had built a direct booking site but hadn't started a trial were the highest-intent people in the funnel, and the easiest to lose. They had done the hard part; they needed a reason to take the next step while the momentum was still there.",
    process: [
      "Targeted the Ready-to-Launch segment: hosts who have built a site but haven't started a trial",
      "Set the pacing of the sequence",
      "A/B-tested variants and rebuilt underperforming emails",
      "Handed non-converters to Sales through automated tasks when the drip ends",
    ],
    results: [
      { value: 12.5, suffix: "%", decimals: 1, label: "Click Rate, Best Email" },
      { value: 57.3, suffix: "%", decimals: 1, label: "Click-to-Open, Best Email" },
      { value: 10.2, suffix: "%", decimals: 1, label: "Click Rate, First Email" },
      { value: 5, suffix: "%", decimals: 1, label: "Click Rate, Whole Drip" },
    ],
    resultsNote: "For comparison, the legacy signup onboarding drip averages a 1.5% click rate.",
  },
  {
    slug: "lifecycle-email-program",
    title: "Lifecycle Email Program",
    brand: "futurestay",
    summary: "Every Futurestay drip: signup onboarding, activation, failed-trialist, and winback, written and A/B-tested.",
    overview: "I write every email, drip, and lead magnet at Futurestay. Beyond the Ready-to-Launch drip and the bootcamp series, that includes signup onboarding, host activation, failed-trialist, and winback sequences, all built and A/B-tested in HubSpot and connected to sales sequences and workflows.",
    process: [
      "Wrote the signup onboarding sequence, which branches on whether a host is ready to launch",
      "Wrote host activation, failed-trialist, and winback sequences, connected to sales sequences and HubSpot workflows",
      "A/B-tested subject lines, angles, and structure, and refined each sequence based on the results",
      "Ran cold outreach campaigns in Lemlist to open new pipeline",
    ],
    results: [
      { value: 62, prefix: "+", suffix: "%", label: "Clickthrough" },
      { value: 54, prefix: "−", suffix: "%", label: "Unsubscribes" },
      { value: 31.5, suffix: "%", decimals: 1, label: "Average Open Rate, All Emails" },
      { value: 4.65, suffix: "%", decimals: 2, label: "Average Click Rate, All Emails" },
    ],
    resultsNote: "Account-wide averages across 394 marketing emails and 280,364 delivered.",
    workflowWeb: {
      stages: ["Signup", "Site ready to launch", "Trial", "Trial didn't convert", "Lapsed"],
      parallel: ["Subscriber"],
      workflows: [
        {
          id: "signup-onboarding",
          name: "Signup Onboarding",
          stage: "Signup",
          trigger: "A new account is created.",
          logic: [
            "Branches on whether the host's site is ready to launch",
            "Ready hosts get a ready-to-launch welcome; everyone else gets a getting-started welcome and a demo-site email",
            "Stamps the contact's lifecycle stage at signup",
          ],
          next: [
            { label: "Site is ready, no trial yet", to: "rtl-drip" },
            { label: "Trial starts", to: "bootcamp" },
          ],
        },
        {
          id: "rtl-drip",
          name: "Ready-to-Launch Drip",
          stage: "Site ready to launch",
          trigger: "A host's site becomes ready to launch, but they haven't started a trial.",
          logic: ["Targets the highest-intent segment: hosts who have done the hard part", "Paced to keep momentum while intent is high"],
          next: [
            { label: "Trial starts", to: "bootcamp" },
            { label: "No trial: handed to Sales through automated tasks" },
          ],
          href: "/work/ready-to-launch-drip",
        },
        {
          id: "bootcamp",
          name: "Trialist Bootcamp",
          stage: "Trial",
          trigger: "A trial starts.",
          logic: [
            "Assigns a Customer Success Manager by round-robin, respecting existing HubSpot ownership",
            "Sends a personalized welcome from that CSM with a link to the host's own guidebook",
            "Separate reward and graduation flows fire as the host completes steps",
          ],
          next: [
            { label: "Converts to a paying customer" },
            { label: "Trial doesn't convert", to: "failed-trialist" },
          ],
          href: "/work/trialist-bootcamp",
        },
        {
          id: "failed-trialist",
          name: "Failed Trialist",
          stage: "Trial didn't convert",
          trigger: "A trial ends without converting, or payment fails.",
          logic: ["A short sequence that gives the host a reason to come back before they go cold"],
          next: [{ label: "Still no conversion", to: "winback" }],
        },
        {
          id: "winback",
          name: "Winback",
          stage: "Lapsed",
          trigger: "Contacts finish a drip without converting, or lapse.",
          logic: ["Long-running re-engagement on a steady cadence", "Where active A/B testing happens"],
          next: [{ label: "Re-engages and starts a trial", to: "bootcamp" }],
        },
        {
          id: "newsletter",
          name: "Futurestay Forward",
          stage: "Subscriber",
          trigger: "Someone subscribes to the newsletter.",
          logic: ["A welcome email on signup", "Then the monthly newsletter broadcast"],
          next: [{ label: "Stays in the monthly newsletter" }],
          href: "/work/futurestay-forward",
        },
      ],
    },
  },
  {
    slug: "futurestay-forward",
    title: "Futurestay Forward",
    brand: "futurestay",
    summary: "The company's first newsletter, which I branded, write, design, and send.",
    thumb: "/futurestay/newsletter-hero.jpg",
    overview: "I branded and launched Futurestay Forward, the company's first newsletter. I own every issue: research, copy, design, and HubSpot execution. Each one pulls together industry news, product updates, blog posts, events, host tips, and host spotlights.",
    process: [
      "Named and branded the newsletter",
      "Do all the research for every issue: industry news, Futurestay product updates, blog posts, events, host tips, and host spotlights",
      "Write, design, and send each issue in HubSpot",
    ],
    results: [
      { value: 5.7, suffix: "%", decimals: 1, label: "CTR, Up From Under 1%" },
      { value: 34.1, suffix: "%", decimals: 1, label: "Open Rate" },
    ],
    resultsNote: "The year-over-year unsubscribe rate also nearly halved. Recent issues open at 34–40%.",
    media: [
      {
        type: "image",
        label: "Futurestay Forward Newsletter",
        description: "The Sept/Oct 2026 issue, which I researched, wrote, designed, and sent.",
        src: "/futurestay/newsletter-hero.jpg",
      },
      {
        type: "image",
        label: "The Check-In, Featured in the Newsletter",
        description: "The short-form video series I created and produce with the CEO, repurposed into the newsletter.",
        src: "/futurestay/newsletter-check-in.jpg",
      },
    ],
  },
  {
    slug: "entangled-insights",
    title: "Entangled Insights",
    brand: "sqe",
    href: "/writing/entangled-insights-6",
    summary: "A LinkedIn newsletter I named, write, and produce, making quantum security readable for CISOs and CTOs.",
    thumb: "/writing/ei6/cover.webp",
  },
  {
    slug: "the-check-in",
    title: "The Check-In",
    brand: "futurestay",
    summary: "A short-form video series I created and produce with the CEO.",
    thumb: "/futurestay/newsletter-check-in.jpg",
    video: true,
    overview: "I created and launched The Check-In, a short-form video series produced with Futurestay's CEO. Each episode tackles real host questions and what is happening in the short-term rental market, and long-form partner conversations get repurposed into clips for social and email.",
    process: [
      "Created the series concept and format with the CEO",
      "Plan episodes around real host questions and market news",
      "Repurpose long-form partner conversations into short clips for social and email",
      "Feature each episode in the Futurestay Forward newsletter",
    ],
    media: [
      {
        type: "image",
        label: "The Check-In, Featured in the Newsletter",
        description: "The short-form video series I created and produce with the CEO, repurposed into the newsletter.",
        src: "/futurestay/newsletter-check-in.jpg",
      },
    ],
  },
  {
    slug: "meta-ads",
    title: "Meta Ad Creative",
    brand: "futurestay",
    summary: "Talking-head, animated, carousel, and static ads for Meta, from scripts and hooks through final approval.",
    thumb: "/futurestay/fs-meta-ad-1.jpg",
    video: true,
    overview: "Ad creative for Futurestay's paid acquisition on Meta, produced with an external ad agency: talking-head videos, animated videos, carousel ads, and static ads. I ran the creative process from scripts to final approval, recorded the ads myself, and handed finished creative to the paid ads contractor.",
    myRole: "Creative lead and on-camera talent. I worked with the agency on scripts and hooks, managed revisions and approvals at every stage, recorded the ads, and delivered the final creative to the paid ads contractor.",
    process: [
      "Worked with an external ad agency to write the scripts, with several hooks for each script",
      "Asked for revisions and approved every script and hook before production",
      "Recorded the ads myself and sent the raw footage to the agency",
      "The agency edited the footage into talking-head videos, animated videos, carousel ads, and static ads",
      "Reviewed every cut, asked for revisions, and gave final approval",
      "Handed the final creative off to the paid ads contractor",
    ],
    media: [
      {
        type: "video",
        label: "Your Own Booking Site (Hook 1)",
        description: "Talking-head ad I recorded, edited by the agency after I approved the script and hooks.",
        srcs: ["/futurestay/meta-ads/your-own-booking-site.mp4"],
        poster: "/futurestay/meta-ads/your-own-booking-site.jpg",
      },
      {
        type: "video",
        label: "A Website That's Actually Yours (Hook 1)",
        description: "Talking-head ad I recorded, edited by the agency after I approved the script and hooks.",
        srcs: ["/futurestay/meta-ads/a-website-thats-actually-yours.mp4"],
        poster: "/futurestay/meta-ads/a-website-thats-actually-yours.jpg",
      },
      {
        type: "video",
        label: "Meta Video Ad",
        srcs: ["/futurestay/meta-ads/meta-ad-1.mp4"],
        poster: "/futurestay/meta-ads/meta-ad-1.jpg",
      },
      {
        type: "video",
        label: "Meta Video Ad",
        srcs: ["/futurestay/meta-ads/meta-ad-2.mp4"],
        poster: "/futurestay/meta-ads/meta-ad-2.jpg",
      },
    ],
  },
  {
    slug: "giving-tuesday",
    title: "Giving Tuesday Reels",
    brand: "scholar",
    period: "Nov – Dec 2025",
    summary: "A founder Reel and talking-head video for a Giving Tuesday campaign that reached 87% of its $5K goal.",
    thumb: "/scholar/giving-tuesday.jpg",
    video: true,
    overview: "The social side of Scholar and a Dream's Giving Tuesday campaign to raise $5K for its next student cohort. I turned existing founder footage into an on-brand Reel and a talking-head video, and posted daily to support the email drip. The campaign raised 26% of its goal on Giving Tuesday itself and reached 87% by the time fundraising closed on December 31.",
    myRole: "Produced the campaign Reel and founder video from existing footage, wrote the captions, and coordinated daily social posts to support the email sends.",
    process: [
      "Produced a campaign Reel by stitching together existing founder videos into a high-energy, on-brand piece",
      "Produced a talking-head founder video on why the mission matters to them, styled for the brand and audience",
      "Wrote the Reel caption with a tiered donation structure ($5 to $500) showing exactly what each dollar funds",
      "Created daily social media content to amplify the email drip and build momentum across Instagram",
    ],
    results: [
      { value: 26, suffix: "%", label: "Of Goal Raised on Giving Tuesday" },
      { value: 87, suffix: "%", label: "Of $5K Goal by December 31" },
    ],
    resultsNote: "Campaign-wide results, across email and social. Fundraising continued for three weeks after Giving Tuesday.",
    media: [
      {
        type: "instagram",
        label: "Giving Tuesday Reel",
        description: "Produced from existing founder footage to drive Giving Tuesday donations",
        url: "https://www.instagram.com/reel/DRxIHPPDv8s/",
      },
      {
        type: "video",
        label: "Giving Tuesday Founder Video",
        description: "Talking head video featuring the Scholar and a Dream founders discussing why the mission matters to them, stylized for their brand and audience.",
        srcs: ["/scholar/giving-tuesday-founder-video.mp4"],
        poster: "/scholar/giving-tuesday-founder-video.jpg",
      },
    ],
    links: [{ label: "See the Giving Tuesday email drip", href: "/work/giving-tuesday-emails" }],
  },
  {
    slug: "giving-tuesday-emails",
    title: "Giving Tuesday Email Drip",
    brand: "scholar",
    period: "Nov – Dec 2025",
    summary: "Seven emails, from a year-in-review warm-up to a thank-you, for a campaign that reached 87% of its $5K goal.",
    thumb: "/scholar/giving-tuesday-emails/thumb.webp",
    overview: "The email side of Scholar and a Dream's Giving Tuesday campaign to raise $5K for its next student cohort. I built a 7-email drip, each email with a distinct angle, and wrote all of the copy. The campaign raised 26% of its goal on Giving Tuesday itself and reached 87% by the time fundraising closed on December 31.",
    myRole: "Designed the drip, wrote all of the email copy, and A/B-tested every subject line, with daily social posts coordinated to support each send.",
    process: [
      "Designed a 7-email drip sequence to contacts, each with a distinct angle: program overview, mentor stories, scholar stories, impact data, tiered giving breakdown, and urgency-driven closing asks",
      "Wrote all email copy with clear CTAs connecting donations to tangible student outcomes",
      "A/B-tested the subject line of every email in the sequence",
      "Tracked performance across email and social throughout the campaign",
    ],
    results: [
      { value: 26, suffix: "%", label: "Of Goal Raised on Giving Tuesday" },
      { value: 87, suffix: "%", label: "Of $5K Goal by December 31" },
      { value: 7, label: "Emails in the Drip" },
    ],
    resultsNote: "Campaign-wide results, across email and social. Fundraising continued for three weeks after Giving Tuesday.",
    emails: [
      {
        label: "Email 1 · Year in Review",
        subject: "Mentorship, Milestones & Momentum: Scholar and a Dream’s Year in Review",
        src: "/scholar/giving-tuesday-emails/email-1.webp",
        width: 600,
        height: 3788,
        href: "https://us20.campaign-archive.com/?u=cf197ae5c9933b93a0e9e4c47&id=94adc1ebbd",
      },
      {
        label: "Email 2 · From the CEO",
        subject: "Why I started Scholar & A Dream, and why your gift matters",
        src: "/scholar/giving-tuesday-emails/email-2.webp",
        width: 600,
        height: 857,
        href: "https://mailchi.mp/248a869f457e/why-i-started-scholar-a-dream-and-why-your-gift-matters",
      },
      {
        label: "Email 3 · Scholar Story",
        subject: "🙌 This is what happens when students feel seen",
        src: "/scholar/giving-tuesday-emails/email-3.webp",
        width: 600,
        height: 1615,
        href: "https://mailchi.mp/8a68b3203e53/this-is-what-happens-when-students-feel-seen",
      },
      {
        label: "Email 4 · Giving Tuesday",
        subject: "Giving Tuesday is here!",
        src: "/scholar/giving-tuesday-emails/email-4.webp",
        width: 600,
        height: 1021,
        href: "https://mailchi.mp/b4db450a6c7d/giving-tuesday-is-here",
      },
      {
        label: "Email 5 · Every Gift Counts",
        subject: "No gift is too small",
        src: "/scholar/giving-tuesday-emails/email-5.webp",
        width: 600,
        height: 1188,
        href: "https://mailchi.mp/3f7328162cf3/no-gift-is-too-small",
      },
      {
        label: "Email 6 · Final Hours",
        subject: "🚨 URGENT: Just a few hours left",
        src: "/scholar/giving-tuesday-emails/email-6.webp",
        width: 600,
        height: 695,
        href: "https://mailchi.mp/e708b1e6de42/urgent-just-a-few-hours-left",
      },
      {
        label: "Email 7 · Thank You",
        subject: "$1,301 Raised & Counting, Thank You!!",
        src: "/scholar/giving-tuesday-emails/email-7.webp",
        width: 600,
        height: 929,
        href: "https://mailchi.mp/5dcb6a517161/1301-raised-counting-thank-you",
      },
    ],
    links: [{ label: "See the Giving Tuesday Reels", href: "/work/giving-tuesday" }],
  },
  {
    slug: "quecredit",
    title: "QueCredit Launch Video",
    brand: "sqe",
    period: "2023",
    summary: "An introduction video for QueCredit, SQE's semi-stable cryptocurrency, that I scripted, produced, and edited.",
    video: true,
    overview: "SQE needed to introduce QueCredit, its semi-stable cryptocurrency built on quantum-secure blockchain. I wrote the script, produced the video with a text-to-speech voiceover and custom visuals, and edited it for social.",
    myRole: "Wrote the script, selected the text-to-speech voiceover, and created and edited the full video.",
    process: [
      "Wrote the full script introducing QueCredit and its role in SQE's quantum-secure ecosystem",
      "Produced the video using text-to-speech voiceover and custom visuals",
      "Edited and finalized the video for social",
    ],
    media: [
      {
        type: "instagram",
        label: "QueCredit Introduction Video",
        description: "Scripted, produced, and edited video introducing SQE's semi-stable cryptocurrency",
        url: "https://www.instagram.com/reel/CvXCCw2Nd35/",
      },
    ],
  },
  {
    slug: "google-ads-grant",
    title: "Google Ads Grant",
    brand: "scholar",
    summary: "A $10K/month Google Ads Grant run for volunteer and donor outreach.",
    overview: "I manage Scholar and a Dream's $10K/month Google Ads Grant, using it to reach volunteers, mentors, and donors on a nonprofit budget.",
    process: [
      "Did the keyword research behind every campaign",
      "Manage the organization's $10K/month Google Ads Grant for volunteer and donor outreach",
      "Build campaigns around volunteer recruitment, mentoring, and giving",
      "Write ad copy and point each campaign at a page built for that action",
    ],
    results: [
      { value: 47.6, suffix: "%", decimals: 1, label: "Google Ads Conversion Rate" },
      { value: 10, prefix: "$", suffix: "K/mo", label: "Google Ads Grant Managed" },
    ],
    media: [
      {
        type: "image",
        label: "Search Ad: Career Skills",
        description: "A Google Search ad promoting career-skills content, with sitelinks to learn more, read more, about us, and donate.",
        src: "/scholar/google-search-ad.png",
      },
    ],
  },
  {
    slug: "thanks-for-visiting",
    title: "Thanks For Visiting Partnership",
    brand: "futurestay",
    summary: "A multi-channel creator activation, end to end, with a co-branded landing page.",
    thumb: "/cobrand-tfv.png",
    overview: "Thanks For Visiting is one of the most recognized voices in the short-term rental space, known for making hosting approachable and building a deeply engaged community of independent hosts. I identified them as a strategic fit for Futurestay, reached out, vetted their content and audience alignment, negotiated partnership terms, and managed the activation from start to finish. The goal: get Futurestay in front of TFV's 1-5 property hosts who were ready to start taking direct bookings. We activated across every channel TFV touches and produced evergreen content that continues to perform.",
    myRole: "End-to-end partnership ownership. I sourced and discovered TFV, evaluated their audience and content fit, led outreach, met with their team to align on content ideas, negotiated the partnership terms, created a co-branded landing page with a 25% off Amplify Annual + 14-day free trial offer, and managed all deliverables through completion.",
    process: [
      "Identified Thanks For Visiting as a high-trust voice in the STR space with strong audience overlap in Futurestay's target segment",
      "Initiated outreach, met with the TFV team to evaluate content fit and brainstorm campaign ideas",
      "Negotiated an activation package spanning email, YouTube, podcast, Instagram, blog, and newsletter",
      "Built a co-branded landing page offering 25% off Amplify Annual with a 14-day free trial",
      "Managed the partnership through execution across all deliverables: dedicated email blast to TFV's full list, 30-second YouTube ad with sponsor highlight in show notes, a branded podcast interview with CTA in show notes and a supporting email blast and Instagram story/post, a 20-minute Instagram Live, an SEO-optimized blog post with embedded video, and logo placement in TFV's newsletter",
    ],
    media: [
      {
        type: "image",
        label: "Co-Branded Landing Page",
        description: "Custom landing page for TFV audience with 25% off Amplify Annual + 14-day free trial",
        src: "/cobrand-tfv.png",
      },
    ],
  },
  {
    slug: "creator-program",
    title: "Creator & Referral Programs",
    brand: "futurestay",
    summary: "A creator program built from scratch, plus ambassador and referral programs.",
    overview: "I built Futurestay's creator program from scratch, then added ambassador and referral programs to open new organic acquisition channels.",
    process: [
      "Sourced and vetted creators, negotiated terms, wrote and finalized contracts, and managed each partnership through completion",
      "Offered select creators a renewal or a path into the ambassador program at the end of each engagement",
      "Built custom interactive lead magnets for activations, connected to HubSpot for automated capture and nurture",
      "Built a co-branded landing page for each creator partner; the top creator page turned 67% of its trialists into paying customers",
      "Supported seven strategic partnerships through co-branded landing pages, social and email promotions, and podcast planning",
      "Designed and launched an ambassador program, and a host referral program with Sales",
    ],
    results: [
      { value: 70, suffix: "%", label: "Creator Trialists Who Became Customers" },
      { value: 56.5, suffix: "%", decimals: 1, label: "All Trialists, for Comparison" },
      { value: 67, suffix: "%", label: "Top Creator Landing Page, Trial → Customer" },
    ],
    resultsNote: "First-touch attribution in HubSpot, Oct 2025 to Oct 2026.",
    links: [
      { label: "See the Thanks For Visiting partnership", href: "/work/thanks-for-visiting" },
    ],
  },
  {
    slug: "cybersecurity-girl",
    title: "Cybersecurity Girl Alliance",
    brand: "sqe",
    summary: "SQE's first major partnership: a one-year co-marketing alliance, plus the company's first webinar.",
    overview: "I secured SQE's first major strategic partnership with Cybersecurity Girl, a one-year co-marketing alliance that became the foundation for the partner program.",
    process: [
      "Secured a one-year co-marketing alliance with Cybersecurity Girl, valued at $900K in marketing",
      "Developed partner content for both audiences",
      "Shaped and marketed SQE's first webinar, attracting 150+ registrants",
      "Launched a strategic partner portal and program",
    ],
    results: [
      { value: 900, prefix: "$", suffix: "K", label: "Partnership Value" },
      { value: 150, suffix: "+", label: "Webinar Registrants" },
    ],
  },
  {
    slug: "clean-connection",
    title: "The Clean Connection",
    brand: "futurestay",
    summary: "A weekly cleanliness-score dashboard built for a creator partner, wired into HubSpot.",
    thumb: "/clean-connection/dashboard-listings.png",
    overview: "A major influencer partner in the STR space requested a tool to offer their audience. I built the entire system end to end: a free Airbnb cleanliness score tracking dashboard that functions as a product-led lead generation engine with full partner attribution. It's not a static PDF lead magnet. It's a living tool that hosts return to weekly, creating ongoing engagement and multiple conversion opportunities.",
    myRole: "Designed, built, and deployed every part of this system from scratch: the landing page, the dashboard, the email automation, the CRM integration, the competitor benchmarking tool, the weekly reporting system, and the full CTA strategy. Tech stack: Vercel, AirROI API, Resend, HubSpot, and Slack.",
    process: [
      "Built a conversion-optimized landing page with name and email capture flowing directly into HubSpot as new contacts with partner referral source attribution",
      "Automated a welcome email via Resend delivering a unique, passwordless dashboard access link",
      "Built the core dashboard where users paste Airbnb listing URLs to track per-listing metrics: Cleanliness Score, Overall Rating, Occupancy Rate, and Average Daily Rate, with a property comparison tool for up to 6 listings side by side on time-series charts",
      "Created an individual listing deep dive with full rating breakdowns across all 6 Airbnb categories, interactive performance timeline with positive vs. negative review trends and RevPar overlay, hover-to-reveal review details, AI-generated insights, and filterable guest reviews with automatic cleanliness concern detection",
      "Built Clean Competition: a competitor benchmarking tool where hosts paste up to 5 competitor URLs per listing for side-by-side cleanliness score trend comparison with a built-in guide on identifying true competitors",
      "Designed weekly automated email reports (every Monday) with personalized per-property metrics, delta indicators for change tracking, new review callouts, and dual CTAs for engagement and conversion",
      "Architected a contextual CTA strategy where every touchpoint routes to either a co-branded partner landing page (25% off, attributed) or a sales booking link, with messaging that adapts based on where the user is in the tool",
      "Set up Slack monitoring with notifications on weekly cron job runs and direct links to Vercel logs for failure debugging",
    ],
    results: [
      { value: 10, label: "Funnel Stages" },
      { value: 6, label: "Airbnb Rating Categories Tracked" },
      { value: 5, label: "Competitor URLs per Listing" },
      { value: 6, label: "Properties Compared Side-by-Side" },
    ],
    media: [
      {
        type: "image",
        label: "Landing Page",
        description: "Conversion-optimized sign-up page with name + email capture flowing into HubSpot with partner attribution",
        src: "/clean-connection/landing-page.png",
      },
      {
        type: "image",
        label: "Welcome Email",
        description: "Automated passwordless access link via Resend with single CTA",
        src: "/clean-connection/welcome-email.png",
      },
      {
        type: "image",
        label: "Empty Dashboard",
        description: "Clear empty state guiding users to paste their first Airbnb URL",
        src: "/clean-connection/dashboard-empty.png",
      },
      {
        type: "image",
        label: "Populated Dashboard",
        description: "Live listing cards with Cleanliness Score, Occupancy, and ADR pulled from Airbnb APIs",
        src: "/clean-connection/dashboard-listings.png",
      },
      {
        type: "image",
        label: "Property Comparison",
        description: "Time-series chart comparing up to 6 properties with Superhost threshold line",
        src: "/clean-connection/compare-properties.png",
      },
      {
        type: "image",
        label: "Listing Detail",
        description: "Full deep-dive: cleanliness score, all 6 rating categories, performance timeline, AI insights, guest reviews, and snapshot history",
        src: "/clean-connection/listing-detail.png",
      },
      {
        type: "image",
        label: "Performance Timeline",
        description: "Interactive bar chart with hover tooltips showing reviewer names, scores, and review snippets with RevPar overlay toggle",
        src: "/clean-connection/performance-timeline.png",
      },
      {
        type: "image",
        label: "Rating Performance",
        description: "All 6 Airbnb categories ranked with Superhost threshold and review counts per category",
        src: "/clean-connection/rating-performance.png",
      },
      {
        type: "image",
        label: "Guest Reviews",
        description: "Filterable reviews with auto-detection tagging for cleanliness mentions across positive and negative reviews",
        src: "/clean-connection/guest-reviews.png",
      },
      {
        type: "image",
        label: "Snapshot History",
        description: "Weekly performance snapshots with YTD averages and CSV export for sales call prep",
        src: "/clean-connection/snapshot-history.png",
      },
      {
        type: "image",
        label: "Clean Competition",
        description: "Competitor benchmarking with up to 5 competitor URLs, trend comparison chart, and built-in coaching on identifying true competitors",
        src: "/clean-connection/clean-competition.png",
      },
      {
        type: "image",
        label: "Weekly Email Report",
        description: "Automated Monday digest with per-property metrics, delta tracking, new review callouts, and dual CTAs with partner photo",
        src: "/clean-connection/weekly-email.png",
      },
    ],
  },
  {
    slug: "verve-website",
    title: "Verve Website Rebuild",
    brand: "verve",
    role: "Marketing Consultant (Contract): strategy, content, copy, IA, design direction & launch",
    period: "Sep 2026 – Present · Live October 2026",
    summary: "31 pages in Squarespace, built so federal evaluators can buy without picking up the phone.",
    thumb: "/verve/mockup-homepage-framed.png",
    overview: "Verve is a Service-Disabled Veteran-Owned and Woman-Owned Small Business in Baltimore supporting the VA, CMS, the Defense Health Agency, and the CDC. The credentials and the work were both real. The website was a GoDaddy site builder that couldn't answer what a contracting officer needs before a phone call becomes necessary. I led the strategy, content, copy, and design direction for the rebuild: 31 pages in Squarespace 7.1, a shared layout system, and procurement content treated as a first-class deliverable.",
    collaborators: "Subject-matter experts, an in-house designer, and Verve's technology partners.",
    problem: "Federal procurement runs on evaluation. Before a contract, someone has to answer three questions: what does this company do, who has it done it for, and how do I buy from it.\n\nThat person is under time pressure. They are looking at several vendors. They are starting with the website.\n\nThe old site was built on GoDaddy Website Builder. It didn't answer any of those questions.\n\nWhen a website can't answer the basics, evaluation stalls. It turns into a phone call. Or it doesn't happen at all.\n\nA contracting officer with five vendors and an afternoon doesn't chase the one whose website is opaque.",
    process: [
      "Identified three specific reader types in order of commercial value: contracting officers and program offices at federal health agencies, prime contractors evaluating Verve as a teaming or subcontracting partner, and technology partners considering a joint solution. All three are specialist readers who do not want marketing copy",
      "Restructured ten capabilities and seven named solutions into a single repeating page pattern: same spine across every page, so a reader who learns to read one page can read all of them. Complexity presented as a wall of prose reads as vagueness. Consistency is what makes depth legible",
      "Elevated procurement content to first-class real estate: contract vehicles got a dedicated page, and NASA SEWP VI got its own page with full contract detail including contract number, period of performance, surcharge, UEI and CAGE, the fair-opportunity clause with attribution, program office contacts, and a downloadable ordering guide",
      "Enforced a nothing-invented rule across all 31 pages: every claim traces to something verifiable. Where content didn't exist yet, the page said so rather than inventing something to fill the space. In federal work, overstatement is a disqualifier rather than a growth tactic",
      "Governed partner-approved language over house style: two solutions are delivered with technology partners whose approved blurbs had to be used word for word. Built page layouts around their text rather than around editorial preferences",
      "Rebuilt the layout as a shared compact system: on Program Integrity, the hero went from occupying 46% of available width to 93%, the closing CTA from 28% to 92%, and the page dropped from 6,225px to 4,805px. Same content, 23% less scrolling, applied across all eleven capability pages",
      "Drew ten custom SVG icons for the capabilities overview, redrawn at 0.75 stroke weight after the first set read as too heavy at card size. Placed twelve client-supplied graphics in-band within copy with full descriptive alt text",
      "Built the page system in Squarespace 7.1: a homepage, ten capability pages plus an overview, seven solution pages plus an overview, contract vehicles, a dedicated NASA SEWP VI page, team bios, policies, contact, and perspectives. Shared page patterns are driven from Custom CSS, so a layout change propagates everywhere at once",
      "Ran a full mobile pass across all 31 pages, measured at 375x812. Squarespace's Fluid Engine kept desktop row placements on mobile, so the footer ran 1,229px tall for about 700px of content; collapsing the empty rows brought it to 872px. Micro-labels rendering at 9.6–11px got a 12.5px floor",
      "Set a restrained design system for readers who read documents, not marketing: a crimson palette with a single gold accent used only for rules, icons, and primary actions, Juturu and Public Sans, and line-by-line copy rules",
      "Verified every CSS change against the served stylesheet, after finding that Squarespace's LESS 1.3.3 compiler silently drops valid CSS such as grid-column: 1 / -1 and mixed-unit calc()",
      "Migrated two domains record by record to preserve the company's Microsoft 365 email, which lived in the same DNS zone. Switching to new nameservers would have taken email down. Both domains carry valid certificates with .co redirecting to .com as primary",
      "Installed Microsoft Clarity and Google Analytics at launch to establish a performance baseline from day one. The site launched with zero analytics on it previously",
      "Wrote the executive LinkedIn launch announcement for the CEO, built on his two decades inside CMS",
    ],
    results: [
      { value: 31, label: "Pages, Live" },
      { value: 23, suffix: "%", label: "Less Scrolling" },
      { value: 10, label: "Custom SVG Icons" },
      { value: 17, label: "Capability + Solution Pages" },
    ],
    media: [
      {
        type: "image",
        label: "Homepage: The Two Most Important Buttons",
        description: "The gold 'View Our Capabilities' button answers what does this company do. The 'Capability Statement' button, above the fold in the hero, answers how do I buy from it. Most federal contractor sites bury the capability statement in a footer PDF. Putting it in the hero is a procurement decision.",
        src: "/verve/mockup-homepage-framed.png",
      },
      {
        type: "image",
        label: "Capabilities Overview: 10 Cards, One Pattern",
        description: "Ten capabilities, each with a custom SVG icon drawn at 0.75 stroke weight, each defined by a 2px gold top border rather than a box. A page of capabilities should read as a list, not a grid of competing tiles. Each card leads to its own dedicated page with the same spine: eyebrow, headline, goals, graphic, and CTA.",
        src: "/verve/mockup-capabilities-framed.png",
      },
      {
        type: "image",
        label: "Contract Vehicles: Procurement as Content",
        description: "UEI, CAGE code, set-aside designations, NAICS codes, GSA MAS contract number, and a dedicated NASA SEWP VI section. Structured as content, not a footnote. The contracting officer who needs this information should be able to find and read it in one visit, without a phone call.",
        src: "/verve/mockup-procurement-framed.png",
      },
      {
        type: "image",
        label: "About: Built for the Evaluator",
        description: "Written for prime contractors and program offices evaluating a teaming partner, not a general audience. The about page positions Verve's delivery model: technical expertise paired with federal agency experience. No marketing language. Individual team bios with credentials and agency backgrounds are procurement content.",
        src: "/verve/mockup-about-framed.png",
      },
    ],
    mediaLayout: "mockups",
    sections: [
      {
        title: "What I'm Measuring",
        paragraphs: [
          "The site went live in late October 2026 with analytics installed at launch, so there is no performance data yet. Publishing numbers now would mean making them up. What's being watched:",
        ],
        bullets: [
          "Capability statement downloads, the clearest intent signal on the site",
          "NASA SEWP ordering guide downloads, a near-pure procurement signal",
          "Contract vehicles page traffic and depth: are buyers reaching the procurement information at all?",
          "Which capability and solution pages actually get read, so navigation can follow what pulls",
          "Contact form submissions by inquiry type, segmented by capability",
          "Clarity session recordings and rage clicks: where evaluators stall, the question the whole rebuild set out to answer",
        ],
      },
    ],
    links: [
      { label: "Visit vervellc.com", href: "https://vervellc.com/", external: true },
    ],
  },
  {
    slug: "futurestay-seo",
    title: "Landing Pages & SEO",
    brand: "futurestay",
    summary: "The main direct-booking landing page and every creator page, built in HubSpot and tuned with Microsoft Clarity.",
    thumb: "/futurestay/landing-page/thumb.webp",
    overview: "I build Futurestay's landing pages, including the main direct-booking page that carries most of the funnel and a co-branded page for each creator partner. I made the product imagery with AI, styled as UX/UI cards that show what hosts get, and I optimize every page by analyzing visitor behavior in Microsoft Clarity. I also manage SEO content strategy and the agency's deliverables.",
    process: [
      "Built the main landing pages in HubSpot, including the direct-booking page that drives most of Futurestay's trials",
      "Built a co-branded landing page for each creator partner",
      "Created the page imagery with AI, designed as UX/UI cards that show the product instead of stock photos",
      "Optimize every page by analyzing visitor behavior in Microsoft Clarity, then adjusting layout and copy",
      "Optimized landing page copy with a growth marketer, using keyword research",
      "Managed SEO content strategy and external agency deliverables",
    ],
    media: [
      {
        type: "image",
        label: "Hero",
        description: "The direct-booking landing page I built: one promise, two ways to start, and partner credibility above the fold.",
        src: "/futurestay/landing-page/hero.webp",
      },
      {
        type: "image",
        label: "AI-Generated UI Cards",
        description: "Product imagery I made with AI and styled as interface cards, so each feature shows what the host actually gets.",
        src: "/futurestay/landing-page/ui-cards-1.webp",
      },
      {
        type: "image",
        label: "Feature Sections",
        description: "Each section pairs one benefit with a UI card, alternating sides to keep the page easy to scan.",
        src: "/futurestay/landing-page/ui-cards-2.webp",
      },
      {
        type: "image",
        label: "Comparison Table",
        description: "A side-by-side comparison against the alternatives hosts are already considering.",
        src: "/futurestay/landing-page/comparison.webp",
      },
    ],
    results: [
      { value: 62, suffix: "%", label: "Of Landing-Page Trials From the Main Page" },
      { value: 58.5, suffix: "%", decimals: 1, label: "Landing-Page Trialists Who Became Customers" },
      { value: 1271, suffix: "%", label: "Google Search Clicks" },
      { value: 469, suffix: "%", label: "Organic Sessions" },
      { value: 99, suffix: "%", label: "Website Traffic Growth" },
      { value: 31.4, suffix: "%", decimals: 1, label: "Organic Signup → Trial Rate" },
    ],
    resultsNote: "Landing-page figures are HubSpot first-touch, Oct 2025 to Oct 2026. Search and traffic growth are company-wide numbers that my SEO content and distribution contributed to; organic search converts signups to trials at more than double the 13.8% average.",
  },
  {
    slug: "scholar-seo-blogs",
    title: "Scholarship SEO Blogs",
    brand: "scholar",
    summary: "Blog posts that rank for the scholarship searches students actually make.",
    overview: "I wrote SEO-optimized blog content to drive organic discoverability for Scholar and a Dream's scholarship and program pages, and developed an SEO-aligned blog strategy for student success stories.",
    process: [
      "Wrote SEO-optimized blog content for scholarship and program pages",
      "Developed an SEO-aligned blog strategy for student success stories",
    ],
    media: [
      {
        type: "link",
        label: "SEO Blog: How to Find College Scholarships",
        description: "SEO-optimized blog written to drive organic discoverability for scholarship resources",
        href: "https://www.scholarandadream.org/post/how-to-find-college-scholarships-you-actually-qualify-for",
      },
      {
        type: "link",
        label: "SEO Blog: Why Equity in Education Matters",
        description: "Thought leadership blog driving organic traffic to the nonprofit's mission and programs",
        href: "https://www.scholarandadream.org/post/why-equity-in-education-matters",
      },
    ],
  },
  {
    slug: "ripple",
    title: "Ripple",
    brand: "ripple",
    role: "Founder & Brand Strategist",
    summary: "My side project: a two-sided volunteering marketplace, from name and brand to PRD and go-to-market.",
    thumb: "/ripple-logo.png",
    overview: "Ripple is a two-sided marketplace connecting IRS-verified nonprofits with background-checked volunteers. Designed for travelers and locals who want to volunteer on short notice, and for nonprofits who need reliable short-term help. I conceived the idea, built the brand from zero, and developed the full go-to-market strategy independently.",
    problem: "Ripple started as a concept with no infrastructure behind it. Before building anything, the project needed a name, a brand, a validated market, a competitive landscape analysis, a business model, and a clear product strategy. I owned all of it.",
    process: [
      "Named the company and developed full brand identity: logo concepts, color system, brand voice guidelines, and tagline",
      "Wrote a comprehensive Product Requirements Document covering user personas, MVP scope, user flows, feature specs, database schema, API integrations, and tech stack decisions",
      "Conducted a full competitor SWOT analysis across 5 major platforms (VolunteerMatch/Idealist, JustServe, Points of Light, Galaxy Digital, Golden) with feature comparison matrix",
      "Built a Strategyzer-based business plan with product roadmap, 18-month financial outlook, break-even analysis, grant application timeline, and growth flywheel",
      "Created a Business Model Canvas presentation",
      "Designed and deployed market research surveys for both nonprofits and volunteers",
      "Built wireframes for the platform MVP",
      "Defined a phased launch strategy: Puerto Rico beta (50 nonprofits, 500 volunteers), 15 US cities, then Canada",
    ],
    media: [
      {
        type: "image",
        label: "Brand Identity",
        description: "Naming, logo design, color system, and tagline. \"Ripple\" represents a single action that spreads outward and creates impact beyond itself. Navy conveys trust and institutional credibility. Lime brings energy and freshness, breaking from typical nonprofit aesthetics. Together: serious mission, fresh approach.",
        src: "/ripple-logo.png",
      },
      {
        type: "image",
        label: "Product Wireframes",
        description: "Interactive wireframes for the MVP covering volunteer flows, nonprofit dashboards, donation conversion, and impact tracking.",
        src: "/ripple-wireframe-session.jpg",
        gallery: [
          "/ripple-wireframe-session.jpg",
          "/ripple-wireframe-funnel.jpg",
          "/ripple-wireframe-donation.jpg",
          "/ripple-wireframe-donor-dash.jpg",
          "/ripple-wireframe-impact.jpg",
        ],
      },
      {
        type: "image",
        label: "Nonprofit Survey",
        description: "Market research survey for nonprofits to validate pain points, willingness to pay, and platform needs.",
        src: "/ripple-survey-nonprofit.jpg",
      },
      {
        type: "image",
        label: "Volunteer Survey",
        description: "Market research survey for volunteers to validate demand for flexible, short-notice volunteering.",
        src: "/ripple-survey-volunteer.jpg",
      },
    ],
  },
];

export const crafts: Craft[] = [
  {
    slug: "email-lifecycle",
    name: "Email & Lifecycle",
    description: "Drips, onboarding, and winback sequences, written and A/B-tested in HubSpot and Mailchimp.",
    items: [
      { project: "ready-to-launch-drip" },
      { project: "lifecycle-email-program" },
      { project: "giving-tuesday-emails" },
    ],
  },
  {
    slug: "onboarding-nurture",
    name: "Onboarding & Nurture",
    description: "Guided programs that take new users from sign-up to their first win, and keep them moving.",
    items: [
      {
        project: "trialist-bootcamp",
        summary: "A 9-step in-app guide, founder videos, and an email series that walk every trialist from sign-up to graduation.",
      },
    ],
  },
  {
    slug: "lead-magnets",
    name: "Lead Magnets",
    description: "Interactive tools that turn visitors into leads, built with Claude Code and wired into HubSpot.",
    items: [{ project: "clean-connection" }],
  },
  {
    slug: "newsletters",
    name: "Newsletters",
    description: "Newsletters I named, write, and send.",
    items: [
      { project: "futurestay-forward" },
      { project: "entangled-insights" },
    ],
  },
  {
    slug: "ads",
    name: "Ads",
    description: "Paid creative for Meta and Google, by format.",
    items: [],
    strips: "ads",
    links: [
      { label: "How the Meta ads were made", href: "/work/meta-ads" },
      { label: "Google Ads Grant", href: "/work/google-ads-grant" },
    ],
  },
  {
    slug: "social-media",
    name: "Social Media",
    description: "Top-performing posts across the accounts I've run, by format.",
    items: [],
    strips: "social",
  },
  {
    slug: "partnerships",
    name: "Partnerships & Creators",
    description: "Creator programs, co-marketing alliances, and referral and ambassador programs.",
    items: [
      { project: "thanks-for-visiting" },
      { project: "creator-program" },
      { project: "cybersecurity-girl" },
    ],
  },
  {
    slug: "websites-seo",
    name: "Websites & SEO",
    description: "Information architecture, copy, and search for sites that have to answer real questions.",
    items: [
      { project: "verve-website" },
      { project: "futurestay-seo" },
      { project: "scholar-seo-blogs" },
    ],
  },
  {
    slug: "brand-strategy",
    name: "Brand & Strategy",
    description: "Naming, identity, positioning, and go-to-market from zero.",
    items: [
      { project: "ripple" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectHref(p: Project) {
  return p.href ?? `/work/${p.slug}`;
}

/** Crafts a project appears in, in row order. */
export function craftsFor(slug: string) {
  return crafts.filter((c) => c.items.some((i) => i.project === slug));
}
