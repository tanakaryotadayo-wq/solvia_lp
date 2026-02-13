import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: {
        canonical: "/lp",
    },
    title: "solvia | あなたらしさを、もっと自由に。",
    description:
        "ライバー事務所solvia LP。マネジメントスタッフはライバー経験者多数。初期費用0円・縛りなし・還元率100%。TikTokフォロワー0人からでもOK。",
    openGraph: {
        title: "solvia | あなたらしさを、もっと自由に。",
        description:
            "初期費用0円・縛りなし・還元率100%。初心者でも安心してライブ配信を始められるサポートを致します。",
    },
};

export default function LPLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
