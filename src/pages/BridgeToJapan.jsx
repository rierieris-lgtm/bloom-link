import { useEffect, useRef, useState } from "react";

const COLORS = {
  bg: "#FAF9F6",
  text: "#2F2F2F",
  accent: "#2F5D62",
  gold: "#C7A86D",
  lightGray: "#EAE7E2",
};

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(1.02)",
        transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

const SERVICES = [
  {
    title: "Japan Market Strategy",
    desc: "Understand your positioning for Japanese customers.",
  },
  {
    title: "Customer Journey Design",
    desc: "Landing pages, messaging, consultation flow, sales journey.",
  },
  {
    title: "AI × Localization",
    desc: "Use AI efficiently while maintaining a human-centered experience.",
  },
  {
    title: "Project Management",
    desc: "Support communication between overseas businesses and Japanese partners.",
  },
];

const PROCESS = ["Discover", "Understand", "Design", "Launch", "Improve"];

const CASE_STUDIES = [
  { name: "Trevor Project", category: "Nonprofit / Advocacy", seed: "case-trevor" },
  { name: "AI Education", category: "EdTech", seed: "case-ai-education" },
  { name: "Business Support", category: "Consulting", seed: "case-business" },
  { name: "Online Community", category: "Membership", seed: "case-community" },
];

const STATS = [
  { value: "22+", label: "Years Experience" },
  { value: "40+", label: "Business Projects" },
  { value: "Global", label: "Company Executive Support" },
  { value: "AI", label: "Workflow Business Design" },
];

