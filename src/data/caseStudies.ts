export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

export type Media =
  | { type: "image"; label: string; description: string; src: string; gallery?: string[]; href?: string }
  | { type: "video"; label: string; description: string; srcs: string[] }
  | { type: "vimeo"; label: string; description: string; id: string; hash: string }
  | { type: "instagram"; label: string; description: string; url: string }
  | { type: "link"; label: string; description: string; href: string };

export type Campaign = {
  title: string;
  period?: string;
  overview: string;
  myRole: string;
  process: string[];
  output: string;
  results?: Stat[];
  resultsNote?: string;
  media?: Media[];
};

export type ProofLink = { label: string; href: string; external?: boolean };

export type ExtraSection = { title: string; paragraphs?: string[]; bullets?: string[] };

export type CaseStudy = {
  slug: string;
  company: string;
  industry: string;
  role: string;
  period?: string;
  color: string;
  tags: string[];
  /** Short pitch shown on the homepage card. */
  summary: string;
  /** The one result a reader should see in the first ten seconds. */
  headline?: { value: string; text: string; note?: string };
  overview: string;
  collaborators?: string;
  /** Paragraphs separated by blank lines. */
  problem: string;
  strategy: string[];
  campaigns?: Campaign[];
  media?: Media[];
  mediaLayout?: "grid" | "mockups";
  results?: Stat[];
  resultsNote?: string;
  /** Extra collapsible sections after The Work (instrumentation, lessons, what's being measured). */
  extraSections?: ExtraSection[];
  proof?: ProofLink[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "futurestay",
    company: "Futurestay",
    industry: "SaaS / Short-Term Rentals",
    role: "Marketing Content Manager",
    period: "Apr 2024 – Present",
    color: "#EEDDD9",
    tags: ["Brand Voice", "Lifecycle Email", "SEO", "Creator Partnerships", "Paid Social Creative", "HubSpot"],
    summary:
      "The sole marketer for a direct-booking SaaS platform. I created Futurestay's brand voice from scratch, then built the channels behind it: lifecycle email, SEO, creator partnerships, video, and paid social creative.",
    headline: {
      value: "445%",
      text: "Company trial starts grew 445% year over year (Jan–Oct).",
      note: "Company-wide growth. My paid ad creative, lifecycle email, and SEO content were contributors.",
    },
    overview:
      "Hired to run social media, I became Futurestay's sole marketer, owning content and campaigns across organic social, email, SEO, video, and partner channels. The throughline is translating product features into clear messaging for independent rental hosts, in a voice I built from scratch.",
    collaborators: "The CEO, Sales, Product, Analytics, Customer Success, a growth lead, and outside creative and SEO agencies.",
    problem:
      "Futurestay had a strong product but limited marketing infrastructure. Independent short-term rental hosts needed to discover the platform, build trust, and convert. The company needed someone who could wear every hat and build each channel from scratch.",
    strategy: [
      "Created Futurestay's brand voice from scratch and owned social strategy and content across every channel",
      "Launched the Futurestay Forward newsletter, owning research, copy, design, and HubSpot execution. Clickthrough rate went from under 1% to 5.7%, the year-over-year unsubscribe rate nearly halved, and recent issues open at 34–40% (bot-filtered). The Sept/Oct 2026 issue reached a 7.5% click-to-open rate",
      "Developed and A/B-tested HubSpot lifecycle campaigns: 62% higher clickthrough on a host activation sequence and 54% fewer unsubscribes on an onboarding sequence",
      "Created and launched The Check-In, a short-form video series produced with the CEO, and repurposed long-form partner conversations across social and email",
      "Built the creator program from scratch: sourced and vetted creators, negotiated terms, wrote contracts, and managed each partnership through completion, with a renewal or ambassador path at the end. Creator-referred trialists converted to paying customers at 70%, vs 56.5% across all trials",
      "Supported seven strategic partnerships through co-branded landing pages, social and email promotions, and podcast planning, and launched a host referral program with Sales",
      "Managed SEO content strategy and agency deliverables, and optimized landing pages using keyword research and Microsoft Clarity heatmaps. Organic search turns signups into trials at 31.4%, the highest of any volume channel and more than double the 13.8% average",
      "Led paid social creative with an agency, from hooks and scripts to on-camera video and final reviews",
      "Built a 14-day trial onboarding program and three interactive lead magnets with Claude Code, wired into HubSpot lead capture, UTM tracking, and a live funnel dashboard",
      "Built an internal social and email reporting platform, and wrote creative briefs and brand guidelines while onboarding a freelance junior marketer",
    ],
    campaigns: [
      {
        title: "The Clean Connection: Product-Led Lead Generation Engine",
        overview:
          "A major influencer partner in the STR space requested a tool to offer their audience. I built the entire system end to end: a free Airbnb cleanliness score tracking dashboard that functions as a product-led lead generation engine with full partner attribution. It's not a static PDF lead magnet. It's a living tool that hosts return to weekly, creating ongoing engagement and multiple conversion opportunities.",
        myRole:
          "Designed, built, and deployed every part of this system from scratch: the landing page, the dashboard, the email automation, the CRM integration, the competitor benchmarking tool, the weekly reporting system, and the full CTA strategy. Tech stack: Vercel, AirROI API, Resend, HubSpot, and Slack.",
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
        output:
          "Full-stack lead generation tool: conversion landing page, passwordless dashboard with per-listing analytics, property comparison, competitor benchmarking, AI insights, weekly automated email reports, HubSpot CRM integration with partner attribution, and contextual CTA system",
        results: [
          { value: 10, label: "Funnel Stages" },
          { value: 6, label: "Airbnb Rating Categories Tracked" },
          { value: 5, label: "Competitor URLs per Listing" },
          { value: 6, label: "Properties Compared Side-by-Side" },
        ],
        media: [
          { type: "image", label: "Landing Page", description: "Conversion-optimized sign-up page with name + email capture flowing into HubSpot with partner attribution", src: "/clean-connection/landing-page.png" },
          { type: "image", label: "Welcome Email", description: "Automated passwordless access link via Resend with single CTA", src: "/clean-connection/welcome-email.png" },
          { type: "image", label: "Empty Dashboard", description: "Clear empty state guiding users to paste their first Airbnb URL", src: "/clean-connection/dashboard-empty.png" },
          { type: "image", label: "Populated Dashboard", description: "Live listing cards with Cleanliness Score, Occupancy, and ADR pulled from Airbnb APIs", src: "/clean-connection/dashboard-listings.png" },
          { type: "image", label: "Property Comparison", description: "Time-series chart comparing up to 6 properties with Superhost threshold line", src: "/clean-connection/compare-properties.png" },
          { type: "image", label: "Listing Detail", description: "Full deep-dive: cleanliness score, all 6 rating categories, performance timeline, AI insights, guest reviews, and snapshot history", src: "/clean-connection/listing-detail.png" },
          { type: "image", label: "Performance Timeline", description: "Interactive bar chart with hover tooltips showing reviewer names, scores, and review snippets with RevPar overlay toggle", src: "/clean-connection/performance-timeline.png" },
          { type: "image", label: "Rating Performance", description: "All 6 Airbnb categories ranked with Superhost threshold and review counts per category", src: "/clean-connection/rating-performance.png" },
          { type: "image", label: "Guest Reviews", description: "Filterable reviews with auto-detection tagging for cleanliness mentions across positive and negative reviews", src: "/clean-connection/guest-reviews.png" },
          { type: "image", label: "Snapshot History", description: "Weekly performance snapshots with YTD averages and CSV export for sales call prep", src: "/clean-connection/snapshot-history.png" },
          { type: "image", label: "Clean Competition", description: "Competitor benchmarking with up to 5 competitor URLs, trend comparison chart, and built-in coaching on identifying true competitors", src: "/clean-connection/clean-competition.png" },
          { type: "image", label: "Weekly Email Report", description: "Automated Monday digest with per-property metrics, delta tracking, new review callouts, and dual CTAs with partner photo", src: "/clean-connection/weekly-email.png" },
        ],
      },
      {
        title: "Paid Ads Campaign: Full-Funnel Meta Acquisition",
        overview:
          "Collaborated with Futurestay's growth lead on a full-funnel paid acquisition campaign across Meta. From keyword research and HubSpot landing page optimization through ad creative production, heatmap-driven iteration, and retargeting, this campaign produced 22 ad creatives.",
        myRole:
          "All creative: landing page graphics, ad creative direction, filming talking head videos, collaborating with the production company on scripts and final edits, and landing page optimization based on heatmap data. The growth lead managed budget, targeting, and retargeting strategy.",
        process: [
          "Worked with growth lead on keyword research and HubSpot theme development for 2 optimized landing pages: Direct Booking Website and Airbnb Optimization",
          "Created all landing page graphics to support optimized copy",
          "Partnered with production company on Meta ad creative: provided messaging, UVP, and campaign goals. They drafted scripts, and we collaborated on edits and iteration through multiple feedback rounds (integrated them into our Slack for faster turnaround)",
          "Produced 22 ad creatives: 6 static, 4 animated voiceover, 12 video (4 talking heads I filmed, 8 featuring the CEO with scripts and direction I co-developed)",
          "Analyzed landing page heatmaps with Microsoft Clarity to identify drop-off points and optimize page layout and copy",
          "Collaborated with the production company on new video scripts based on heatmap insights, filmed the content, sent to production for animation overlays, and provided creative direction on final cuts before going live",
          "Retargeted landing page visitors on Meta with the new video and static ad creatives",
        ],
        output: "2 optimized landing pages, 22 ad creatives (6 static, 4 animated voiceover, 12 video), heatmap-driven LP iterations",
        results: [
          { value: 445, suffix: "%", label: "Company Trial Starts, YoY (Jan–Oct)" },
          { value: 22, label: "Ad Creatives Produced" },
        ],
        resultsNote: "Trial-start growth is company-wide. This creative was one contributor.",
        media: [
          {
            type: "video",
            label: "Meta Video Ads",
            description: "Talking head and animated video ads I filmed and directed for Meta campaigns",
            srcs: ["/fs-meta-ad-1.mov", "/fs-meta-ad-2.mov"],
          },
        ],
      },
      {
        title: "Influencer Partnership: Futurestay x Thanks For Visiting",
        overview:
          "Thanks For Visiting is one of the most recognized voices in the short-term rental space, known for making hosting approachable and building a deeply engaged community of independent hosts. I identified them as a strategic fit for Futurestay, reached out, vetted their content and audience alignment, negotiated partnership terms, and managed the activation from start to finish. The goal: get Futurestay in front of TFV's 1-5 property hosts who were ready to start taking direct bookings. We activated across every channel TFV touches and produced evergreen content that continues to perform.",
        myRole:
          "End-to-end partnership ownership. I sourced and discovered TFV, evaluated their audience and content fit, led outreach, met with their team to align on content ideas, negotiated the partnership terms, created a co-branded landing page with a 25% off Amplify Annual + 14-day free trial offer, and managed all deliverables through completion.",
        process: [
          "Identified Thanks For Visiting as a high-trust voice in the STR space with strong audience overlap in Futurestay's target segment",
          "Initiated outreach, met with the TFV team to evaluate content fit and brainstorm campaign ideas",
          "Negotiated an activation package spanning email, YouTube, podcast, Instagram, blog, and newsletter",
          "Built a co-branded landing page offering 25% off Amplify Annual with a 14-day free trial",
          "Managed the partnership through execution across all deliverables: dedicated email blast to TFV's full list, 30-second YouTube ad with sponsor highlight in show notes, a branded podcast interview with CTA in show notes and a supporting email blast and Instagram story/post, a 20-minute Instagram Live, an SEO-optimized blog post with embedded video, and logo placement in TFV's newsletter",
        ],
        output:
          "Co-branded landing page, dedicated email blast, YouTube ad (30s), branded podcast episode, Instagram Live (20 min), SEO blog post, newsletter placement, evergreen content still performing",
        media: [
          {
            type: "image",
            label: "Co-Branded Landing Page",
            description: "Custom landing page for TFV audience with 25% off Amplify Annual + 14-day free trial",
            src: "/cobrand-tfv.png",
          },
        ],
      },
    ],
    results: [
      { value: 1271, suffix: "%", label: "Google Search Clicks" },
      { value: 469, suffix: "%", label: "Organic Sessions" },
      { value: 99, suffix: "%", label: "Website Traffic Growth" },
      { value: 5.7, suffix: "%", decimals: 1, label: "Newsletter CTR (from under 1%)" },
      { value: 62, suffix: "%", label: "Lifecycle CTR Lift (A/B Test)" },
      { value: 738, suffix: "%", label: "Instagram Reach" },
    ],
    resultsNote:
      "Search clicks, organic sessions, and traffic are company-wide numbers that my SEO content and distribution contributed to. Newsletter, lifecycle, and Instagram results are from channels I ran.",
    proof: [{ label: "See the Trialist Bootcamp case study", href: "/work/trialist-bootcamp" }],
  },
  {
    slug: "trialist-bootcamp",
    company: "Trialist Bootcamp",
    industry: "Futurestay / Trial-to-Paid Conversion",
    role: "Marketing Lead & Product Owner, Futurestay",
    period: "Shipped 2026 · Live",
    color: "#F1E4D3",
    tags: ["Onboarding", "Product Ownership", "Video Scripts & Production", "HubSpot", "Cross-Functional", "Claude Code"],
    summary:
      "An in-app guidebook that turns Futurestay's 14-day trial into a 9-step launch plan with a reward at the end. I owned it end to end: product, copy, video scripts and production, build, and measurement.",
    headline: {
      value: "66.4%",
      text: "66.4% of bootcamp hosts with a finished trial became paying customers.",
      note: "Hosts who clicked into the guidebook converted at 44% vs 31% for those who didn't, and failed their trial 2.3× less often.",
    },
    overview:
      "The Trialist Bootcamp is an in-app onboarding guidebook for new Futurestay trialists. It turns unstructured setup work into a visible 9-step checklist with a tangible graduation reward. It shipped as a self-serve product, is measured with a live dashboard, and is used by three Customer Success Managers.",
    collaborators: "The CEO (on camera), the Analytics team, Product, and Customer Success.",
    problem:
      "Futurestay's 14-day trial exposes new hosts to the product's real value: direct bookings via Stripe, Google Vacation Rentals, the Billboard Effect, Smart Rates, and listing optimization. But value only lands if hosts actually finish setup. Many didn't. They'd land on the dashboard, not know where to start, and churn before any of it mattered.\n\nThe product had the right features. What it lacked was a guided path from signup to competence, and a reason to finish.",
    strategy: [
      "Designed the trial as a 3-tab, 9-step checklist (Set Your Goals, Accept Direct Bookings, Boost Your Listing Performance) that shows exactly what to do, in what order, and how close you are to done",
      "Wrote the video scripts, then recorded and edited the founder-led videos that open each stage, with Futurestay's CEO on camera",
      "Wrote the guide copy and the bootcamp email series, starting with a personalized HubSpot welcome from each host's assigned CSM and a one-click link into their own guidebook",
      "Built a live market comp set (AirROI, with a ZIP-code fallback for hosts without an Airbnb listing) and goal sliders that turn market percentiles into real dollar targets",
      "Made it CSM-aware: every host sees their Success Manager's name, photo, and calendar, assigned by a round-robin that respects existing HubSpot ownership",
      "Gave the trial a finish line: complete all 9 steps and the host's CSM registers a free .com domain that redirects to their Futurestay direct booking site",
      "Built it as a single-file front end on Vercel with Node serverless functions, integrating HubSpot, AirROI, NameSilo, Vercel KV, and Slack",
      "Worked with the Analytics team on funnel tracking, with Product on task logic, with the CEO on video, and with Customer Success on rollout",
    ],
    results: [
      { value: 66.4, suffix: "%", decimals: 1, label: "Trial → Customer (Finished Trials)" },
      { value: 13, prefix: "+", suffix: " pts", label: "Conversion for Hosts Who Engaged" },
      { value: 2.3, suffix: "×", decimals: 1, label: "Fewer Failed Trials" },
    ],
    resultsNote:
      "Measured in HubSpot on bootcamp hosts whose trials have finished, test accounts excluded. The engagement comparison is hosts who clicked into the guidebook (44% converted, 11% failed) vs those who didn't (31% converted, 25% failed), within the same market, workflows, and CSMs.",
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
    extraSections: [
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
    proof: [{ label: "Open the live guide", href: "https://futurestay-bootcamp-guide.vercel.app/", external: true }],
  },
  {
    slug: "scholar",
    company: "Scholar and a Dream",
    industry: "Education Nonprofit",
    role: "Content Marketer (Contract)",
    period: "Nov 2023 – Present",
    color: "#D5E8D5",
    tags: ["Nonprofit Marketing", "Google Ads Grant", "Video Production", "Email", "Campaign Strategy"],
    summary:
      "Scholar and a Dream supports BIPOC students in NYC through mentorship and scholarships. I built their digital presence to match the impact they were already making on the ground, turning community work into measurable online reach.",
    headline: {
      value: "87%",
      text: "Raised 87% of a $5K Giving Tuesday goal in two weeks.",
    },
    overview:
      "Scholar and a Dream supports BIPOC students in NYC through mentorship and scholarships. This is the kind of organization that genuinely wants to do good. I built their digital presence to match the impact they were already making on the ground, turning community work into measurable online reach.",
    collaborators: "The founders, program staff, and student scholars.",
    problem:
      "A mission-driven nonprofit doing transformative work for BIPOC students had no digital marketing strategy. They needed fundraising, volunteer recruitment, and program visibility, all on a nonprofit budget with limited resources.",
    strategy: [
      "Designed a social media strategy for fundraising, volunteer recruitment, and program goals",
      "Created a 162-post editorial calendar through June 2027 across TikTok, Instagram, Facebook, LinkedIn, email, and blog, with hooks, scripts, formats, and asset briefs",
      "Developed a scholar-led TikTok strategy, plus Mailchimp newsletters and nurture campaigns",
      "Manage the organization's $10K/month Google Ads Grant for volunteer and donor outreach",
      "Produced short-form impact videos for Reels and LinkedIn from interviews and existing footage",
      "Built and executed a full Giving Tuesday campaign across email and social",
      "Wrote SEO-optimized blog content to drive organic discoverability for scholarship and program pages",
      "Executed targeted campaigns for board and mentor recruitment",
    ],
    campaigns: [
      {
        title: "Giving Tuesday Campaign",
        period: "November 2025",
        overview:
          "Built and executed a full Giving Tuesday campaign across email and social media to raise $5K for Scholar and a Dream's next student cohort. Reached 87% of the fundraising goal in 2 weeks through a coordinated 7-email drip sequence and daily social content.",
        myRole:
          "Designed and executed the full campaign strategy across email and social. Built a 7-email drip sequence featuring program context, mentor stories, and scholar stories with clear CTAs. Produced an on-brand Reel from existing founder footage. Coordinated daily social posts to support email sends.",
        process: [
          "Designed a 7-email drip sequence to contacts, each with a distinct angle: program overview, mentor stories, scholar stories, impact data, tiered giving breakdown, and urgency-driven closing asks",
          "Wrote all email copy with clear CTAs connecting donations to tangible student outcomes",
          "Produced a campaign Reel by stitching together existing founder videos into a high-energy, on-brand piece",
          "Created daily social media content to amplify the email drip and build momentum across Instagram",
          "Wrote the Reel caption with a tiered donation structure ($5 to $500) showing exactly what each dollar funds",
          "Tracked performance across email and social throughout the 2-week campaign window",
        ],
        output:
          "A coordinated email and social campaign that raised 87% of the $5K goal in 2 weeks. The 7-email drip drove the majority of donations, supported by daily social content and a campaign Reel that turned passive scrolling into active giving.",
        results: [
          { value: 87, suffix: "%", label: "Of $5K Goal Reached" },
          { value: 7, label: "Email Drip Sequence" },
          { value: 2, suffix: " Weeks", label: "Campaign Window" },
        ],
        media: [
          {
            type: "instagram",
            label: "Giving Tuesday Reel",
            description: "Produced from existing founder footage to drive Giving Tuesday donations",
            url: "https://www.instagram.com/reel/DRxIHPPDv8s/",
          },
        ],
      },
    ],
    media: [
      {
        type: "video",
        label: "Giving Tuesday Founder Video",
        description:
          "Talking head video featuring the Scholar and a Dream founders discussing why the mission matters to them, stylized for their brand and audience.",
        srcs: ["/scholar-giving-tuesday-video.mov"],
      },
      {
        type: "image",
        label: "Social Content: Brandon Glasgow x The Black Man Can",
        description: "On-brand social graphic for mentor spotlight and community partnership content",
        src: "/scholar-brandon-post.jpg",
      },
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
    results: [
      { value: 47.6, suffix: "%", decimals: 1, label: "Google Ads Conversion Rate" },
      { value: 7.35, suffix: "x", decimals: 2, label: "ROAS" },
      { value: 10, prefix: "$", suffix: "K/mo", label: "Google Ads Grant Managed" },
    ],
  },
  {
    slug: "sqe",
    company: "SQE",
    industry: "Cybersecurity & Blockchain Technology",
    role: "Content & Partner Marketing (Contract)",
    period: "Jul 2022 – Nov 2025",
    color: "#E0D5E8",
    tags: ["B2B Content", "LinkedIn", "Newsletter", "Partnerships", "Thought Leadership", "Webinars"],
    summary:
      "I joined SQE when it was an idea on a napkin. Quantum-secure technology had almost no comparables, so I built the language to explain it, then used that language to reach CISOs, CTOs, and enterprise buyers and land the company's first major partnership.",
    headline: {
      value: "8,800%",
      text: "LinkedIn impressions grew 8,800% by the end of Q1 2025, with a 10.9% engagement rate.",
    },
    overview:
      "I joined SQE when it was an idea on a napkin. Quantum-secure technology had almost no comparables, so before anyone could be persuaded, it needed language that made it make sense. I identified the audience (CISOs, CTOs, and enterprise buyers), built SQE's LinkedIn presence from scratch, and created the content and partnership strategy that made SQE a credible voice in quantum-secure cybersecurity.",
    collaborators: "The founders, engineering, and paid media and outreach partners.",
    problem:
      "A quantum-secure blockchain startup needed to build credibility, earn trust from enterprise decision-makers, and create a partner pipeline across fintech, quantum, and cybersecurity verticals. All through content and relationships, with no existing brand awareness and no category language to borrow.",
    strategy: [
      "Named, wrote, and produced Entangled Insights, SQE's flagship LinkedIn newsletter, translating technical subjects into industry analysis and visual stories for CISOs, CTOs, and enterprise decision-makers",
      "Developed a B2B content strategy focused on LinkedIn with executive-level thought leadership",
      "Secured SQE's first major strategic partnership with Cybersecurity Girl, a one-year co-marketing alliance with a $900K marketing valuation that became the foundation for the partner program",
      "Shaped and marketed SQE's first webinar, attracting 150+ registrants",
      "Coordinated content, cold outreach, and paid media across teams, contributing to a 77.8% increase in website sessions and an 87.9% lift in tracked events over 90 days",
      "Launched a strategic partner portal and program",
      "Led branded video content production and distribution",
    ],
    campaigns: [
      {
        title: "QueCredit Introduction Video Ad",
        period: "2023",
        overview:
          "SQE needed to introduce QueCredit, their semi-stable cryptocurrency built on quantum-secure blockchain, to a targeted audience. With a $20 budget and 7 days, I wrote, produced, and ran an ultra-targeted Facebook ad campaign that maximized every dollar.",
        myRole:
          "Wrote the script, selected text-to-speech for voiceover, created and edited the full video. Designed and executed the ad campaign strategy on Facebook with ultra-targeted parameters to stretch a minimal budget.",
        process: [
          "Wrote the full script introducing QueCredit and its role in SQE's quantum-secure ecosystem",
          "Produced the video using text-to-speech voiceover and custom visuals",
          "Edited and finalized the video for both organic and paid distribution",
          "Designed an ultra-targeted Facebook ad campaign optimized for ThruPlays on a $20 budget over 7 days",
          "Selected strategic audience targeting to maximize engagement and reach at minimal cost",
        ],
        output:
          "A polished introduction video for QueCredit that doubled as a high-performing paid ad. The $20 campaign delivered 14,177 ThruPlays at $0.002 each, proving that strategic targeting beats big budgets.",
        results: [
          { value: 14177, label: "ThruPlays" },
          { value: 0.002, prefix: "$", decimals: 3, label: "Cost Per ThruPlay" },
          { value: 7, suffix: " Days", label: "Campaign Length" },
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
    ],
    results: [
      { value: 8800, suffix: "%", label: "LinkedIn Impressions" },
      { value: 10.9, suffix: "%", decimals: 1, label: "Engagement Rate" },
      { value: 525, suffix: "%", label: "Follower Growth" },
      { value: 900, prefix: "$", suffix: "K", label: "Partnership Value" },
      { value: 150, suffix: "+", label: "Webinar Registrants" },
      { value: 77.8, suffix: "%", decimals: 1, label: "Session Increase (90 Days)" },
    ],
    proof: [
      { label: "Read Entangled Insights #6: the Zero Trust section", href: "/writing/entangled-insights-6#zero-trust" },
    ],
  },
  {
    slug: "ripple",
    company: "Ripple",
    industry: "Nonprofit Tech / Two-Sided Marketplace",
    role: "Founder & Brand Strategist",
    color: "#D9E5EE",
    tags: ["Brand Strategy", "Product Strategy", "Market Research", "GTM Planning", "Wireframes"],
    summary:
      "A two-sided marketplace connecting IRS-verified nonprofits with background-checked volunteers who want to help on short notice. I conceived the idea, built the brand from zero, and developed the full go-to-market strategy independently.",
    overview:
      "Ripple is a two-sided marketplace connecting IRS-verified nonprofits with background-checked volunteers. Designed for travelers and locals who want to volunteer on short notice, and for nonprofits who need reliable short-term help. I conceived the idea, built the brand from zero, and developed the full go-to-market strategy independently.",
    problem:
      "Ripple started as a concept with no infrastructure behind it. Before building anything, the project needed a name, a brand, a validated market, a competitive landscape analysis, a business model, and a clear product strategy. I owned all of it.",
    strategy: [
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
        description:
          "Naming, logo design, color system, and tagline. \"Ripple\" represents a single action that spreads outward and creates impact beyond itself. Navy conveys trust and institutional credibility. Lime brings energy and freshness, breaking from typical nonprofit aesthetics. Together: serious mission, fresh approach.",
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
    results: [
      { value: 5, label: "Competitor SWOTs" },
      { value: 3, label: "Launch Phases" },
      { value: 18, suffix: "mo", label: "Roadmap Built" },
    ],
  },
  {
    slug: "verve",
    company: "Verve, LLC",
    industry: "Federal Contracting / SDVOSB & WOSB",
    role: "Marketing Consultant (Contract): strategy, content, copy, IA, design direction & launch",
    period: "Sep 2026 – Present · Live October 2026",
    color: "#E8E4D8",
    tags: ["Website Strategy", "Information Architecture", "Copywriting", "Federal Contracting", "Content Systems"],
    summary:
      "A Service-Disabled Veteran-Owned and Woman-Owned Small Business supporting the VA, CMS, the Defense Health Agency, and the CDC. Its GoDaddy site couldn't answer what a contracting officer needs, so I led the strategy, content, copy, and design direction for a 31-page rebuild.",
    headline: {
      value: "31 pages",
      text: "Rebuilt a GoDaddy site into a 31-page site for federal evaluators, live at vervellc.com.",
    },
    overview:
      "Verve is a Service-Disabled Veteran-Owned and Woman-Owned Small Business in Baltimore supporting the VA, CMS, the Defense Health Agency, and the CDC. The credentials and the work were both real. The website was a GoDaddy site builder that couldn't answer what a contracting officer needs before a phone call becomes necessary. I led the strategy, content, copy, and design direction for the rebuild: 31 pages in Squarespace 7.1, a shared layout system, and procurement content treated as a first-class deliverable.",
    collaborators: "Subject-matter experts, an in-house designer, and Verve's technology partners.",
    problem:
      "Federal procurement runs on evaluation. Before a contract, someone has to answer three questions: what does this company do, who has it done it for, and how do I buy from it.\n\nThat person is under time pressure. They are looking at several vendors. They are starting with the website.\n\nThe old site was built on GoDaddy Website Builder. It didn't answer any of those questions.\n\nWhen a website can't answer the basics, evaluation stalls. It turns into a phone call. Or it doesn't happen at all.\n\nA contracting officer with five vendors and an afternoon doesn't chase the one whose website is opaque.",
    strategy: [
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
    mediaLayout: "mockups",
    media: [
      {
        type: "image",
        label: "Homepage: The Two Most Important Buttons",
        description:
          "The gold 'View Our Capabilities' button answers what does this company do. The 'Capability Statement' button, above the fold in the hero, answers how do I buy from it. Most federal contractor sites bury the capability statement in a footer PDF. Putting it in the hero is a procurement decision.",
        src: "/verve/mockup-homepage-framed.png",
      },
      {
        type: "image",
        label: "Capabilities Overview: 10 Cards, One Pattern",
        description:
          "Ten capabilities, each with a custom SVG icon drawn at 0.75 stroke weight, each defined by a 2px gold top border rather than a box. A page of capabilities should read as a list, not a grid of competing tiles. Each card leads to its own dedicated page with the same spine: eyebrow, headline, goals, graphic, and CTA.",
        src: "/verve/mockup-capabilities-framed.png",
      },
      {
        type: "image",
        label: "Contract Vehicles: Procurement as Content",
        description:
          "UEI, CAGE code, set-aside designations, NAICS codes, GSA MAS contract number, and a dedicated NASA SEWP VI section. Structured as content, not a footnote. The contracting officer who needs this information should be able to find and read it in one visit, without a phone call.",
        src: "/verve/mockup-procurement-framed.png",
      },
      {
        type: "image",
        label: "About: Built for the Evaluator",
        description:
          "Written for prime contractors and program offices evaluating a teaming partner, not a general audience. The about page positions Verve's delivery model: technical expertise paired with federal agency experience. No marketing language. Individual team bios with credentials and agency backgrounds are procurement content.",
        src: "/verve/mockup-about-framed.png",
      },
    ],
    results: [
      { value: 31, label: "Pages, Live" },
      { value: 23, suffix: "%", label: "Less Scrolling" },
      { value: 10, label: "Custom SVG Icons" },
      { value: 17, label: "Capability + Solution Pages" },
    ],
    extraSections: [
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
    proof: [{ label: "Visit vervellc.com", href: "https://vervellc.com/", external: true }],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
