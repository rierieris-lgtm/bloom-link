import { useState } from "react";

const STEPS = [
  {
    month: "Month 1",
    title: "現状把握",
    sub: "今、ここにいる自分を知る",
    desc: "今の自分の状態を、ありのままに見つめるところから始まります。何が満たされていて、何がモヤモヤしているのか。判断せずに、ただ観る。それが変化の出発点です。",
    color: "#EDF3F7",
    textColor: "#2B5F7A",
  },
  {
    month: "Month 2",
    title: "スペース作り",
    sub: "余白を取り戻す",
    desc: "忙しさや「こうしなきゃ」という思い込みを手放し、自分のための時間と空間を作ります。心に余白が生まれてはじめて、本当の声が聴こえてくる。",
    color: "#F5F0E8",
    textColor: "#2B5F7A",
  },
  {
    month: "Month 3",
    title: "自己理解",
    sub: "自分の強みと価値観を言語化する",
    desc: "好きなこと、大切にしていること、自然と発揮できる強み。ジャーナリングやセッションを通じて、自分だけの地図を少しずつ描いていきます。",
    color: "#EDF3F7",
    textColor: "#2B5F7A",
  },
  {
    month: "Month 4",
    title: "思考理解",
    sub: "自分のパターンに気づく",
    desc: "なぜいつも同じところで止まるのか。なぜあの場面で心が揺れるのか。自分の思考の癖やパターンを知ることで、選択の自由度が広がります。",
    color: "#F5F0E8",
    textColor: "#2B5F7A",
  },
  {
    month: "Month 5",
    title: "客観的理解",
    sub: "外側から自分を見る",
    desc: "Rieの視点と対話を通じて、自分では気づきにくい側面を照らします。強みも、可能性も、まだ見えていない才能も。第三者の眼が、新しい扉を開きます。",
    color: "#EDF3F7",
    textColor: "#2B5F7A",
  },
  {
    month: "Month 6",
    title: "未来設定",
    sub: "自分らしい旅路を描く",
    desc: "5ヶ月間で育てた軸をもとに、これからの人生の方向性を描きます。答えは一つじゃなくていい。あなたらしい景色へ向かう、最初の一歩を一緒に踏み出しましょう。",
    color: "#F5F0E8",
    textColor: "#2B5F7A",
  },
];

const FOR_WHO = [
  "なんとなく満たされているけど、このままでいいのか迷っている",
  "自分が本当にやりたいことが、わからなくなってきた",
  "頑張っているのに、どこか空回りしている感じがある",
  "人生の次のステージに進みたいけど、方向性が見えない",
  "自分の強みや価値観を、言葉にしてみたい",
  "Rieと一対一で、じっくり向き合う時間を持ちたい",
];