function img(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export default function BridgeToJapan() {
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowStickyCta(window.scrollY > window.innerHeight * 0.7);
      setNavSolid(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500;600&family=Manrope:wght@300;400;500&family=Shippori+Mincho:wght@400;500&family=Noto+Sans+JP:wght@300;400;500&display=swap');
        .btj-display { font-family: 'Playfair Display', serif; }
        .btj-serif { font-family: 'Cormorant Garamond', serif; }
        .btj-jp { font-family: 'Shippori Mincho', serif; }
        @keyframes btjSlowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        .btj-img-zoom {
          animation: btjSlowZoom 24s ease-in-out infinite alternate;
        }
      `}</style>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-colors duration-500"
        style={{
          background: navSolid ? "rgba(250,249,246,0.92)" : "transparent",
          backdropFilter: navSolid ? "blur(8px)" : "none",
          borderBottom: navSolid ? `1px solid ${COLORS.lightGray}` : "1px solid transparent",
        }}
      >
        <a href="/bridge-to-japan" className="btj-serif tracking-widest text-sm" style={{ color: COLORS.accent }}>
          BLOOM LINK <span style={{ color: COLORS.gold }}>/</span> Bridge to Japan
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-xs tracking-widest uppercase" style={{ color: COLORS.text, opacity: 0.7 }}>Services</a>
          <a href="#process" className="text-xs tracking-widest uppercase" style={{ color: COLORS.text, opacity: 0.7 }}>Process</a>
          <a href="#cases" className="text-xs tracking-widest uppercase" style={{ color: COLORS.text, opacity: 0.7 }}>Case Studies</a>
          <a href="#cta"
            className="text-xs tracking-widest uppercase px-6 py-2.5 rounded-full transition-transform hover:-translate-y-0.5"
            style={{ background: COLORS.accent, color: "#fff" }}>
            Book a Call
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 md:px-10 pt-28 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center w-full">
          <Reveal>
            <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: COLORS.gold }}>
              Bridge to Japan
            </p>
            <p className="btj-jp text-sm mb-4" style={{ color: COLORS.accent, opacity: 0.7 }}>
              日本市場への架け橋
            </p>
            <h1
              className="btj-display leading-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 500, color: COLORS.accent }}
            >
              Build trust before business.
            </h1>
            <p className="leading-loose mb-2" style={{ fontSize: "0.95rem", color: COLORS.text, opacity: 0.75, lineHeight: 2 }}>
              Helping global businesses communicate with Japanese customers through culture, strategy, and human connection.
            </p>
            <p className="leading-loose mb-1" style={{ fontSize: "0.95rem", color: COLORS.text, opacity: 0.6 }}>
              We don't just translate words.
            </p>
            <p className="leading-loose mb-10" style={{ fontSize: "0.95rem", fontWeight: 500, color: COLORS.accent }}>
              We help your business feel natural in Japan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#cta"
                className="inline-block text-center text-xs tracking-widest uppercase px-9 py-4 rounded-full transition-transform hover:-translate-y-0.5"
                style={{ background: COLORS.accent, color: "#fff" }}>
                Book a Discovery Call
              </a>
              <a href="#services"
                className="inline-block text-center text-xs tracking-widest uppercase px-9 py-4 rounded-full transition-transform hover:-translate-y-0.5"
                style={{ border: `1px solid ${COLORS.accent}`, color: COLORS.accent }}>
                View Services
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-sm" style={{ boxShadow: "0 20px 60px rgba(47,93,98,0.15)" }}>
              <img
                src={img("bridge-hero-garden", 900, 1100)}
                alt="Quiet Japanese garden in natural light"
                className="btj-img-zoom w-full h-full object-cover"
                style={{ aspectRatio: "9 / 11" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — TRANSLATION VS COMMUNICATION */}
      <section className="py-28 px-6 md:px-10" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2
              className="btj-display text-center mb-16 leading-snug"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: COLORS.accent }}
            >
              Entering Japan is more than translation.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="p-9 rounded-sm h-full" style={{ background: COLORS.lightGray }}>
                <p className="text-xs tracking-widest uppercase mb-6" style={{ color: COLORS.text, opacity: 0.5 }}>
                  Translation
                </p>
                <ul className="space-y-4">
                  {["Translate words", "Literal meaning", "AI can do this"].map((item) => (
                    <li key={item} className="flex items-start gap-3" style={{ fontSize: "0.92rem", color: COLORS.text, opacity: 0.75 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.text, opacity: 0.4, marginTop: "0.5rem", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-9 rounded-sm h-full" style={{ background: COLORS.accent }}>
                <p className="text-xs tracking-widest uppercase mb-6" style={{ color: COLORS.gold }}>
                  Communication
                </p>
                <ul className="space-y-4">
                  {["Understand Japanese customers", "Build trust", "Adapt your message", "Create local relationships"].map((item) => (
                    <li key={item} className="flex items-start gap-3" style={{ fontSize: "0.92rem", color: "#fff", opacity: 0.9 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.gold, marginTop: "0.5rem", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="text-center mt-16">
              <p className="btj-serif" style={{ fontSize: "1.3rem", fontStyle: "italic", color: COLORS.text, opacity: 0.6 }}>
                Translation changes language.
              </p>
              <p className="btj-serif mt-2" style={{ fontSize: "1.3rem", fontStyle: "italic", color: COLORS.accent }}>
                Communication changes understanding.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — SERVICES */}
      <section id="services" className="py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-center mb-4" style={{ color: COLORS.gold }}>Services</p>
            <h2 className="btj-display text-center mb-16" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: COLORS.accent }}>
              How we build the bridge.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="p-9 rounded-sm h-full transition-transform hover:-translate-y-1"
                  style={{ background: "#fff", border: `1px solid ${COLORS.lightGray}` }}>
                  <p className="btj-serif mb-4" style={{ fontSize: "1.15rem", color: COLORS.accent, fontWeight: 500 }}>
                    {s.title}
                  </p>
                  <p style={{ fontSize: "0.88rem", color: COLORS.text, opacity: 0.7, lineHeight: 1.9 }}>
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY WORK WITH ME */}
      <section className="py-28 px-6 md:px-10" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="overflow-hidden rounded-sm" style={{ boxShadow: "0 20px 60px rgba(47,93,98,0.12)" }}>
              <img
                src={img("bridge-workspace", 900, 1000)}
                alt="Working on a laptop with notes, quiet focused workspace"
                className="btj-img-zoom w-full h-full object-cover"
                style={{ aspectRatio: "9 / 10" }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: COLORS.gold }}>Why Work With Me</p>
            <h2 className="btj-display mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: COLORS.accent }}>
              Your partner in understanding Japan.
            </h2>
            <div className="space-y-4 mb-10" style={{ fontSize: "0.92rem", color: COLORS.text, opacity: 0.75, lineHeight: 2 }}>
              <p>More than 22 years supporting executives in a global company.</p>
              <p>Experience in executive assistance, risk management, AI workflow design, business operations, education, and entrepreneurship.</p>
              <p>I combine Japanese business culture with practical execution.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="btj-display" style={{ fontSize: "2.2rem", color: COLORS.accent, fontWeight: 500 }}>{stat.value}</p>
                  <p className="text-xs tracking-wider uppercase mt-1" style={{ color: COLORS.text, opacity: 0.55 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — PROCESS */}
      <section id="process" className="py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-center mb-4" style={{ color: COLORS.gold }}>Process</p>
            <h2 className="btj-display text-center mb-20" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: COLORS.accent }}>
              A calm, deliberate path forward.
            </h2>
          </Reveal>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-2">
            {PROCESS.map((step, i) => (
              <Reveal key={step} delay={i * 0.08} className="flex flex-col md:flex-row items-center flex-1">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="flex items-center justify-center rounded-full mb-4"
                    style={{ width: 56, height: 56, border: `1px solid ${COLORS.accent}` }}
                  >
                    <span className="btj-serif" style={{ color: COLORS.accent, fontSize: "1.1rem" }}>{i + 1}</span>
                  </div>
                  <p className="text-xs tracking-widest uppercase" style={{ color: COLORS.text, opacity: 0.75 }}>{step}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block flex-1 mx-2" style={{ height: 1, background: COLORS.lightGray, marginTop: 28 }} />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — CASE STUDIES */}
      <section id="cases" className="py-28 px-6 md:px-10" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-center mb-4" style={{ color: COLORS.gold }}>Case Studies</p>
            <h2 className="btj-display text-center mb-16" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: COLORS.accent }}>
              Selected work.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <div className="overflow-hidden rounded-sm group" style={{ border: `1px solid ${COLORS.lightGray}` }}>
                  <div className="overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                    <img
                      src={img(c.seed, 800, 500)}
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6" style={{ background: COLORS.bg }}>
                    <p className="text-xs tracking-widest uppercase mb-2" style={{ color: COLORS.gold }}>{c.category}</p>
                    <p className="btj-serif" style={{ fontSize: "1.1rem", color: COLORS.accent, fontWeight: 500 }}>{c.name}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — PHILOSOPHY */}
      <section className="relative py-40 px-6 md:px-10 flex items-center justify-center text-center overflow-hidden">
        <img
          src={img("bridge-philosophy-garden", 1800, 1200)}
          alt="A quiet Japanese garden"
          className="absolute inset-0 w-full h-full object-cover btj-img-zoom"
        />
        <div className="absolute inset-0" style={{ background: "rgba(47,93,98,0.55)" }} />
        <Reveal className="relative max-w-2xl">
          <p className="btj-display leading-relaxed" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.3rem)", fontWeight: 500, color: "#fff" }}>
            Business grows through trust.<br />
            Trust grows through understanding.<br />
            Understanding begins with culture.
          </p>
        </Reveal>
      </section>

      {/* LAST CTA */}
      <section id="cta" className="py-32 px-6 md:px-10 text-center" style={{ background: COLORS.accent }}>
        <Reveal>
          <h2 className="btj-display leading-snug mb-10" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 500, color: "#fff" }}>
            Let's build your bridge to Japan.
          </h2>
          <a href="https://cal.com/" target="_blank" rel="noreferrer"
            className="inline-block text-xs tracking-widest uppercase px-10 py-4 rounded-full transition-transform hover:-translate-y-0.5"
            style={{ background: COLORS.gold, color: COLORS.accent }}>
            Schedule a Call
          </a>
        </Reveal>
      </section>

      {/* STICKY CTA */}
      <a
        href="#cta"
        className="fixed bottom-6 right-6 z-40 text-xs tracking-widest uppercase px-6 py-3.5 rounded-full shadow-lg transition-all duration-500"
        style={{
          background: COLORS.accent,
          color: "#fff",
          opacity: showStickyCta ? 1 : 0,
          transform: showStickyCta ? "translateY(0)" : "translateY(16px)",
          pointerEvents: showStickyCta ? "auto" : "none",
          boxShadow: "0 8px 24px rgba(47,93,98,0.3)",
        }}
      >
        Book a Call
      </a>

      {/* FOOTER */}
      <footer className="py-14 px-6 text-center" style={{ background: "#232323" }}>
        <p className="btj-serif tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem" }}>
          Bloom Link
        </p>
        <p className="text-xs tracking-widest uppercase mb-8" style={{ color: COLORS.gold }}>
          Bridge to Japan
        </p>
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {[
            ["Email", "mailto:hello@bloom-link.jp"],
            ["LinkedIn", "https://www.linkedin.com"],
            ["Instagram", "https://www.instagram.com"],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textDecoration: "none" }}>
              {label}
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {[
            ["Home", "/"],
            ["Privacy Policy", "/privacy"],
            ["Legal Notice", "/tokutei"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <a key={label} href={href}
              style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
              {label}
            </a>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.68rem" }}>
          © 2026 Bloom Link. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
