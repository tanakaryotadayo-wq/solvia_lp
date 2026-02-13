"use client";

import { useEffect, useRef, useState } from "react";

const LINE_URL = "https://lin.ee/cGHJDjx";
const TIKTOK_URL = "https://www.tiktok.com/@solvia_0fficial?_r=1&_t=ZS-93pa961TczF";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <header className="site-header">
        <div className="logo text-pink-400">solvia</div>
        <nav className="flex items-center">
          <a href="#about" className="nav-link hidden md:inline">About</a>
          <a href="#features" className="nav-link hidden md:inline">特徴</a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">LINEで相談</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 gap-12 max-w-7xl mx-auto rounded-b-[3rem] bg-pink-50 mb-12">
        {/* Hero Text */}
        <div className="flex flex-col items-center md:items-start max-w-2xl order-2 md:order-1">
          <h1 className={`text-4xl md:text-7xl font-bold mb-8 text-gray-800 leading-[1.15] tracking-tight ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            ライバー事務所<br /><span className="text-pink-400">solvia</span>
          </h1>

          <p className={`text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            マネジメントスタッフはライバー経験者多数。<br />
            初心者の方でも安心してライブ配信を始められるサポートを致します。
          </p>

          <div className={`flex flex-col sm:flex-row gap-5 w-full sm:w-auto ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="hero-btn group">
              <span className="mr-2">🎀</span> LINEで相談する
            </a>
          </div>

          <p className={`text-sm text-gray-400 mt-6 font-medium ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            未経験OK ／ 今の事務所から移籍もOK
          </p>
        </div>

        {/* Hero Image/Video Container */}
        <div className="relative w-80 h-80 md:w-[30rem] md:h-[30rem] flex-shrink-0 order-1 md:order-2 bg-pink-50 overflow-hidden rounded-full">
          <video
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-contain relative z-10 mix-blend-multiply"
            poster="/images/solvia_main.png"
          >
            <source src="/images/hero_video_15s.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* 悩みブロック */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-16">
            こんな<span className="text-pink-500">悩み、ない？</span>
          </h2>
          <div className="grid gap-6 text-center max-w-2xl mx-auto">
            {[
              "何を話せばいいかわからない",
              "ライブ配信をがんばってるのに伸びない",
              "伸びる人の真似をしてもしっくりこない",
              "誰かに見てもらって改善したい"
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg shadow-pink-100/50 border border-pink-100 flex items-center justify-center font-medium text-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-12 text-xl text-gray-700 font-bold">
            ひとつでも当てはまったら<br /><span className="text-pink-500 bg-pink-50 px-2 rounded">solviaの出番</span>です。
          </p>
        </div>
      </section>

      {/* 選ばれるポイント */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-pink-500 font-bold tracking-widest text-sm uppercase">Why solvia?</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mt-3">
              選ばれる<span className="text-pink-500">ポイント</span>
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "費用ゼロで始められる",
                desc: "還元率100%、所属費用は一切なし／スマホ1台でOK／ノルマなし"
              },
              {
                title: "ゼロからでもOK",
                desc: "TikTokフォロワー0人から始められる"
              },
              {
                title: "縛りなし",
                desc: "辞めたい時に辞められる"
              },
              {
                title: "あなたに合う伸ばし方",
                desc: "スタッフがサポート"
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-start p-10 bg-white rounded-[2rem] shadow-xl shadow-pink-100/50 border border-pink-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 中間CTA: LINE + TikTok */}
      <section className="py-20 px-6 bg-gray-900 text-white text-center relative overflow-hidden rounded-[3rem] mx-4 my-12 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-400/20 z-0"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            LINE無料相談
          </h2>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-pink-500 to-rose-400 text-white px-12 py-5 rounded-full font-bold text-xl shadow-lg hover:scale-105 hover:shadow-pink-500/50 transition-all">
            LINEで相談する
          </a>
          <div className="mt-8">
            <p className="text-gray-400 text-sm mb-2">TikTok公式アカウント</p>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="inline-block border border-gray-600 text-gray-300 px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all text-sm">
              @solvia_0fficial
            </a>
          </div>
        </div>
      </section>

      {/* 相談の流れ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            相談の<span className="text-pink-500">流れ</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "LINEで相談", desc: "いまの状況を軽く聞かせてください" },
              { step: "2", title: "あなたに合う進め方を提案", desc: "無理な勧誘なし" },
              { step: "3", title: "納得できたらスタート", desc: "合わなければ見送りOK" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-pink-50/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            よくある<span className="text-pink-500">質問</span>
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              { q: "未経験でも大丈夫？", a: "大丈夫。最初の型づくりからサポートします。" },
              { q: "事務所に入るメリットは何ですか？", a: "配信分析・企画提案・イベント対策などを個別にサポートします。個人では難しい情報共有や戦略設計ができる点が大きな違いです。" },
              { q: "副業でも活動できますか？", a: "可能です。学生・会社員の方も多く在籍しています。無理のないスケジュールで活動できるよう相談しながら進めます。" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <p className="font-bold text-gray-800 mb-2 flex items-start gap-2">
                  <span className="text-pink-400">Q.</span> {item.q}
                </p>
                <p className="text-gray-600 text-sm ml-6 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ラストCTA - LINE公式 */}
      <section className="py-20 px-6 bg-gradient-to-br from-pink-100 via-pink-50 to-pink-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
            solviaがLINE公式アカウントに登場！
          </h2>
          <p className="text-gray-600 mb-10">お得な情報を受け取るには、以下のリンクから友だち追加してください。</p>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-pink-500 to-rose-400 text-white px-12 py-5 rounded-full font-bold text-xl shadow-lg hover:scale-105 hover:shadow-pink-500/50 transition-all">
            LINEで友だち追加する
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-white/70">
        <div className="text-2xl mb-2 font-bold text-pink-400">solvia</div>
        <p className="text-gray-500 text-sm">&copy; 2025 solvia. All Rights Reserved.</p>
      </footer>

      {/* Floating CTA */}
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-cta"
        id="contact"
      >
        <span className="text-2xl mr-2">💬</span>
        <span>LINEで相談</span>
      </a>
    </div>
  );
}
