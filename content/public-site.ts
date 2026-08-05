export const publicSiteConfig = {
  name: "solvia",
  category: "ライバー事務所",
  description:
    "実際の配信を見て、次回から試せる改善案まで一緒につくるライバー事務所。未経験・伸び悩み・移籍の相談に対応します。",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://solvialp.vercel.app",
  lineUrl: process.env.NEXT_PUBLIC_LINE_URL || "https://lin.ee/cGHJDjx",
  tiktokUrl:
    process.env.NEXT_PUBLIC_TIKTOK_URL ||
    "https://www.tiktok.com/@solvia_0fficial",
  tiktokHandle: "@solvia_0fficial",
} as const;
