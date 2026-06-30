import { useState } from "react";

const CURRICULUM = [
  {
    month: "Month 1",
    theme: "土台をつくる",
    tag: "マインド・AI基礎",
    items: [
      "オンラインビジネスの全体像を掴む",
      "Rieマインド（仕事の哲学）を学ぶ",
      "AI活用の基本（Claude・ChatGPT）",
      "業務委託・フリーランスの基礎知識",
    ],
  },
  {
    month: "Month 2",
    theme: "発信・集客を学ぶ",
    tag: "SNS・コンテンツ",
    items: [
      "SNS運用の設計と実践",
      "AIを使ったコンテンツ制作",
      "LP・セールスページの基礎",
      "ブランディングと世界観づくり",
    ],
  },
  {
    month: "Month 3",
    theme: "仕組みを作る",
    tag: "運用・自動化",
    items: [
      "LINEステップ・メルマガ設計",
      "予約・決済・顧客管理の仕組み化",
      "業務フローの標準化・マニュアル化",
      "AIで業務を効率化する実践",
    ],
  },
  {
    month: "Month 4",
    theme: "講座・サービスを作る",
    tag: "商品設計",
    items: [
      "オンライン講座の設計と運営",
      "価格設定・パッケージの作り方",
      "Zoom・動画・資料の活用",
      "受講生サポートの仕組み",
    ],
  },
  {
    month: "Month 5",
    theme: "収益につなげる",
    tag: "セールス・数字",
    items: [
      "クロージング・セールスの基礎",
      "数字の読み方・売上管理",
      "リピート・口コミを生む仕組み",
      "イベント・体験会の設計と集客",
    ],
  },
  {
    month: "Month 6",
    theme: "自分の形を確立する",
    tag: "独立・今後",
    items: [
      "強みの言語化・ポートフォリオ整理",
      "クライアント獲得の具体的ステップ",
      "Rieとの最終面談・今後の方向性",
      "BLOOM LINK認定修了",
    ],
  },
];

const FOR_WHO = [
  { icon: "🚀", text: "ゼロからオンラインビジネスを立ち上げたい" },
  { icon: "🤝", text: "経営者を支える仕事で収益を作りたい" },
  { icon: "🤖", text: "AIを使いこなして、働き方を変えたい" },
  { icon: "🏠", text: "在宅・自分のペースで収益の柱を作りたい" },
  { icon: "💫", text: "これまでの経験やスキルをオンラインで活かしたい" },
  { icon: "🌱", text: "小さく始めて、着実に形にしていきたい" },
];

const TWO_PATHS = [
  {
    title: "自分のビジネスを作る",
    sub: "Online Business Owner",
    desc: "講座で学んだ仕組みをそのまま自分のビジネスに転用。ゼロから収益を生み出す。",
    points: ["自分の講座・サービスを作れる", "集客・運用を自分で回せる", "ブランドを育てられる"],
  },
  {
    title: "経営者の右腕として",
    sub: "Executive Assistant",
    desc: "運用・仕組み化・講座運営を支えるプロとして、クライアントワークで収益を作る。",
    points: ["業務委託契約で働く", "複数クライアントを持てる", "スキルが資産になる"],
  },
];

