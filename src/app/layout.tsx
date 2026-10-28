import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import LavaBackground from "@/components/LavaBackground";
import Nav from "@/components/Nav";
import { site } from "@/data/site";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const dmSerif = DM_Serif_Display({ variable: "--font-dm-serif", weight: "400", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Felicia Morales" },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#fafafa" };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Content & Digital Marketing Strategist",
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-foreground focus:text-background"
        >
          Skip to content
        </a>
        <LavaBackground />
        <Nav />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
