import { useState, useEffect } from 'react'

const FOREST = "#2B5F7A"
const TERRA = "#C4714A"
const ECRU = "#FAF8F3"

export default function Travel() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, background: ECRU, color: '#3A4754', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Noto+Sans+JP:wght@300;400&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '0.8rem 2rem' : '1.2rem 2rem',
        background: scrolled ? 'rgba(250,248,243,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(43,95,122,0.1)' : 'none',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'all 0.4s',
      }}>
        <a href="/" className="font-serif" style={{ fontSize: '1.2rem', letterSpacing: '0.15em', color: FOREST, textDecoration: 'none' }}>BLOOM LINK</a>
        <div className="hidden md:flex" style={{ gap: '2rem' }}>
          {[['ホーム', '/'], ['Blooming Garden', '/garden'], ['Compass', '/compass'], ['お問い合わせ', '/contact']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#5A7287', textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: FOREST, fontSize: '1.2rem', cursor: 'pointer' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(250,248,243,0.98)', zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          {[['ホーム', '/'], ['Blooming Garden', '/garden'], ['Compass', '/compass'], ['お問い合わせ', '/contact']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ fontSize: '1rem', letterSpacing: '0.15em', color: FOREST, textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '8rem 2rem 5rem', background: `linear-gradient(160deg, ${ECRU} 0%, #EEF4F8 100%)` }}>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: TERRA, textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>01 · Travel Advisory</span>
        <h1 className="font-serif reveal" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 300, color: FOREST, lineHeight: 1.3, marginBottom: '1.5rem' }}>
          旅は、観光じゃない。<br />
          <em style={{ fontStyle: 'italic', color: TERRA }}>人生を広げる体験だ。</em>
        </h1>
        <p className="reveal reveal-d1" style={{ fontSize: '0.88rem', lineHeight: 2.4, color: '#8A98A5', maxWidth: 480, marginBottom: '2.5rem' }}>
          40カ国以上を旅してきたRieが、あなたの旅をプランニング。<br />
          旅先での気づきが、自分を知るきっかけになる。
        </p>
        <a href="#services" className="reveal reveal-d2" style={{ display: 'inline-block', fontSize: '0.72rem', letterSpacing: '0.2em', padding: '0.9rem 2.5rem', borderRadius: 100, background: FOREST, color: 'white', textDecoration: 'none', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
          サービスを見る
        </a>
      </section>

      {/* WHAT RIE DELIVERS */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: TERRA, textTransform: 'uppercase' }}>Philosophy</span>
          <h2 className="font-serif reveal" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 300, color: FOREST, marginTop: '1rem', marginBottom: '1rem' }}>
            世界を知り、<em style={{ fontStyle: 'italic' }}>自分に還る</em>
          </h2>
          <div style={{ width: 30, height: 1, background: TERRA, marginBottom: '2rem' }} />
          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              { title: '今も幸せ。でも、もっと面白い景色を', desc: '不足感から頑張るのではなく、好奇心から人生を広げていく。そんな旅の入口をつくります。' },
              { title: '人生をもっと味わう', desc: '旅を味わう。出会いを味わう。違う文化を味わう。旅の後の振り返りが、自分を知る時間になる。' },
              { title: '外に出て、内側を知る', desc: '新しい景色と価値観に出会うことで、自分が本当に大切にしていることが見えてくる。' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-d${i}`} style={{ padding: '1.5rem', borderLeft: `3px solid ${i === 0 ? FOREST : i === 1 ? TERRA : '#C9A96E'}`, paddingLeft: '1.5rem' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 400, color: FOREST, marginBottom: '0.5rem' }}>{item.title}</p>
                <p style={{ fontSize: '0.8rem', lineHeight: 2, color: '#8A98A5' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '6rem 2rem', background: ECRU }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: TERRA, textTransform: 'uppercase' }}>Services</span>
            <h2 className="font-serif reveal" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 300, color: FOREST, marginTop: '1rem' }}>
              あなたの旅に、合った入口から。
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              { tag: '旅アドバイス', title: '旅の相談・アドバイス', desc: 'どこへ行きたいか、何を求めているかから一緒に考えます。旅の目的を整理し、あなたに合った旅のスタイルを見つける伴走。', price: '無料相談' },
              { tag: '旅プランニング', title: '旅のプランニング', desc: 'ルート・宿・移動・体験。旅の全体像をプランニング。観光ガイドには載っていない、本質的な旅の設計をします。', price: '無料相談' },
              { tag: '海外体験', title: '海外体験サポート', desc: '初めての海外、英語が不安、一人では難しい。そんな方のための海外体験のサポート。準備から現地でのケアまで。', price: '無料相談' },
              { tag: '親子旅', title: '親子旅のプランニング', desc: '子どもと一緒に世界を見た経験を活かし、親子旅をプランニング。子どもにとって本物の体験になる旅を一緒に作ります。', price: '無料相談' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-d${i % 3}`} style={{ background: 'white', borderRadius: 8, padding: '2rem', boxShadow: '0 2px 16px rgba(43,95,122,0.07)' }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: FOREST, border: `1px solid ${FOREST}`, padding: '0.2rem 0.7rem', borderRadius: 100, opacity: 0.7 }}>{item.tag}</span>
                <h3 className="font-serif" style={{ fontSize: '1.05rem', fontWeight: 300, color: FOREST, margin: '1rem 0 0.8rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.78rem', lineHeight: 2, color: '#8A98A5', marginBottom: '1.2rem' }}>{item.desc}</p>
                <p style={{ fontSize: '0.72rem', color: TERRA, letterSpacing: '0.1em' }}>{item.price} →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFILE */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: TERRA, textTransform: 'uppercase' }}>Profile</span>
          <h2 className="font-serif reveal" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 300, color: FOREST, marginTop: '1rem', marginBottom: '2rem' }}>
            「世界を見て、<em style={{ fontStyle: 'italic' }}>自分に還る」</em><br />という旅。
          </h2>
          <div style={{ fontSize: '0.85rem', lineHeight: 2.8, color: '#8A98A5', marginBottom: '2.5rem' }}>
            <p style={{ marginBottom: '1.2rem' }}>10代のとき、オーストリアの女の子が我が家にホームステイに来た。あの日から、海外への扉が開いた。</p>
            <p>20代は、旅から戻ればすぐに仕事の日々。会社員を卒業してはじめて、旅の後の振り返りこそが大事な時間だとわかった。旅は、自分を知るための体験だった。</p>
          </div>
          <div style={{ borderTop: '1px solid #EDE8DF', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {[
              { era: '10代', text: 'オーストリアからのホームステイ。海外に目覚めたはじまり。' },
              { era: '20代', text: '旅に出ては、すぐ仕事へ。それでも世界に惹かれ続けた。' },
              { era: '子育て期', text: '子どもとの3週間の海外旅。親子で世界を見た経験。' },
              { era: '転機', text: '内観との出会い。自分の内側を見ることの大切さを知る。' },
              { era: '現在', text: '40カ国を旅し、「人生をもっと味わう」人の伴走者へ。' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-d${i % 3}`} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: TERRA, minWidth: 60, paddingTop: '0.15rem' }}>{item.era}</span>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.9, color: '#8A98A5' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: `linear-gradient(135deg, ${FOREST} 0%, #1E4A62 100%)` }}>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C9A96E', textTransform: 'uppercase' }}>Contact</span>
        <h2 className="font-serif reveal" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 300, color: 'white', marginTop: '1rem', marginBottom: '1rem' }}>
          まず、話してみませんか。
        </h2>
        <p className="reveal reveal-d1" style={{ fontSize: '0.85rem', lineHeight: 2.4, color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem' }}>
          どんな旅がしたいか、まだわからなくても大丈夫。<br />
          気になることをLINEで気軽に聞いてください。
        </p>
        <a href="https://lin.ee/6d68Aqd"
          className="reveal reveal-d2"
          style={{ display: 'inline-block', fontSize: '0.72rem', letterSpacing: '0.2em', padding: '1rem 3rem', borderRadius: 100, background: TERRA, color: 'white', textDecoration: 'none', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
          LINEで相談する
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2.5rem', textAlign: 'center', background: '#2A3540' }}>
        <p className="font-serif" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginBottom: '1rem' }}>BLOOM LINK</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[['Home', '/'], ['Blooming Garden', '/garden'], ['プライバシーポリシー', '/privacy'], ['お問い合わせ', '/contact']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.1em' }}>{label}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
