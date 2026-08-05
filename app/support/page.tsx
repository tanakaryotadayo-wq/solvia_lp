import type { Metadata } from "next";
import { LegalShell } from "../../components/LegalShell";

export const metadata: Metadata = {
  title: "サポート内容",
  description: "solviaが配信を見るところから振り返りまで、どのように伴走するかを紹介します。",
  alternates: { canonical: "/support" },
  openGraph: { url: "/support", title: "サポート内容 | solvia" },
};

export default function SupportPage() {
  return (
    <LegalShell
      eyebrow="SUPPORT SYSTEM"
      title="サポート内容"
      intro="本人のキャラクターを型にはめず、実際の配信から次回の行動へつなげます。"
    >
      <section>
        <h2>基本の改善ループ</h2>
        <ol>
          <li><strong>配信を見る</strong><span>話し方、コメント対応、構成、時間帯などを確認します。</span></li>
          <li><strong>強みと停滞を言語化する</strong><span>変えない部分と、次に変える部分を分けます。</span></li>
          <li><strong>次回の実験を一つ決める</strong><span>一度に直しすぎず、結果を見られる単位にします。</span></li>
          <li><strong>結果を振り返る</strong><span>感覚だけで判断せず、反応を見て次の手を決めます。</span></li>
        </ol>
      </section>
      <section>
        <h2>相談できるテーマ</h2>
        <div className="legal-grid">
          <article><h3>配信設計</h3><p>テーマ、時間帯、頻度、配信前の準備。</p></article>
          <article><h3>コミュニケーション</h3><p>話題、コメント対応、初見の人が入りやすい流れ。</p></article>
          <article><h3>企画</h3><p>本人の強みを活かした企画と、無理なく続く検証。</p></article>
          <article><h3>振り返り</h3><p>良かった点、変える点、次回試すことの整理。</p></article>
        </div>
      </section>
      <aside className="legal-note">
        <strong>成果を保証するサービスではありません。</strong>
        <p>サポートは成果の可能性を高めるための伴走です。所属や助言だけで視聴者数・収益・契約獲得を保証するものではありません。</p>
      </aside>
    </LegalShell>
  );
}