export default function CompassProgram() {
  const [openStep, setOpenStep] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF8F3]" style={{fontFamily: "'Zen Maru Gothic', sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Zen+Maru+Gothic:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F3]/90 backdrop-blur border-b border-[#2B5F7A]/10 px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-serif text-[#2B5F7A] tracking-widest text-sm">BLOOM LINK</a>
        <div className="hidden md:flex gap-6 items-center">
          <a href="/garden" className="text-xs tracking-widest text-[#7A8E9A] hover:text-[#2B5F7A] transition-colors">自分を整える</a>
          <a href="/compass" className="text-xs tracking-widest text-[#2B5F7A]">軸を描く伴走</a>
          <a href="/business-program" className="text-xs tracking-widest text-[#7A8E9A] hover:text-[#2B5F7A] transition-colors">ビジネス伴走</a>
          <a href="/travel" className="text-xs tracking-widest text-[#7A8E9A] hover:text-[#2B5F7A] transition-colors">✈️ 旅</a>
          <a href="#apply" className="text-xs tracking-widest px-5 py-2 rounded-full text-white transition-all hover:-translate-y-0.5" style={{background: "#C4714A"}}>相談する</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-16"
        style={{background: "linear-gradient(160deg, #EDF3F7 0%, #FAF8F3 55%, #F0EBE0 100%)"}}>
        <p className="text-xs tracking-[0.3em] text-[#C4714A] mb-6 uppercase">Blooming Compass Program</p>
        <h1 className="font-serif text-[#2B5F7A] leading-tight mb-4"
          style={{fontSize: "clamp(2.2rem, 5.5vw, 4rem)", fontWeight: 300}}>
          自分の軸を育てる、<br />
          <span style={{fontStyle: "italic"}}>6ヶ月の旅。</span>
        </h1>
        <div style={{width: 40, height: 1, background: "#C4714A", margin: "1.5rem auto"}} />
        <p style={{fontSize: "0.88rem", lineHeight: 2.6, color: "#7A8E9A", maxWidth: 480, marginBottom: "2.5rem"}}>
          現状把握から未来設定まで。<br />
          Rieとのマンツーマンで、あなただけの羅針盤を育てていく<br />
          6ヶ月間の伴走プログラムです。
        </p>
        <p style={{fontSize: "0.8rem", color: "#2B5F7A", letterSpacing: "0.15em", marginBottom: "2.5rem"}}>¥330,000（税込）</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#apply"
            className="inline-block text-white text-xs tracking-widest px-10 py-4 rounded-full transition-all hover:-translate-y-0.5 text-center"
            style={{background: "#2B5F7A"}}>
            無料相談に申し込む
          </a>
          <a href="#steps"
            className="inline-block text-xs tracking-widest px-10 py-4 rounded-full transition-all text-center"
            style={{border: "1px solid rgba(43,95,122,0.3)", color: "#2B5F7A"}}>
            6ステップを見る
          </a>
        </div>
      </section>

      {/* CONCEPT */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Concept</span>
          <h2 className="font-serif text-[#2B5F7A] mt-4 mb-8"
            style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
            答えは、あなたの中にある。
          </h2>
          <div style={{width: 40, height: 1, background: "#C4714A", margin: "0 auto 2rem"}} />
          <div style={{fontSize: "0.88rem", lineHeight: 2.8, color: "#7A8E9A"}}>
            <p style={{marginBottom: "1.5rem"}}>
              Blooming Compass Programは、答えを教わる場所ではありません。
            </p>
            <p style={{marginBottom: "1.5rem"}}>
              現状を把握し、余白を作り、自分を深く理解していく。<br />
              思考のパターンに気づき、外側からの視点も借りながら、<br />
              最後に、自分らしい未来の方向性を描いていく。
            </p>
            <p>
              その6ヶ月の旅を、Rieが一対一で伴走します。<br />
              あなたの中にすでにある羅針盤を、一緒に育てていきましょう。
            </p>
          </div>
        </div>
      </section>

      {/* 6 STEPS */}
      <section id="steps" className="py-24 px-6" style={{background: "#FAF8F3"}}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">6 Steps</span>
            <h2 className="font-serif text-[#2B5F7A] mt-4"
              style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
              6ヶ月のステップ
            </h2>
          </div>
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div key={i} className="rounded overflow-hidden bg-white"
                style={{border: "1px solid #EDF3F7", boxShadow: "0 1px 12px rgba(43,95,122,0.04)"}}>
                <button
                  onClick={() => setOpenStep(openStep === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left transition-colors"
                  style={{background: openStep === i ? "#EDF3F7" : "white"}}>
                  <div className="flex items-center gap-5">
                    <span className="font-serif" style={{fontSize: "0.8rem", color: "#C9A96E", letterSpacing: "0.1em", flexShrink: 0}}>{step.month}</span>
                    <div>
                      <p style={{fontSize: "0.95rem", color: "#2B5F7A", fontWeight: 500}}>{step.title}</p>
                      <p style={{fontSize: "0.75rem", color: "#7A8E9A", marginTop: "0.1rem"}}>{step.sub}</p>
                    </div>
                  </div>
                  <span style={{color: "#7A8E9A", fontSize: "0.7rem", flexShrink: 0}}>{openStep === i ? "▲" : "▼"}</span>
                </button>
                {openStep === i && (
                  <div className="px-6 pb-5 pt-3" style={{background: "#FAF8F3"}}>
                    <p style={{fontSize: "0.82rem", lineHeight: 2.1, color: "#7A8E9A"}}>{step.desc}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">For You</span>
          <h2 className="font-serif text-[#2B5F7A] mt-4 mb-10"
            style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
            こんな方へ
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {FOR_WHO.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded"
                style={{background: "#FAF8F3"}}>
                <span style={{width: 5, height: 5, borderRadius: "50%", background: "#C4714A", marginTop: "0.5rem", flexShrink: 0, display: "inline-block"}} />
                <p style={{fontSize: "0.82rem", lineHeight: 1.8, color: "#2A3540"}}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-24 px-6" style={{background: "#2B5F7A"}}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs tracking-[0.3em] uppercase" style={{color: "#C9A96E"}}>Included</span>
          <h2 className="font-serif mt-4 mb-10"
            style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300, color: "white"}}>
            プログラムに含まれるもの
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {[
              { icon: "🧭", title: "月2回 個別セッション", desc: "Rieとのマンツーマンセッション。60〜90分。あなたのペースで深めます。" },
              { icon: "📓", title: "ジャーナリングワーク", desc: "各ステップに合わせたワークシートで、セッション間も自分と向き合う時間を作ります。" },
              { icon: "💬", title: "LINEサポート", desc: "セッション外でも気づきや疑問をいつでも共有できます。一人で抱え込まなくていい。" },
              { icon: "🎯", title: "オリジナルコンパスシート", desc: "6ヶ月の旅を通じて育てた自分の軸を、一枚のシートにまとめます。" },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded p-5 flex gap-4">
                <span style={{fontSize: "1.3rem", flexShrink: 0}}>{item.icon}</span>
                <div>
                  <p style={{fontSize: "0.88rem", color: "white", fontWeight: 500, marginBottom: "0.4rem"}}>{item.title}</p>
                  <p style={{fontSize: "0.75rem", lineHeight: 1.9, color: "rgba(255,255,255,0.65)"}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Pricing</span>
          <h2 className="font-serif text-[#2B5F7A] mt-4 mb-10"
            style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>受講料</h2>
          <div className="rounded p-10" style={{boxShadow: "0 2px 30px rgba(43,95,122,0.08)", border: "1px solid #F0EBE0"}}>
            <p style={{fontSize: "0.7rem", letterSpacing: "0.15em", color: "#7A8E9A", marginBottom: "0.8rem"}}>6ヶ月間プログラム</p>
            <p className="font-serif text-[#2B5F7A]" style={{fontSize: "3.5rem", fontWeight: 300, lineHeight: 1}}>¥330,000</p>
            <p style={{fontSize: "0.7rem", color: "#7A8E9A", marginTop: "0.4rem", marginBottom: "2rem"}}>税込</p>
            <div className="text-left space-y-3" style={{borderTop: "1px solid #F0EBE0", paddingTop: "1.5rem"}}>
              {[
                "月2回 個別セッション（計12回）",
                "ジャーナリングワークシート",
                "LINEサポート（6ヶ月間）",
                "オリジナルコンパスシート",
                "修了後フォローセッション1回",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{width: 5, height: 5, borderRadius: "50%", background: "#C4714A", marginTop: "0.45rem", flexShrink: 0, display: "inline-block"}} />
                  <p style={{fontSize: "0.82rem", color: "#7A8E9A"}}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p style={{fontSize: "0.72rem", color: "#7A8E9A", marginTop: "1.5rem", lineHeight: 2}}>
            ※ 分割払いについてはご相談ください。<br />
            ※ Blooming Garden会員は優先案内があります。
          </p>
        </div>
      </section>

      {/* FLOW */}
      <section className="py-24 px-6" style={{background: "#FAF8F3"}}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Flow</span>
            <h2 className="font-serif text-[#2B5F7A] mt-4"
              style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
              申し込みの流れ
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", title: "無料相談（30分）", desc: "まずはLINEまたはZoomでお話しします。プログラムの説明と、あなたの現状・ご要望をお聞きします。" },
              { step: "02", title: "ご入会・お支払い", desc: "ご納得いただけたらお申し込みください。支払い方法はクレジットカード・銀行振込から選べます。" },
              { step: "03", title: "キックオフセッション", desc: "6ヶ月の旅がスタートします。最初のセッションで現状把握と目標設定を行います。" },
              { step: "04", title: "月2回のセッション", desc: "毎月2回、Rieとのマンツーマンセッションで深めていきます。" },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 items-start bg-white rounded p-5"
                style={{boxShadow: "0 1px 12px rgba(43,95,122,0.05)"}}>
                <p className="font-serif" style={{fontSize: "1.8rem", fontWeight: 300, color: "rgba(201,169,110,0.5)", flexShrink: 0, lineHeight: 1}}>{item.step}</p>
                <div>
                  <p style={{fontSize: "0.88rem", color: "#2B5F7A", fontWeight: 500, marginBottom: "0.3rem"}}>{item.title}</p>
                  <p style={{fontSize: "0.78rem", lineHeight: 1.9, color: "#7A8E9A"}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="py-28 px-6 text-center"
        style={{background: "linear-gradient(135deg, #2B5F7A 0%, #1E4A62 100%)"}}>
        <span className="text-xs tracking-[0.3em] uppercase" style={{color: "#C9A96E"}}>Start Your Journey</span>
        <h2 className="font-serif mt-4 mb-4 leading-snug"
          style={{fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "white"}}>
          自分らしい景色へ、<br />一緒に歩き始めませんか。
        </h2>
        <p style={{color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: 2.2, marginBottom: "2.5rem"}}>
          まずは無料相談から。<br />
          あなたのペースで、話しましょう。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://lin.ee/6d68Aqd"
            className="inline-block text-white text-xs tracking-widest px-10 py-4 rounded-full transition-all hover:-translate-y-0.5"
            style={{background: "#C4714A"}}>
            LINEで無料相談する
          </a>
          <a href="/"
            className="inline-block text-white text-xs tracking-widest px-10 py-4 rounded-full transition-all"
            style={{border: "1px solid rgba(255,255,255,0.4)"}}>
            Blooming Gardenを見る
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center" style={{background: "#2A3540"}}>
        <p className="font-serif tracking-widest mb-2" style={{color: "rgba(255,255,255,0.4)", fontSize: "0.85rem"}}>BLOOM LINK</p>
        <div className="flex justify-center gap-6 mb-3 flex-wrap">
          {[["Home", "/"], ["Compass Program", "/compass"], ["Business Program", "/business-program"], ["プライバシーポリシー", "/privacy"], ["特定商取引法", "/tokutei"], ["お問い合わせ", "/contact"]].map(([label, href]) => (
            <a key={label} href={href} style={{fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", textDecoration: "none"}}>{label}</a>
          ))}
        </div>
        <p style={{color: "rgba(255,255,255,0.2)", fontSize: "0.68rem"}}>© 2026 BLOOM LINK. All rights reserved.</p>
      </footer>
    </div>
  );
}
