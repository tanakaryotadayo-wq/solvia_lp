import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "../components/BrandMark";
import { LeadForm } from "../components/LeadForm";
import { PreviewNotice } from "../components/PreviewNotice";
import { SiteHeader } from "../components/SiteHeader";
import { TrackedLineLink } from "../components/TrackedLineLink";
import { siteConfig } from "../content/site";

const feedback = [
  {
    label: "GOOD",
    title: "コメントを拾う速さが強み",
    body: "反応までの間が短く、初見の人も会話に入りやすい状態です。ここは変えずに残します。",
  },
  {
    label: "NEXT",
    title: "冒頭30秒に今日のテーマを置く",
    body: "入室した人が内容を理解しやすいよう、最初の一言を固定して次回の配信で試します。",
  },
  {
    label: "TRY",
    title: "次回は一つだけ検証する",
    body: "同時に全部直さず、滞在時間の変化を見て次の手を決めます。",
  },
] as const;

const method = [
  { number: "01", title: "見る", text: "数字だけでなく、実際の配信とコメントの流れを見る。" },
  { number: "02", title: "言語化する", text: "良さと停滞の原因を、本人が再現できる言葉にする。" },
  { number: "03", title: "一つ試す", text: "次回の配信で試す変更を、一つに絞って決める。" },
  { number: "04", title: "振り返る", text: "結果を一緒に見て、続けるか変えるかを判断する。" },
] as const;

const faq = [
  {
    q: "配信未経験でも相談できますか？",
    a: "はい。まだ配信していない段階でも相談できます。使うアプリ、配信テーマ、続けられる時間帯から一緒に整理します。",
  },
  {
    q: "相談したら契約しないといけませんか？",
    a: "相談の時点で契約は決まりません。サポート内容と条件を確認し、納得できた場合だけ次へ進みます。",
  },
  {
    q: "すでに別の事務所に所属しています。",
    a: "現在の契約内容を確認した上で案内します。契約に反する移籍や活動は勧めません。契約書が分からない場合も、確認すべき点を整理できます。",
  },
  {
    q: "報酬や費用、辞める場合の条件は？",
    a: "報酬計算、費用、契約期間、退所、アカウントの扱いは契約前に書面で提示します。口頭説明だけで開始することはありません。",
  },
] as const;

