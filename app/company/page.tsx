import type { Metadata } from "next";
import { LegalShell } from "../../components/LegalShell";
import { siteConfig } from "../../content/site";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "solviaの運営主体と連絡先です。",
  alternates: { canonical: "/company" },
  openGraph: { url: "/company", title: "運営者情報 | solvia" },
};

export default function CompanyPage() {
  return (
    <LegalShell eyebrow="OPERATOR" title="運営者情報" intro="誰がサービスを運営し、どこへ連絡できるかを明確にします。">
      <section>
        <h2>基本情報</h2>
        <dl className="company-list">
          <div><dt>サービス名</dt><dd>solvia</dd></div>
          <div><dt>運営主体</dt><dd>{siteConfig.operatingEntity}</dd></div>
          <div><dt>代表・責任者</dt><dd>{siteConfig.representative}</dd></div>
          <div><dt>所在地</dt><dd>{siteConfig.operatingAddress}</dd></div>
          <div><dt>問い合わせ先</dt><dd>{siteConfig.contactEmail}</dd></div>
          <div><dt>公式TikTok</dt><dd><a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer">{siteConfig.tiktokHandle}</a></dd></div>
        </dl>
      </section>
      {!siteConfig.isProductionApproved && <p className="inline-alert">運営者情報は公開前の本人確認・事業者確認が完了するまで本番公開されません。</p>}
    </LegalShell>
  );
}
