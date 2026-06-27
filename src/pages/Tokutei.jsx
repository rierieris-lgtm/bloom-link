export default function Tokutei() {
  const items = [
    { label: "事業者名", value: "Bloom Link" },
    { label: "代表者名", value: "高木 理恵" },
    { label: "所在地", value: "名古屋市東区\n※詳細住所は請求をいただいた場合、すみやかに開示いたします。" },
    { label: "電話番号", value: "請求があれば遅滞なく開示いたします。" },
    { label: "メールアドレス", value: "rie@bloomlink-works.com" },
    { label: "販売URL", value: "準備中" },
    { label: "販売価格", value: "各商品ページに記載（講座・サービスにより異なります）" },
    { label: "商品代金以外の必要料金", value: "・振込手数料\n・通信費等" },
    { label: "支払い方法", value: "・クレジットカード決済\n・銀行振込" },
    { label: "サービス提供時期", value: "決済確認後、即時または各講座ページに記載の時期より提供開始" },
    { label: "返品・キャンセルについて", value: "お申し込み後の自己都合によるキャンセルは、受講料の100％をキャンセル料として申し受けます。\n\n毎月払いの場合\n・翌月分の支払いは毎月25日引き落としです\n・途中退会を希望される場合は、前月10日までにご連絡ください" },
    { label: "動作環境", value: "オンライン講座の受講に必要な端末・通信環境は、受講者の責任でご準備ください。" },
    { label: "特別条件", value: "・オンライン講座・デジタルコンテンツの性質上、返金には応じておりません\n・講座内で提供される素材・動画の録画・録音・再配布は禁止です" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3]" style={{fontFamily: "'Zen Maru Gothic', sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Zen+Maru+Gothic:wght@300;400;500&display=swap'); .font-serif { font-family: 'Cormorant Garamond', serif; }`}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F3]/90 backdrop-blur border-b border-[#2B5F7A]/10 px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-serif text-[#2B5F7A] tracking-widest text-sm">BLOOM LINK</a>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Legal</span>
        <h1 className="font-serif text-[#2B5F7A] mt-4 mb-10" style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
          特定商取引法に基づく表記
        </h1>

        <div style={{borderTop: "1px solid #F0EBE0"}}>
          {items.map((item, i) => (
            <div key={i} style={{display: "grid", gridTemplateColumns: "160px 1fr", gap: "1.5rem", borderBottom: "1px solid #F0EBE0", padding: "1.2rem 0"}}>
              <p style={{fontSize: "0.78rem", color: "#2B5F7A", fontWeight: 500, paddingTop: "0.1rem"}}>{item.label}</p>
              <p style={{fontSize: "0.82rem", lineHeight: 2, color: "#5A6A74", whiteSpace: "pre-line"}}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-8 text-center" style={{background: "#2A3540"}}>
        <p className="font-serif tracking-widest mb-2" style={{color: "rgba(255,255,255,0.4)", fontSize: "0.85rem"}}>BLOOM LINK</p>
        <div className="flex justify-center gap-6 mb-3">
          {[["Home", "/"], ["プライバシーポリシー", "/privacy"], ["特定商取引法", "/tokutei"], ["お問い合わせ", "/contact"]].map(([label, href]) => (
            <a key={label} href={href} style={{fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", textDecoration: "none"}}>{label}</a>
          ))}
        </div>
        <p style={{color: "rgba(255,255,255,0.2)", fontSize: "0.68rem"}}>© 2026 BLOOM LINK. All rights reserved.</p>
      </footer>
    </div>
  );
}
