import type { Metadata } from "next";
import { LegalShell } from "../../components/LegalShell";
import { siteConfig } from "../../content/site";

export const metadata: Metadata = {
  title: "サイト利用規約",
  description: "solvia公式サイトの利用条件です。",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", title: "サイト利用規約 | solvia" },
};

export default function TermsPage() {
  return (
    <LegalShell eyebrow="TERMS" title="サイト利用規約" intro="このページは公式サイトと相談フォームの利用条件を定めます。所属契約の条件は、別途交付する契約書が優先します。">
      <section><h2>1. 適用</h2><p>本規約は、{siteConfig.operatingEntity}が運営するsolvia公式サイトと相談窓口の利用に適用されます。</p></section>
      <section><h2>2. 禁止事項</h2><p>虚偽情報の送信、第三者になりすます行為、サイトや通信への妨害、不正アクセス、法令または公序良俗に反する行為を禁止します。</p></section>
      <section><h2>3. 情報の正確性</h2><p>掲載内容は更新に努めますが、個別契約の条件は必ず契約書で確認してください。期間限定条件や対象者が限定される内容は、適用条件を併記します。</p></section>
      <section><h2>4. 成果に関する注意</h2><p>配信活動の成果は、本人の活動、配信プラットフォーム、視聴者動向その他の要因によって変わります。本サイトは視聴者数、収益、契約獲得などの成果を保証しません。</p></section>
      <section><h2>5. 知的財産</h2><p>本サイトの文章、画像、デザインその他のコンテンツに関する権利は、運営者または正当な権利者に帰属します。</p></section>
      <section><h2>6. 変更</h2><p>必要に応じて本規約を変更する場合があります。重要な変更は、本サイト上で分かりやすく案内します。</p></section>
      <section><h2>7. 問い合わせ</h2><p>{siteConfig.contactEmail}</p></section>
    </LegalShell>
  );
}
