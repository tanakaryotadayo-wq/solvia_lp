"use client";


import { useEffect, useState } from "react";

const LINE_URL = "https://lin.ee/cGHJDjx";
const TIKTOK_URL = "https://www.tiktok.com/@solvia_0fficial?_r=1&_t=ZS-93pa961TczF";

export default function LPPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
                <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-pink-400">
                        solvia
                    </div>
                    <a
                        href={LINE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all"
                    >
                        LINEで相談
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 px-6 gap-8 max-w-6xl mx-auto bg-pink-50/80 rounded-b-3xl">
                {/* Video */}
                <div
                    className={`relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0 bg-pink-50 overflow-hidden rounded-2xl ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', isolation: 'isolate' } as React.CSSProperties}
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-contain mix-blend-multiply"
                        poster="/images/solvia_main.png"
                    >
                        <source src="/images/hero_video_15s.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Hero Text */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 text-gray-800 leading-tight ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                        ライバー事務所<br /><span className="text-pink-400">solvia</span>
                    </h1>

                    <p className={`text-lg md:text-xl text-gray-600 mb-10 leading-relaxed ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                        マネジメントスタッフはライバー経験者多数。<br />
                        初心者の方でも安心してライブ配信を始められるサポートを致します。
                    </p>

                    <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-10 py-5 rounded-full font-bold text-lg shadow-lg shadow-pink-300/50 hover:shadow-xl hover:shadow-pink-400/50 hover:-translate-y-1 hover:scale-105 transition-all text-center">
                            🎀 LINEで相談する
                        </a>
                    </div>

                    <p className="text-sm text-gray-500 mt-6 font-medium">未経験OK ／ 今の事務所から移籍もOK</p>
                </div>
            </section>

            {/* 悩みブロック */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">
                        こんな<span className="text-pink-500">悩み、ない？</span>
                    </h2>
                    <div className="grid gap-6 text-center">
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
                    <p className="mt-10 text-lg text-gray-700 font-medium">
                        ひとつでも当てはまったら<br /><span className="text-pink-500">solviaの出番</span>です。
                    </p>
                </div>
            </section>

            {/* 選ばれるポイント */}
            <section className="py-20 px-6 bg-gradient-to-b from-white to-pink-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
                        選ばれる<span className="text-pink-500">ポイント</span>
                    </h2>
                    <div className="space-y-6">
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
                            <div key={i} className="p-8 bg-white rounded-3xl shadow-lg shadow-pink-100/50 border border-pink-100/50 hover:shadow-xl hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 中間CTA: LINE + TikTok */}
            <section className="py-16 px-6 bg-gradient-to-r from-pink-500 to-rose-400 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">
                        LINE無料相談
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-pink-500 px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all">
                            LINEで相談する
                        </a>
                    </div>
                    <div className="mt-6">
                        <p className="text-white/80 text-sm mb-2">TikTok公式アカウント</p>
                        <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-white/50 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all text-sm">
                            @solvia_0fficial
                        </a>
                    </div>
                </div>
            </section>

            {/* 相談の流れ */}
            <section id="flow" className="py-20 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
                        相談の<span className="text-pink-500">流れ</span>
                    </h2>
                    <div className="space-y-0">
                        {[
                            { step: "1", title: "LINEで相談", desc: "いまの状況を軽く聞かせてください" },
                            { step: "2", title: "あなたに合う進め方を提案", desc: "無理な勧誘なし" },
                            { step: "3", title: "納得できたらスタート", desc: "合わなければ見送りOK" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                                    {item.step}
                                </div>
                                <div className="flex-1 py-6 border-b border-pink-100 last:border-0">
                                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
                        よくある<span className="text-pink-500">質問</span>
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: "未経験でも大丈夫？", a: "大丈夫。最初の型づくりからサポートします。" },
                            { q: "事務所に入るメリットは何ですか？", a: "配信分析・企画提案・イベント対策などを個別にサポートします。個人では難しい情報共有や戦略設計ができる点が大きな違いです。" },
                            { q: "副業でも活動できますか？", a: "可能です。学生・会社員の方も多く在籍しています。無理のないスケジュールで活動できるよう相談しながら進めます。" }
                        ].map((item, i) => (
                            <div key={i} className="bg-pink-50/50 p-6 rounded-2xl">
                                <div className="font-bold text-gray-800 mb-2 flex items-start gap-2">
                                    <span className="text-pink-400">Q.</span>
                                    {item.q}
                                </div>
                                <div className="text-gray-600 flex items-start gap-2">
                                    <span className="text-pink-300">A.</span>
                                    {item.a}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ラストCTA - LINE公式 */}
            <section className="py-24 px-6 bg-gradient-to-br from-pink-100 via-pink-50 to-pink-100">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                        solviaがLINE公式アカウントに登場！
                    </h2>
                    <p className="text-gray-600 mb-10">お得な情報を受け取るには、以下のリンクから友だち追加してください。</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-10 py-4 rounded-full font-medium hover:shadow-xl hover:-translate-y-1 transition-all text-lg">
                            LINEで友だち追加する
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center bg-white border-t border-pink-100">
                <div className="text-xl font-bold text-pink-400 mb-2">
                    solvia
                </div>
                <p className="text-gray-400 text-sm">&copy; 2025 solvia. All Rights Reserved.</p>
            </footer>

            {/* Floating CTA */}
            <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 z-50"
            >
                <span className="text-xl">💬</span>
                <span className="font-medium">LINEで相談</span>
            </a>
        </div>
    );
}
