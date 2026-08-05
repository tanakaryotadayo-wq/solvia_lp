import type { Metadata } from "next";
import { LegalShell } from "../../components/LegalShell";
import { siteConfig } from "../../content/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "solviaにおける個人情報の取扱い方針です。",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", title: "プライバシーポリシー | solvia" },
};

export default function PrivacyPage() {
  return (
    <LegalShell eyebrow="PRIVACY" title="プライバシーポリシー" intro={`制定・改定日：${siteConfig.privacyEffectiveDate}`}>
      <section><h2>1. 取得する情報</h2><p>活動状況、利用する配信サービス、相談内容、返信先メールアドレス、流入元情報、送信時の不正対策に必要な識別情報を取得します。パスワードや認証コードは取得しません。</p></section>
      <section><h2>2. 利用目的</h2><p>相談への回答、サポート内容の提案、契約手続、問い合わせ履歴の管理、不正送信の防止、サービス改善のために利用します。異なる目的で利用する場合は、事前に本人へ説明します。</p></section>
      <section><h2>3. 保存期間</h2><p>相談情報は、対応終了後を含め原則180日を上限として保持し、法令上または契約上の保存義務がある場合を除き削除します。正式契約後の情報は、別途提示する契約・法令に基づく期間保持します。</p></section>
      <section><h2>4. 外部サービスへの取扱委託</h2><p>サイト運用、データ保管、通知、アクセス解析のために外部サービスを利用する場合があります。委託先を適切に選定し、必要な範囲に限って情報を取り扱わせます。</p></section>
      <section><h2>5. 第三者提供</h2><p>本人の同意がある場合、法令に基づく場合、人の生命・身体・財産の保護に必要な場合を除き、個人情報を第三者へ提供しません。</p></section>
      <section><h2>6. 安全管理</h2><p>通信の暗号化、アクセス制御、保存項目の最小化、ログへの個人情報の非出力、保存期限の設定など、必要な安全管理措置を講じます。</p></section>
      <section><h2>7. 開示・訂正・削除</h2><p>本人から保有個人情報の開示、訂正、利用停止、削除の申し出があった場合、本人確認後、法令に従って対応します。</p></section>
      <section><h2>8. 問い合わせ窓口</h2><p>運営主体：{siteConfig.operatingEntity}<br />連絡先：{siteConfig.contactEmail}</p></section>
    </LegalShell>
  );
}
