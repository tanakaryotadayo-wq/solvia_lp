import type { Metadata } from "next";
import { LegalShell } from "../../components/LegalShell";
import { siteConfig } from "../../content/site";

export const metadata: Metadata = {
  title: "契約・費用",
  description: "solviaとの契約前に確認できる費用、報酬、期間、退所、権利関係の項目です。",
  alternates: { canonical: "/contract" },
  openGraph: { url: "/contract", title: "契約・費用 | solvia" },
};

const rows = [
  ["初期費用", siteConfig.contract.initialFee],
  ["月額費用", siteConfig.contract.monthlyFee],
  ["報酬の計算方法", siteConfig.contract.rewardFormula],
  ["支払時期", siteConfig.contract.paymentSchedule],
  ["契約期間・更新", siteConfig.contract.term],
  ["退所・解約の予告", siteConfig.contract.terminationNotice],
  ["アカウント・素材の権利", siteConfig.contract.accountOwnership],
  ["未成年者の扱い", siteConfig.contract.minorPolicy],
] as const;

export default function ContractPage() {
  return (
    <LegalShell
      eyebrow="CONTRACT TRANSPARENCY"
      title="契約・費用"
      intro="強い数字だけを先に見せず、計算方法・条件・例外を同じ場所で確認できるようにします。"
    >
      <section>
        <h2>契約前に確認できる条件</h2>
        <dl className="contract-table">
          {rows.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        {!siteConfig.isProductionApproved && (
          <p className="inline-alert">現在はプレビューです。上記の「公開前確認中」は、運営者の承認なしに公開値へ置換できない設計です。</p>
        )}
      </section>
      <section>
        <h2>開始前の確認手順</h2>
        <ol>
          <li><strong>条件を書面で受け取る</strong><span>報酬・費用・期間・権利関係を一つの文書で確認します。</span></li>
          <li><strong>不明点を質問する</strong><span>小さな注記や口頭説明だけで判断する必要はありません。</span></li>
          <li><strong>持ち帰って検討する</strong><span>その場で契約を決めず、内容を確認できます。</span></li>
          <li><strong>合意後に開始する</strong><span>双方が条件を理解してから活動を開始します。</span></li>
        </ol>
      </section>
    </LegalShell>
  );
}