export default function BLBusinessProgram() {
  const [openMonth, setOpenMonth] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#2A3540]" style={{fontFamily: "'Zen Maru Gothic', sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Zen+Maru+Gothic:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F3]/90 backdrop-blur border-b border-[#2B5F7A]/10 px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-serif text-[#2B5F7A] tracking-widest text-sm">BLOOM LINK</a>
        <div className="hidden md:flex gap-6">
          <a href="/" className="text-xs tracking-widest text-[#7A8E9A] hover:text-[#2B5F7A] transition-colors">Home</a>
          <a href="/garden" className="text-xs tracking-widest text-[#7A8E9A] hover:text-[#2B5F7A] transition-colors">自分を整える</a>
          <a href="/compass" className="text-xs tracking-widest text-[#7A8E9A] hover:text-[#2B5F7A] transition-colors">軸を描く伴走</a>
          <a href="#" className="text-xs tracking-widest text-[#2B5F7A]">ビジネス伴走</a>
          <a href="/travel" className="text-xs tracking-widest text-[#7A8E9A] hover:text-[#2B5F7A] transition-colors">✈️ 旅</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-16"
        style={{background: "linear-gradient(160deg, #EDF3F7 0%, #FAF8F3 55%, #F0EBE0 100%)"}}>
        <p className="text-xs tracking-[0.3em] text-[#C4714A] mb-6 uppercase">BLOOM LINK Business Program</p>
        <h1 className="font-serif text-[#2B5F7A] leading-tight mb-4"
          style={{fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 300}}>
          オンラインで収益を作る、<br />
          <span style={{fontStyle: "italic", color: "#C4714A"}}>6ヶ月の実践プログラム。</span>
        </h1>
        <div style={{width: 40, height: 1, background: "#C4714A", margin: "1.5rem auto"}} />
        <p className="text-[#7A8E9A] leading-loose max-w-lg mb-3" style={{fontSize: "0.88rem"}}>
          自分のビジネスをゼロから作る道も、<br />
          経営者の右腕として活躍する道も。<br />
          どちらにも使える実践カリキュラム。
        </p>
        <p className="text-[#2B5F7A] tracking-widest mb-10" style={{fontSize: "0.8rem"}}>¥330,000（税込）</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#apply"
            className="inline-block text-white text-xs tracking-widest px-10 py-4 rounded-full transition-all hover:-translate-y-0.5"
            style={{background: "#2B5F7A"}}>
            詳細・お申し込み
          </a>
          <a href="#curriculum"
            className="inline-block text-xs tracking-widest px-10 py-4 rounded-full border transition-all"
            style={{borderColor: "rgba(43,95,122,0.3)", color: "#2B5F7A"}}>
            カリキュラムを見る
          </a>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Story</span>
          <h2 className="font-serif text-[#2B5F7A] mt-4 mb-8 leading-snug"
            style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
            経験はすべて、<br />誰かの力になれる。
          </h2>
          <div className="space-y-5" style={{fontSize: "0.85rem", lineHeight: 2.6, color: "#7A8E9A"}}>
            <p>大企業の秘書として組織を支え、<br />
            夫のフレンチレストランの立ち上げと経営にも関わり、<br />
            そして自分でゼロからオンラインビジネスを作ってきた。</p>
            <p>三つの現場で得た経験が、このカリキュラムの土台になっています。</p>
            <p>うまくいかないことも、試行錯誤も、たくさんあった。<br />
            でもその経験があるから、「支える側」にも「作る側」にも<br />
            リアルに寄り添えるカリキュラムができた。</p>
            <p>ライフスタイルや事情は、人それぞれ違う。<br />
            子育て中でも、会社員でも、何者でもなくても。<br />
            オンラインで収益を作る方法は、誰にでも開かれている。</p>
            <p>難しく考えなくていい。<br />
            まず小さく動いて、試して、形にしていく。</p>
            <p><strong style={{color: "#2B5F7A"}}>その6ヶ月を、一緒に歩きます。</strong></p>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-[#2B5F7A] text-lg"
              style={{background: "#EDF3F7"}}>R</div>
            <div>
              <p style={{fontSize: "0.85rem", color: "#2B5F7A", fontWeight: 500}}>Rie</p>
              <p style={{fontSize: "0.7rem", color: "#7A8E9A", letterSpacing: "0.15em"}}>
                元・大手企業秘書｜フレンチオーナーシェフの妻｜二児の母｜35カ国渡航
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="py-24 px-6" style={{background: "#FAF8F3"}}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Two Paths</span>
            <h2 className="font-serif text-[#2B5F7A] mt-4"
              style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
              2つの道に使えるカリキュラム
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {TWO_PATHS.map((path, i) => (
              <div key={i} className="bg-white rounded p-8"
                style={{boxShadow: "0 2px 20px rgba(43,95,122,0.06)"}}>
                <p style={{fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C4714A", marginBottom: "0.5rem"}}>
                  {path.sub}
                </p>
                <h3 className="font-serif text-[#2B5F7A] mb-4"
                  style={{fontSize: "1.4rem", fontWeight: 300}}>{path.title}</h3>
                <p style={{fontSize: "0.82rem", lineHeight: 2, color: "#7A8E9A", marginBottom: "1.5rem"}}>
                  {path.desc}
                </p>
                <div className="space-y-2">
                  {path.points.map((pt, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span style={{width: 5, height: 5, borderRadius: "50%", background: "#C4714A", flexShrink: 0, display: "inline-block"}} />
                      <p style={{fontSize: "0.78rem", color: "#2A3540"}}>{pt}</p>
                    </div>
                  ))}
                </div>
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
            こんな方に来てほしい
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FOR_WHO.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded"
                style={{background: "#FAF8F3"}}>
                <span style={{fontSize: "1.2rem"}}>{item.icon}</span>
                <p style={{fontSize: "0.82rem", lineHeight: 1.8, color: "#2A3540"}}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="py-24 px-6" style={{background: "#FAF8F3"}}>
        <div className="max-w-2xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Curriculum</span>
          <h2 className="font-serif text-[#2B5F7A] mt-4 mb-10"
            style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
            6ヶ月カリキュラム
          </h2>
          <div className="space-y-3">
            {CURRICULUM.map((m, i) => (
              <div key={i} className="rounded overflow-hidden bg-white"
                style={{border: "1px solid #EDF3F7"}}>
                <button
                  onClick={() => setOpenMonth(openMonth === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left transition-colors"
                  style={{background: openMonth === i ? "#EDF3F7" : "white"}}>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-serif" style={{fontSize: "0.85rem", color: "#C9A96E"}}>{m.month}</span>
                    <span style={{fontSize: "0.88rem", color: "#2B5F7A", fontWeight: 500}}>{m.theme}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{background: "rgba(196,113,74,0.1)", color: "#C4714A", fontSize: "0.65rem", letterSpacing: "0.1em"}}>
                      {m.tag}
                    </span>
                  </div>
                  <span style={{color: "#7A8E9A", fontSize: "0.7rem"}}>{openMonth === i ? "▲" : "▼"}</span>
                </button>
                {openMonth === i && (
                  <div className="px-6 pb-5" style={{background: "#FAF8F3"}}>
                    <ul className="space-y-2 pt-3">
                      {m.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2"
                          style={{fontSize: "0.82rem", color: "#7A8E9A"}}>
                          <span style={{width: 4, height: 4, borderRadius: "50%", background: "#C4714A",
                            marginTop: "0.45rem", flexShrink: 0, display: "inline-block"}} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
          <div className="rounded p-10 bg-white" style={{boxShadow: "0 2px 30px rgba(43,95,122,0.08)"}}>
            <p style={{fontSize: "0.7rem", letterSpacing: "0.15em", color: "#7A8E9A", marginBottom: "0.8rem"}}>
              6ヶ月間プログラム
            </p>
            <p className="font-serif text-[#2B5F7A]" style={{fontSize: "3.5rem", fontWeight: 300, lineHeight: 1}}>
              ¥330,000
            </p>
            <p style={{fontSize: "0.7rem", color: "#7A8E9A", marginBottom: "2rem"}}>税込</p>
            <div className="text-left space-y-3 pt-6" style={{borderTop: "1px solid #F0EBE0"}}>
              {[
                "月2回 セッション（個別またはグループ）",
                "Discordでいつでも相談",
                "課題レビュー・フィードバック",
                "AIツール活用サポート",
                "BLOOM LINK認定修了証",
                "修了後もコミュニティ継続可",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{width: 5, height: 5, borderRadius: "50%", background: "#C4714A",
                    marginTop: "0.45rem", flexShrink: 0, display: "inline-block"}} />
                  <p style={{fontSize: "0.82rem", color: "#7A8E9A"}}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p style={{fontSize: "0.72rem", color: "#7A8E9A", marginTop: "1.5rem", lineHeight: 2}}>
            ※ 分割払いについてはご相談ください。<br />
            ※ Launch Lab会員は優先案内があります。
          </p>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="py-24 px-6" style={{background: "#FAF8F3"}}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Bloom Link World</span>
          <h2 className="font-serif text-[#2B5F7A] mt-4 mb-10"
            style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
            BLOOM LINKの世界
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Blooming Garden", desc: "まだ知らない自分と世界に出会う、土台のコミュニティ。", href: "bloom-link-salons.html", price: "¥3,500/月〜", current: false },
              { name: "Launch Lab", desc: "挑戦を形にする、ビジネス実践コミュニティ。", href: "bloom-link-salons.html#launch", price: "¥5,500/月〜", current: false },
              { name: "Business Program", desc: "オンラインで収益を作る、6ヶ月の実践プログラム。", href: "#", price: "¥330,000", current: true },
            ].map((item, i) => (
              <a key={i} href={item.href}
                className="block rounded p-6 text-left transition-all hover:-translate-y-0.5"
                style={{
                  background: item.current ? "#2B5F7A" : "white",
                  boxShadow: item.current ? "0 4px 20px rgba(43,95,122,0.2)" : "none",
                }}>
                <p style={{fontSize: "0.7rem", letterSpacing: "0.15em", color: item.current ? "#C9A96E" : "#C4714A", marginBottom: "0.5rem"}}>
                  {item.price}
                </p>
                <p className="font-serif mb-3"
                  style={{fontSize: "1rem", fontWeight: 300, color: item.current ? "white" : "#2B5F7A"}}>
                  {item.name}
                </p>
                <p style={{fontSize: "0.75rem", lineHeight: 1.8, color: item.current ? "rgba(255,255,255,0.65)" : "#7A8E9A"}}>
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">FAQ</span>
          <h2 className="font-serif text-[#2B5F7A] mt-4 mb-10"
            style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
            よくあるご質問
          </h2>
          <div style={{borderTop: "1px solid #F0EBE0"}}>
            {[
              { q: "Launch Labに入っていなくても申し込めますか？", a: "はい、外部からも直接お申し込みいただけます。Launch Lab会員の方には優先案内をしています。" },
              { q: "副業・育児中でも受講できますか？", a: "はい、オンライン完結・自分のペースで進められる設計にしています。月2回のセッション以外は非同期でOKです。" },
              { q: "ビジネス経験がなくても大丈夫ですか？", a: "大丈夫です。ゼロから丁寧に学べるカリキュラムです。「やってみたい」という気持ちがあれば十分です。" },
              { q: "修了後はどうなりますか？", a: "BLOOM LINK認定修了証を発行します。希望者はそのままBLOOM LINKの業務委託パートナーとして活動することも可能です。" },
              { q: "分割払いはできますか？", a: "はい、ご相談に応じます。まずはLINEでお気軽にご連絡ください。" },
            ].map((item, i) => (
              <div key={i} style={{borderBottom: "1px solid #F0EBE0", padding: "1.5rem 0"}}>
                <p className="flex gap-3 items-start" style={{fontSize: "0.85rem", fontWeight: 500, color: "#2B5F7A"}}>
                  <span className="font-serif flex-shrink-0" style={{color: "#C4714A", fontSize: "1rem"}}>Q</span>
                  {item.q}
                </p>
                <p style={{fontSize: "0.82rem", color: "#7A8E9A", lineHeight: 2, marginTop: "0.6rem", paddingLeft: "1.5rem"}}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="py-28 px-6 text-white text-center"
        style={{background: "linear-gradient(135deg, #2B5F7A 0%, #1E4A62 100%)"}}>
        <span className="text-xs tracking-[0.3em] uppercase" style={{color: "#C9A96E"}}>Join Us</span>
        <h2 className="font-serif mt-4 mb-4 leading-snug"
          style={{fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "white"}}>
          オンラインで、自分らしく<br />収益を作っていこう。
        </h2>
        <p style={{color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: 2.2, marginBottom: "2.5rem"}}>
          6ヶ月後、あなたの働き方は変わっています。<br />
          まずは気軽にLINEでご相談ください。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://lin.ee/6d68Aqd"
            className="inline-block text-white text-xs tracking-widest px-10 py-4 rounded-full transition-all hover:-translate-y-0.5"
            style={{background: "#C4714A"}}>
            LINEで相談・お申し込み
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
        <p className="font-serif tracking-widest mb-2" style={{color: "rgba(255,255,255,0.4)", fontSize: "0.85rem"}}>
          BLOOM LINK
        </p>
        <div className="flex justify-center gap-6 mb-3 flex-wrap">
          {[["Home","/"],["Blooming Garden","/"],["プライバシーポリシー","/privacy"],["特定商取引法","/tokutei"],["お問い合わせ","/contact"]].map(([label,href]) => (
            <a key={label} href={href} style={{fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", textDecoration: "none"}}>{label}</a>
          ))}
        </div>
        <p style={{color: "rgba(255,255,255,0.2)", fontSize: "0.68rem"}}>
          © 2026 BLOOM LINK. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