export default function Home() {
  return (
    <>
      <PreviewNotice />
      <SiteHeader />

      <main id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow"><span>LIVE STREAM</span> GROWTH PARTNER</p>
            <h1 id="hero-title">
              所属させるだけの<br className="desktop-break" />事務所じゃない。
              <span>配信を見て、<br />次の一手まで返す。</span>
            </h1>
            <p className="hero__lead">
              solviaは、実際の配信を見ながら、企画・話し方・配信時間・続け方を一人ずつ整えるライバー事務所です。
            </p>
            <div className="hero__actions">
              <TrackedLineLink className="button button--primary" placement="hero">
                LINEで相性を相談する <span aria-hidden="true">↗</span>
              </TrackedLineLink>
              <a className="button button--text" href="#support">サポート例を見る <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero__note">未経験・伸び悩み・移籍の相談に対応。相談だけでも構いません。</p>
          </div>

          <div className="hero__visual" aria-label="solviaの手描きブランドイラスト">
            <div className="hero-art">
              <Image
                src="/images/solvia_main.png"
                alt="配信者とさまざまな活動を描いたsolviaのイラスト"
                width={1024}
                height={1024}
                priority
                sizes="(max-width: 760px) 86vw, 42vw"
              />
            </div>
            <div className="annotation annotation--top" aria-hidden="true">
              <small>WE ACTUALLY WATCH</small>
              <strong>配信を見る</strong>
            </div>
            <div className="annotation annotation--bottom" aria-hidden="true">
              <small>ONE NEXT MOVE</small>
              <strong>次の一手を返す</strong>
            </div>
            <span className="hero__orbit" aria-hidden="true" />
          </div>
        </section>

        <div className="proof-rail" aria-label="solviaの支援方針">
          <span>配信レビュー</span>
          <span>企画と言葉の設計</span>
          <span>次回の実験</span>
          <span>無理なく続く運用</span>
        </div>

        <section id="support" className="support section-shell section-space" aria-labelledby="support-title">
          <div className="section-heading">
            <p className="eyebrow">01 / ACTUAL SUPPORT</p>
            <h2 id="support-title">アドバイスを、<br /><span>次回から使える形</span>にする。</h2>
            <p>「もっと頑張ろう」では終わらせません。良かった点、変える点、次回の検証を一枚にまとめます。</p>
          </div>

          <div className="feedback-board">
            <div className="feedback-board__top">
              <div>
                <small>SUPPORT SAMPLE / 01</small>
                <h3>配信フィードバック</h3>
              </div>
              <span>サポート例</span>
            </div>
            <div className="stream-signal" aria-hidden="true">
              {[28, 54, 35, 82, 46, 68, 38, 91, 58, 73, 42, 64, 31, 77, 50, 88, 44, 61].map((height, index) => (
                <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="feedback-list">
              {feedback.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <div><h4>{item.title}</h4><p>{item.body}</p></div>
                </article>
              ))}
            </div>
            <p className="feedback-board__foot">※ 実際の成果事例ではなく、支援方法を伝えるためのサンプルです。</p>
          </div>
        </section>

        <section id="method" className="method section-space" aria-labelledby="method-title">
          <div className="section-shell">
            <div className="section-heading section-heading--light">
              <p className="eyebrow">02 / HOW WE GROW</p>
              <h2 id="method-title">伸び方を当てにいかない。<br /><span>小さく試して、確かめる。</span></h2>
            </div>
            <div className="method-grid">
              {method.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fit section-shell section-space" aria-labelledby="fit-title">
          <div className="fit__statement">
            <p className="eyebrow">03 / GOOD FIT</p>
            <h2 id="fit-title">数字だけで人を<br />選ばない。でも、<br /><span>誰にでも同じ約束</span>もしない。</h2>
          </div>
          <div className="fit__lists">
            <article>
              <p>solviaが力になりやすい人</p>
              <ul>
                <li>配信を始めたいが、最初の型が分からない</li>
                <li>続けているのに、改善点を一人で見つけられない</li>
                <li>自分のキャラクターを壊さずに伸ばしたい</li>
                <li>次回に試す行動を具体的に決めたい</li>
              </ul>
            </article>
            <article className="fit__honesty">
              <p>先にお伝えしたいこと</p>
              <ul>
                <li>所属だけで成果を保証することはできません</li>
                <li>短期間での成功だけを約束するサービスではありません</li>
                <li>条件を確認せず、契約を急がせることはありません</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="journey section-space" aria-labelledby="journey-title">
          <div className="section-shell">
            <div className="section-heading">
              <p className="eyebrow">04 / FIRST CONTACT</p>
              <h2 id="journey-title">相談から開始まで。<br /><span>曖昧なまま進めない。</span></h2>
            </div>
            <ol className="journey-list">
              <li><span>01</span><div><h3>LINEまたはフォームで相談</h3><p>今の状況と、困っていることだけで構いません。</p></div></li>
              <li><span>02</span><div><h3>相性と課題を整理</h3><p>活動状況を聞き、solviaが力になれる範囲を率直に伝えます。</p></div></li>
              <li><span>03</span><div><h3>サポートと契約条件を確認</h3><p>報酬・費用・契約期間・退所・権利関係を書面で確認します。</p></div></li>
              <li><span>04</span><div><h3>納得したらスタート</h3><p>最初の配信テーマと、振り返るポイントを一緒に決めます。</p></div></li>
            </ol>
          </div>
        </section>

        <section className="transparency section-shell section-space" aria-labelledby="transparency-title">
          <div className="transparency__card">
            <div>
              <p className="eyebrow">CONTRACT TRANSPARENCY</p>
              <h2 id="transparency-title">契約前に、<br />分からないを残さない。</h2>
              <p>数字を大きく見せるより、計算方法と例外まで伝える。それがsolviaのサイトに必要な最低条件だと考えています。</p>
              <Link className="button button--light" href="/contract">契約・費用の確認項目を見る <span aria-hidden="true">→</span></Link>
            </div>
            <ul>
              <li><span>01</span>報酬の計算方法と支払時期</li>
              <li><span>02</span>初期・月額・その他の費用</li>
              <li><span>03</span>契約期間、更新、退所の条件</li>
              <li><span>04</span>アカウントと配信素材の権利</li>
              <li><span>05</span>未成年者の同意とサポート範囲</li>
            </ul>
          </div>
        </section>

        <section id="faq" className="faq section-shell section-space" aria-labelledby="faq-title">
          <div className="section-heading">
            <p className="eyebrow">05 / FAQ</p>
            <h2 id="faq-title">相談前の、<br /><span>よくある迷い。</span></h2>
          </div>
          <div className="faq-list">
            {faq.map((item, index) => (
              <details key={item.q}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.q}<i aria-hidden="true">＋</i></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="contact section-space" aria-labelledby="contact-title">
          <div className="section-shell contact__grid">
            <div className="contact__copy">
              <p className="eyebrow">LET&apos;S TALK</p>
              <h2 id="contact-title">伸びない理由を、<br /><span>ひとりで探さなくていい。</span></h2>
              <p>まずは今の状況を聞かせてください。契約ありきではなく、solviaが本当に力になれるかから話します。</p>
              <TrackedLineLink className="button button--primary" placement="contact">
                LINEで相談する <span aria-hidden="true">↗</span>
              </TrackedLineLink>
              <a className="social-link" href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer">
                TikTok {siteConfig.tiktokHandle} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="contact__form-wrap">
              <div className="contact__form-head"><span>FORM</span><p>メールで相談する</p></div>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell footer__grid">
          <div><BrandMark /><p>配信を見て、次の一手まで返す。</p></div>
          <nav aria-label="フッターナビゲーション">
            <Link href="/support">サポート内容</Link>
            <Link href="/contract">契約・費用</Link>
            <Link href="/company">運営者情報</Link>
            <Link href="/privacy">プライバシー</Link>
            <Link href="/terms">利用規約</Link>
          </nav>
        </div>
        <div className="section-shell footer__bottom">
          <p>© {new Date().getFullYear()} solvia</p>
          <p>MADE FOR PEOPLE WHO KEEP SHOWING UP.</p>
        </div>
      </footer>

      <TrackedLineLink className="mobile-cta" placement="mobile_sticky">
        LINEで相性を相談する <span aria-hidden="true">↗</span>
      </TrackedLineLink>
    </>
  );
}
