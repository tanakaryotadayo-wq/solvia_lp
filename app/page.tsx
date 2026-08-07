const LINE_URL = "https://lin.ee/cGHJDjx";
const TIKTOK_URL =
  "https://www.tiktok.com/@solvia_0fficial?_r=1&_t=ZS-93pa961TczF";

type IconName = "question" | "chart" | "copy" | "eye" | "crown" | "chat" | "phone" | "heart";

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "question") return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="M9.8 9.2a2.45 2.45 0 0 1 4.7.95c0 1.75-2.5 2-2.5 3.55"/><path d="M12 16.9h.01"/></svg>;
  if (name === "chart") return <svg {...common}><path d="M5 19V11M10 19V6M15 19v-4M20 19V3M3 19h18"/></svg>;
  if (name === "copy") return <svg {...common}><rect x="8" y="7" width="10" height="12" rx="2"/><path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2"/></svg>;
  if (name === "eye") return <svg {...common}><path d="M2.8 12s3.3-5.4 9.2-5.4 9.2 5.4 9.2 5.4-3.3 5.4-9.2 5.4S2.8 12 2.8 12Z"/><circle cx="12" cy="12" r="2.4"/></svg>;
  if (name === "crown") return <svg {...common}><path d="m4 8 4 3 4-6 4 6 4-3-2 10H6L4 8Z"/><path d="M7 21h10"/></svg>;
  if (name === "chat") return <svg {...common}><path d="M20 14.2a4 4 0 0 1-4 4H9l-5 3v-7a4 4 0 0 1-1-2.7V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v7.2Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>;
  if (name === "phone") return <svg {...common}><path d="M7.2 3.5 4.6 5.1c-.8.5-1.1 1.5-.7 2.4 2.5 5.7 6.9 10.1 12.6 12.6.9.4 1.9.1 2.4-.7l1.6-2.6-4.4-2.3-1.2 1.7a14.8 14.8 0 0 1-7.1-7.1l1.7-1.2-2.3-4.4Z"/></svg>;
  return <svg {...common}><path d="M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.6Z"/></svg>;
}

const concerns: { icon: IconName; text: string }[] = [
  { icon: "question", text: "何を話せばいいかわからない" },
  { icon: "chart", text: "ライブ配信をがんばってるのに伸びない" },
  { icon: "copy", text: "伸びる人の真似をしてもしっくりこない" },
  { icon: "eye", text: "誰かに見てもらって改善したい" },
];

const points: { icon: IconName; title: string; text: string }[] = [
  { icon: "crown", title: "費用ゼロで始められる", text: "還元率100%、所属費用は一切なし／スマホ1台でOK／ノルマなし" },
  { icon: "chat", title: "TikTokフォロワー0人から始められる", text: "未経験からでも相談できます。" },
  { icon: "phone", title: "縛りなし", text: "辞めたい時に辞められる" },
  { icon: "heart", title: "あなたに合う伸ばし方", text: "スタッフがサポート" },
];

const steps = [
  { no: "01", title: "LINEで相談", text: "いまの状況を軽く聞かせてください" },
  { no: "02", title: "あなたに合う進め方を提案", text: "無理な勧誘なし" },
  { no: "03", title: "納得できたらスタート", text: "合わなければ見送りOK" },
];

const faqs = [
  { q: "未経験でも大丈夫？", a: "大丈夫。最初の型づくりからサポートします。" },
  { q: "事務所に入るメリットは何ですか？", a: "配信分析・企画提案・イベント対策などを個別にサポートします。個人では難しい情報共有や戦略設計ができる点が大きな違いです。" },
  { q: "副業でも活動できますか？", a: "可能です。学生・会社員の方も多く在籍しています。無理のないスケジュールで活動できるよう相談しながら進めます。" },
];

