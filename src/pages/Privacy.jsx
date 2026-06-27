export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]" style={{fontFamily: "'Zen Maru Gothic', sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Zen+Maru+Gothic:wght@300;400;500&display=swap'); .font-serif { font-family: 'Cormorant Garamond', serif; }`}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F3]/90 backdrop-blur border-b border-[#2B5F7A]/10 px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-serif text-[#2B5F7A] tracking-widest text-sm">BLOOM LINK</a>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Privacy Policy</span>
        <h1 className="font-serif text-[#2B5F7A] mt-4 mb-10" style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
          プライバシーポリシー
        </h1>

        <div style={{fontSize: "0.85rem", lineHeight: 2.4, color: "#5A6A74"}}>
          <p style={{marginBottom: "2rem"}}>
            Bloom Link（以下「当サロン」）は、サービス運営にあたり取得した個人情報を適切に取り扱うため、以下の方針を定めます。会員・利用者の方が安心してご利用いただけるよう、丁寧な管理と運用に努めます。
          </p>

          {[
            {
              title: "1. 取得する情報",
              body: "当サロンは、講座の運営やサポート提供のため、以下のような情報を必要に応じて取得します。\n氏名、メールアドレス、住所、電話番号、SNSアカウント、決済に関する情報、アンケート回答、その他サービス提供に必要な情報。"
            },
            {
              title: "2. 利用目的",
              body: "取得した個人情報は、次の目的のために使用します。\n・講座・サービスの提供および運営\n・本人確認および連絡対応\n・受講管理、決済処理、サポート提供\n・サービス改善のための分析\n・新しいサービスや各種ご案内の送付（ご希望に応じて停止可）"
            },
            {
              title: "3. 第三者への提供",
              body: "取得した個人情報は、ご本人の同意がある場合、法令に基づく場合、またはサービス運営上必要な業務委託先へ契約のうえ提供する場合を除き、第三者に提供しません。"
            },
            {
              title: "4. 情報管理",
              body: "当サロンは、個人情報が外部に漏れたり、不正に利用されないよう、適切な管理体制を維持します。必要がなくなった情報は、適切な方法で破棄・削除します。"
            },
            {
              title: "5. 外部サービスの利用",
              body: "Zoom、Google、決済サービス等の外部ツールを利用する際、それぞれのサービスが定めるプライバシーポリシーに従って情報が処理される場合があります。"
            },
            {
              title: "6. 個人情報の開示・訂正・削除について",
              body: "ご本人から、個人情報の開示・訂正・利用停止などの請求があった場合、速やかに対応します。手続きは、当サロンのお問い合わせ窓口までご連絡ください。"
            },
            {
              title: "7. プライバシーポリシーの変更",
              body: "必要に応じて、本ポリシーの内容を変更することがあります。変更後の内容はサイト上で掲示し、掲示した時点から適用されます。"
            },
            {
              title: "8. お問い合わせ",
              body: "プライバシーに関するお問い合わせは、以下の窓口までお願いいたします。\n\nBloom Link\nメール：rie@bloomlink-works.com"
            },
          ].map((section, i) => (
            <div key={i} style={{marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #F0EBE0"}}>
              <h2 className="font-serif text-[#2B5F7A]" style={{fontSize: "1rem", fontWeight: 400, marginBottom: "0.8rem"}}>{section.title}</h2>
              <p style={{whiteSpace: "pre-line"}}>{section.body}</p>
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
