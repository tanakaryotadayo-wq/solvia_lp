import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://solvialp.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "solvia | ライバー事務所",
  description:
    "ライバー事務所solvia。マネジメントスタッフはライバー経験者多数。初心者でも安心してライブ配信を始められるサポートを致します。初期費用0円・縛りなし・還元率100%。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "solvia | ライバー事務所",
    description:
      "マネジメントスタッフはライバー経験者多数。初心者でも安心してライブ配信を始められるサポートを致します。",
    siteName: "solvia",
    locale: "ja_JP",
    type: "website",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "solvia | ライバー事務所",
    description:
      "マネジメントスタッフはライバー経験者多数。初期費用0円・縛りなし。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "solvia",
      url: BASE_URL,
      description:
        "ライバー事務所solvia。マネジメントスタッフはライバー経験者多数。初心者でも安心してライブ配信を始められるサポートを致します。",
      sameAs: [
        "https://www.tiktok.com/@solvia_0fficial",
        "https://lin.ee/cGHJDjx",
      ],
    },
    {
      "@type": "WebSite",
      name: "solvia",
      url: BASE_URL,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="theme-color" content="#FFF5F7" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
