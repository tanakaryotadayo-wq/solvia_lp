import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "../content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "solvia｜配信を見て、次の一手まで返すライバー事務所",
    template: "%s｜solvia",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  applicationName: "solvia",
  category: "business",
  openGraph: {
    title: "配信を見て、次の一手まで返す。｜solvia",
    description: siteConfig.description,
    siteName: "solvia",
    locale: "ja_JP",
    type: "website",
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "配信を見て、次の一手まで返す。｜solvia",
    description: siteConfig.description,
  },
  robots: siteConfig.isProductionApproved
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e9" },
    { media: "(prefers-color-scheme: dark)", color: "#171513" },
  ],
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      description: siteConfig.description,
      sameAs: [siteConfig.tiktokUrl, siteConfig.lineUrl],
    },
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      inLanguage: "ja-JP",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <a className="skip-link" href="#main-content">本文へ移動</a>
        {children}
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