const ctaClass = "inline-flex min-h-16 items-center justify-center gap-3 rounded-full border border-white/80 bg-gradient-to-r from-[#ff69a3] via-[#f64f91] to-[#cf2c68] px-8 text-base font-bold tracking-wide text-white shadow-[0_18px_45px_rgba(199,39,101,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(199,39,101,0.34)]";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fffafc] text-[#263446]">
      <header className="fixed inset-x-0 top-0 z-50 flex h-[76px] items-center justify-between border-b border-pink-100/60 bg-white/90 px-5 shadow-[0_8px_32px_rgba(179,54,102,0.06)] backdrop-blur-xl md:px-14">
        <a href="#top" className="font-serif text-[34px] font-medium leading-none tracking-[-0.04em] text-[#ee4e91] md:text-[42px]">solvia</a>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff69a3] to-[#e43b7d] px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(211,45,107,0.24)] md:px-7 md:text-base">
          <span className="hidden rounded-xl bg-white px-2 py-1 font-sans text-[8px] font-black text-[#ef4b8d] sm:inline">LINE</span>
          LINEで相談
        </a>
      </header>

      <main>
        <section id="top" className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_78%_25%,rgba(255,255,255,.96)_0_16%,transparent_42%),linear-gradient(120deg,#fffdfd_0%,#fff3f7_48%,#fde8f0_100%)] px-5 pb-20 pt-28 md:min-h-[860px] md:px-10 md:pb-24 md:pt-36">
          <div className="absolute left-[7%] top-32 h-5 w-3 rotate-[28deg] rounded-[80%_0_80%_0] bg-gradient-to-br from-pink-300 to-pink-100 opacity-60" />
          <div className="absolute right-[7%] top-44 h-4 w-2 rotate-[70deg] rounded-[80%_0_80%_0] bg-gradient-to-br from-pink-300 to-pink-100 opacity-50" />
          <div className="relative mx-auto flex w-full max-w-[1300px] flex-col items-center gap-9 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-20">
            <div className="order-2 w-full text-center md:order-1 md:text-left">
              <p className="text-2xl font-semibold tracking-[0.08em] text-[#273649] md:text-4xl">ライバー事務所</p>
              <h1 className="mt-1 font-serif text-[88px] font-medium leading-[0.9] tracking-[-0.065em] text-[#ed4d91] sm:text-[110px] md:text-[clamp(112px,11vw,168px)]">solvia</h1>
              <p className="mt-8 whitespace-nowrap text-[clamp(11px,3.05vw,14px)] font-semibold tracking-[-0.035em] text-[#314052] md:mt-11 md:text-[clamp(16px,1.4vw,22px)] md:tracking-[0.025em]">マネジメントスタッフはライバー経験者多数。</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-[2] text-[#667080] md:mx-0 md:text-lg">初心者の方でも安心してライブ配信を始められるサポートを致します。</p>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className={`${ctaClass} mt-7 w-full md:mt-9 md:w-auto md:min-w-[350px] md:text-xl`}>
                <span aria-hidden="true">🎀</span><span>LINEで相談する</span><span className="ml-auto text-2xl font-light" aria-hidden="true">›</span>
              </a>
              <p className="mt-4 text-xs tracking-wide text-[#8a7480] md:text-sm">未経験OK ／ 今の事務所から移籍もOK</p>
            </div>
            <div className="order-1 relative w-[min(92vw,590px)] md:order-2 md:w-full">
              <div className="absolute inset-[10%_4%_3%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.98),rgba(255,255,255,.45)_48%,transparent_72%)] blur-md" />
              <video autoPlay muted playsInline loop preload="auto" poster="/images/solvia_main.png" className="aspect-square w-full object-contain mix-blend-multiply [filter:saturate(1.05)_contrast(1.015)]" aria-label="solviaのブランドイラスト動画">
                <source src="/images/hero_video_15s.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white via-[#fff5f8] to-[#fdeef4] px-4 py-20 md:py-28" aria-labelledby="concerns-title">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-3 text-center md:gap-6">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d8b06a] md:w-28" />
              <h2 id="concerns-title" className="text-[30px] font-semibold tracking-wide md:text-5xl">こんな<span className="text-[#f64f91]">悩み、ない？</span></h2>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d8b06a] md:w-28" />
            </div>
            <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2 md:gap-5">
              {concerns.map((item) => (
                <article key={item.text} className="flex min-h-28 items-center gap-5 rounded-3xl border border-pink-100/80 bg-white/90 p-5 shadow-[0_18px_48px_rgba(185,57,105,0.08)] md:min-h-32 md:p-7">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-pink-200 bg-gradient-to-br from-white to-pink-100 text-[#ed4e90] shadow-inner"><Icon name={item.icon} /></span>
                  <p className="text-[15px] leading-7 text-[#3f4654] md:text-lg">{item.text}</p>
                </article>
              ))}
            </div>
            <p className="mt-9 text-center text-sm leading-8 text-[#74646d] md:text-lg">ひとつでも当てはまったら、<strong className="block text-2xl font-semibold text-[#f64f91] md:text-3xl">solviaの出番です。</strong></p>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#fff8fb] to-white px-4 py-20 md:py-28" aria-labelledby="points-title">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-center gap-3 text-center text-[#d7af65] md:gap-5">
              <span className="text-xl">✦</span><h2 id="points-title" className="text-[29px] font-semibold tracking-wide text-[#273446] md:text-5xl"><em className="not-italic text-[#f64f91]">solvia</em>が選ばれるポイント</h2><span className="text-xl">✦</span>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-5">
              {points.map((point, index) => (
                <article key={point.title} className="relative min-h-[285px] rounded-3xl border border-[#dfbd7e]/60 bg-white/95 px-4 py-6 text-center shadow-[0_22px_55px_rgba(185,57,105,0.08)] before:pointer-events-none before:absolute before:inset-1.5 before:rounded-[19px] before:border before:border-pink-100/60 md:min-h-[350px] md:px-6 md:py-8">
                  <span className="font-serif text-lg tracking-widest text-[#d7af65] md:text-2xl">0{index + 1}</span>
                  <span className="mx-auto mt-3 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#ff8db6] to-[#ec4d8c] text-white shadow-[0_10px_25px_rgba(224,64,128,0.22)] md:mt-5 md:h-16 md:w-16"><Icon name={point.icon} /></span>
                  <h3 className="relative mt-4 text-[15px] font-semibold leading-6 text-[#303847] md:mt-6 md:text-xl md:leading-8">{point.title}</h3>
                  <p className="relative mt-3 text-[11px] leading-[1.75] text-[#77707a] md:text-sm md:leading-7">{point.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:py-28" aria-labelledby="flow-title">
          <div className="mx-auto max-w-5xl">
            <p className="text-center font-sans text-[11px] font-bold tracking-[0.25em] text-[#f64f91]">HOW IT WORKS</p>
            <h2 id="flow-title" className="mt-3 text-center text-4xl font-semibold md:text-5xl">相談の流れ</h2>
            <div className="relative mt-12 space-y-6 before:absolute before:bottom-8 before:left-[29px] before:top-7 before:w-px before:bg-gradient-to-b before:from-pink-400 before:to-[#cf2c68] md:grid md:grid-cols-3 md:gap-8 md:space-y-0 md:before:left-[16%] md:before:right-[16%] md:before:top-9 md:before:h-px md:before:w-auto">
              {steps.map((step) => (
                <article key={step.no} className="relative z-10 grid min-h-24 grid-cols-[60px_1fr] gap-4 text-left md:block md:text-center">
                  <span className="grid h-[58px] w-[58px] place-items-center rounded-full border-[5px] border-white bg-gradient-to-br from-[#ff7aaa] to-[#cf2c68] font-serif text-white shadow-[0_12px_28px_rgba(209,46,107,0.18)] md:mx-auto md:h-[72px] md:w-[72px] md:border-[6px]">{step.no}</span>
                  <div><h3 className="mt-1 text-lg font-semibold md:mt-5 md:text-xl">{step.title}</h3><p className="mt-1 font-sans text-xs leading-6 text-[#7c747a] md:mt-2 md:text-sm">{step.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#fff6f9] to-[#fdeaf2] px-5 py-20 md:py-28" aria-labelledby="faq-title">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
            <div className="md:sticky md:top-28 md:self-start"><p className="text-center font-sans text-[11px] font-bold tracking-[0.25em] text-[#f64f91] md:text-left">FAQ</p><h2 id="faq-title" className="mt-3 text-center text-4xl font-semibold md:text-left md:text-5xl">よくある質問</h2></div>
            <div className="border-t border-pink-200/80">
              {faqs.map((faq, index) => (
                <details key={faq.q} open={index === 0} className="group border-b border-pink-200/80">
                  <summary className="grid min-h-20 cursor-pointer list-none grid-cols-[32px_1fr_28px] items-center gap-3 py-5 text-[15px] font-semibold md:min-h-24 md:grid-cols-[44px_1fr_32px] md:text-lg"><span className="text-[#f64f91]">Q.</span>{faq.q}<i className="relative h-7 w-7 rounded-full border border-pink-300 before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-2.5 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[#f64f91] after:absolute after:left-1/2 after:top-1/2 after:h-2.5 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#f64f91] after:transition group-open:after:rotate-90" aria-hidden="true" /></summary>
                  <p className="pb-6 pl-11 pr-3 font-sans text-xs leading-7 text-[#726a73] md:pl-14 md:text-sm">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-3 my-10 overflow-hidden rounded-[28px] border border-pink-300/60 bg-gradient-to-br from-[#fff9fb] to-[#fee7f0] px-5 py-12 text-center shadow-[0_28px_70px_rgba(185,57,105,0.10)] md:mx-auto md:my-16 md:max-w-6xl md:px-32 md:py-16">
          <span className="absolute left-7 top-5 text-2xl text-[#d7af65]">✦</span><span className="absolute bottom-5 right-7 text-2xl text-[#d7af65]">✦</span>
          <p className="text-xs tracking-wide text-[#6f6570] md:text-sm">あなたの「やってみたい」を、全力で応援します。</p>
          <h2 className="mt-3 text-[26px] font-semibold leading-[1.55] text-[#2d3544] md:text-[44px]">まずはLINEで気軽に相談してみませんか？</h2>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className={`${ctaClass} mt-7 w-full md:max-w-xl md:text-xl`}><span className="rounded-xl bg-white px-2 py-1 font-sans text-[8px] font-black text-[#ef4b8d]">LINE</span><span>LINEで相談する</span><span className="ml-auto text-2xl font-light">›</span></a>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-sans text-xs text-[#bd2b65]">TikTok公式：@solvia_0fficial ↗</a>
          <span className="mx-auto mt-6 grid h-20 w-20 place-items-center rounded-full border-4 border-double border-[#efd098] bg-gradient-to-br from-[#ff6ca1] to-[#d62d6b] text-xs leading-5 text-white md:absolute md:bottom-5 md:right-6 md:mt-0 md:h-24 md:w-24 md:text-sm">相談無料<br/>移籍OK</span>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-2 border-t border-pink-100 bg-white px-5 pb-28 pt-12 text-center text-[#7e6974] md:flex-row md:justify-center md:gap-6 md:pb-14">
        <strong className="font-serif text-3xl font-medium text-[#f64f91]">solvia</strong><span className="text-xs">あなたらしさを、もっと自由に。</span><small className="font-sans text-[10px]">© 2025 solvia. All Rights Reserved.</small>
      </footer>

      <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-[calc(14px+env(safe-area-inset-bottom))] left-4 right-4 z-50 flex min-h-[58px] items-center justify-center gap-2 rounded-full border border-white/80 bg-gradient-to-r from-[#ff69a3] via-[#f64f91] to-[#c92462] text-base font-bold text-white shadow-[0_18px_45px_rgba(155,27,79,0.32)] md:hidden">🎀 LINEで相談する <span aria-hidden="true">↗</span></a>
    </div>
  );
}
