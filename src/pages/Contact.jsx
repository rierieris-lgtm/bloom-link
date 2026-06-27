import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const mailto = `mailto:rie@bloomlink-works.com?subject=${encodeURIComponent(form.subject || "お問い合わせ")}&body=${encodeURIComponent(`お名前: ${form.name}\nメール: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3]" style={{fontFamily: "'Zen Maru Gothic', sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Zen+Maru+Gothic:wght@300;400;500&display=swap'); .font-serif { font-family: 'Cormorant Garamond', serif; } input, textarea, select { outline: none; } input:focus, textarea:focus { border-color: #2B5F7A !important; }`}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F3]/90 backdrop-blur border-b border-[#2B5F7A]/10 px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-serif text-[#2B5F7A] tracking-widest text-sm">BLOOM LINK</a>
      </nav>

      <div className="max-w-lg mx-auto px-6 pt-32 pb-24">
        <span className="text-xs tracking-[0.3em] text-[#C4714A] uppercase">Contact</span>
        <h1 className="font-serif text-[#2B5F7A] mt-4 mb-4" style={{fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300}}>
          お問い合わせ
        </h1>
        <p style={{fontSize: "0.82rem", lineHeight: 2, color: "#7A8E9A", marginBottom: "2.5rem"}}>
          ご質問・ご相談はお気軽にどうぞ。<br />
          通常2〜3営業日以内にご返信いたします。
        </p>

        {sent ? (
          <div className="text-center py-12">
            <p className="font-serif text-[#2B5F7A]" style={{fontSize: "1.4rem", fontWeight: 300, marginBottom: "1rem"}}>
              ありがとうございます。
            </p>
            <p style={{fontSize: "0.82rem", color: "#7A8E9A", lineHeight: 2}}>
              メールアプリが開きます。<br />送信ボタンを押して送信してください。
            </p>
            <a href="/" className="inline-block mt-6 text-xs tracking-widest px-8 py-3 rounded-full text-white" style={{background: "#2B5F7A"}}>
              トップへ戻る
            </a>
          </div>
        ) : (
          <div className="space-y-5">
            {[
              { label: "お名前", name: "name", type: "input", placeholder: "山田 花子" },
              { label: "メールアドレス", name: "email", type: "input", placeholder: "example@email.com" },
              { label: "件名", name: "subject", type: "input", placeholder: "Blooming Gardenについて" },
            ].map((field) => (
              <div key={field.name}>
                <label style={{fontSize: "0.75rem", color: "#2B5F7A", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem"}}>
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  style={{width: "100%", padding: "0.8rem 1rem", border: "1px solid #E0D8CC", borderRadius: 4, fontSize: "0.85rem", background: "white", color: "#2A3540"}}
                />
              </div>
            ))}
            <div>
              <label style={{fontSize: "0.75rem", color: "#2B5F7A", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem"}}>
                メッセージ
              </label>
              <textarea
                name="message"
                placeholder="お問い合わせ内容をご記入ください"
                value={form.message}
                onChange={handleChange}
                rows={6}
                style={{width: "100%", padding: "0.8rem 1rem", border: "1px solid #E0D8CC", borderRadius: 4, fontSize: "0.85rem", background: "white", color: "#2A3540", resize: "vertical"}}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full text-white text-xs tracking-widest py-4 rounded-full transition-all hover:-translate-y-0.5"
              style={{background: "#2B5F7A"}}>
              送信する
            </button>
            <p style={{fontSize: "0.72rem", color: "#7A8E9A", textAlign: "center", lineHeight: 2}}>
              または直接メールでも承ります：<br />
              <a href="mailto:rie@bloomlink-works.com" style={{color: "#2B5F7A"}}>rie@bloomlink-works.com</a>
            </p>
          </div>
        )}
      </div>

      <footer className="py-8 text-center" style={{background: "#2A3540"}}>
        <p className="font-serif tracking-widest mb-2" style={{color: "rgba(255,255,255,0.4)", fontSize: "0.85rem"}}>BLOOM LINK</p>
        <div className="flex justify-center gap-6 mb-3 flex-wrap">
          {[["Home", "/"], ["プライバシーポリシー", "/privacy"], ["特定商取引法", "/tokutei"], ["お問い合わせ", "/contact"]].map(([label, href]) => (
            <a key={label} href={href} style={{fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", textDecoration: "none"}}>{label}</a>
          ))}
        </div>
        <p style={{color: "rgba(255,255,255,0.2)", fontSize: "0.68rem"}}>© 2026 BLOOM LINK. All rights reserved.</p>
      </footer>
    </div>
  );
}
