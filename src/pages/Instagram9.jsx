import { useEffect, useMemo, useState } from 'react'

import { CANVAS, CARD_CSS, cardHTML, TOKENS } from '../instagram9/card'
import { hashtagsBase, hashtagsByPost, posts, SERIES_TAGLINE } from '../instagram9/posts'

/**
 * /instagram9 — 最初の9投稿の制作確認画面。
 *
 * 表紙のデザインは src/instagram9/card.js、文言は src/instagram9/posts.js。
 * この画面はそれを並べて見るためのもので、独自のデザインは持たない。
 * ここで見えているものが、そのまま書き出されるPNGになる。
 */

const INK = '#3A4754'
const PAPER = '#F2EFE8'

/** 1080×1350 の実寸カードを、指定した幅に縮めて置く */
function Card({ post, width }) {
  const scale = width / CANVAS.w
  return (
    <div style={{ width, height: CANVAS.h * scale, overflow: 'hidden' }}>
      <div
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
        dangerouslySetInnerHTML={{ __html: cardHTML(post) }}
      />
    </div>
  )
}

/** 3×3に並べる。list の順番でそのまま置く。 */
function Grid({ list, width }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(3, ${width}px)`,
        gap: 4,
        justifyContent: 'start',
        background: '#fff',
        width: 'max-content',
        boxShadow: '0 2px 30px rgba(43,95,122,0.09)',
      }}
    >
      {list.map(p => (
        <Card key={p.no} post={p} width={width} />
      ))}
    </div>
  )
}

function CopyButton({ text, label }) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1600)
    } catch {
      setDone(false)
    }
  }

  return (
    <button
      onClick={copy}
      style={{
        fontFamily: 'inherit',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        padding: '0.5rem 1.1rem',
        borderRadius: 100,
        border: `1px solid ${done ? TOKENS.gold : 'rgba(43,95,122,0.3)'}`,
        background: 'transparent',
        color: done ? TOKENS.gold : TOKENS.navy,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {done ? 'コピーしました' : label}
    </button>
  )
}

export default function Instagram9() {
  const [gridWidth, setGridWidth] = useState(340)

  useEffect(() => {
    const fit = () => setGridWidth(Math.min(340, (window.innerWidth - 96) / 3))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const captions = useMemo(
    () =>
      Object.fromEntries(
        posts.map(p => [
          p.no,
          // 投稿ごとの hashtags があればそれを使い、無ければ共通＋個別を組み立てる
          `${p.caption}\n\n${p.hashtags ?? [...hashtagsBase, ...(hashtagsByPost[p.no] ?? [])].join(' ')}`,
        ])
      ),
    []
  )

  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, background: PAPER, color: INK, minHeight: '100vh' }}>
      {/*
        表紙で使うフォントは、書き出しと同じローカルのサブセットを先に読む。
        画面とPNGで字形がずれないようにするため。CDN側は本文キャプション用。
      */}
      <style>{`
        @import url('/instagram/fonts/fonts.css');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Noto+Sans+JP:wght@300;400&family=Noto+Serif+JP:wght@300&display=swap');
        ${CARD_CSS}
      `}</style>

      {/* HEADER */}
      <header style={{ padding: '5rem 3rem 3rem', maxWidth: 1180, margin: '0 auto' }}>
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.3em', color: TOKENS.gold }}>
          INSTAGRAM · FIRST 9 POSTS
        </p>
        <h1
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: 300,
            fontSize: 'clamp(1.7rem, 4vw, 2.6rem)',
            color: TOKENS.navy,
            margin: '1.2rem 0 1rem',
          }}
        >
          {SERIES_TAGLINE}
        </h1>
        <p style={{ fontSize: '0.82rem', lineHeight: 2.1, color: '#7B8B99', maxWidth: 560 }}>
          01から09までを、独立した投稿ではなく一本の物語として設計しています。
          9枚を並べた状態そのものが、ひとつの作品です。
        </p>
      </header>

      {/* 9枚グリッド — 実際の並びと、物語の順の2つ */}
      <section style={{ padding: '0 3rem 4rem', maxWidth: 1180, margin: '0 auto' }}>
        <SectionLabel>プロフィール画面での実際の見え方</SectionLabel>
        <p style={{ fontSize: '0.76rem', lineHeight: 2, color: '#7B8B99', marginTop: '-0.8rem', marginBottom: '1.6rem', maxWidth: 620 }}>
          Instagramは新しい投稿が左上に来ます。01から順に投稿すると、
          グリッドでは09が左上、01が右下になります。<strong style={{ fontWeight: 400 }}>投稿前に見るのはこちら。</strong>
        </p>
        <Grid list={[...posts].reverse()} width={gridWidth} />

        <div style={{ height: '3.5rem' }} />

        <SectionLabel>物語の順（01 → 09）</SectionLabel>
        <p style={{ fontSize: '0.76rem', lineHeight: 2, color: '#7B8B99', marginTop: '-0.8rem', marginBottom: '1.6rem', maxWidth: 620 }}>
          設計を確認するための並び。写真の型（額装・帯・3枚組・写真なし）が
          縦にも横にも隣り合わないよう配置しています。1枚直したら、ここへ戻って全体を見る。
        </p>
        <Grid list={posts} width={gridWidth} />
      </section>

      {/* 1枚ずつ */}
      <section style={{ padding: '0 3rem 6rem', maxWidth: 1180, margin: '0 auto' }}>
        <SectionLabel>1枚ずつ — 表紙と本文</SectionLabel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {posts.map(p => (
            <article
              key={p.no}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 320px) minmax(0, 1fr)',
                gap: '2.5rem',
                background: '#fff',
                padding: '2rem',
                borderRadius: 4,
                boxShadow: '0 2px 20px rgba(43,95,122,0.07)',
                alignItems: 'start',
              }}
            >
              <Card post={p} width={320} />

              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: TOKENS.gold, marginBottom: '0.9rem' }}>
                  {p.no} · {p.category}
                </p>

                <Meta label="役割">{p.role}</Meta>
                <Meta label="写真">{p.photoNote}</Meta>
                <Meta label="使用素材">
                  {p.photos.length ? p.photos.join(' / ') : '写真なし（タイポグラフィのみ）'}
                </Meta>

                <div style={{ margin: '1.6rem 0 1rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <CopyButton text={captions[p.no]} label="本文をコピー" />
                  <a
                    href={`/instagram/${p.no}.png`}
                    download
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      padding: '0.5rem 1.1rem',
                      borderRadius: 100,
                      border: '1px solid rgba(43,95,122,0.3)',
                      color: TOKENS.navy,
                      textDecoration: 'none',
                    }}
                  >
                    PNGを開く
                  </a>
                </div>

                <pre
                  style={{
                    fontFamily: 'inherit',
                    fontSize: '0.78rem',
                    lineHeight: 2.1,
                    color: '#5A6B7A',
                    whiteSpace: 'pre-wrap',
                    background: '#FBFAF7',
                    padding: '1.4rem',
                    borderRadius: 3,
                    borderLeft: `2px solid ${TOKENS.line}`,
                  }}
                >
                  {captions[p.no]}
                </pre>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ padding: '2.5rem 3rem 4rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#9AA9B5' }}>
          デザイン定義 src/instagram9/card.js ／ 文言 src/instagram9/posts.js ／
          書き出し node scripts/render-instagram9.mjs
        </p>
      </footer>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ marginBottom: '1.6rem' }}>
      <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', color: TOKENS.navy }}>{children}</p>
      <div style={{ width: 30, height: 1, background: TOKENS.gold, marginTop: '0.8rem' }} />
    </div>
  )
}

function Meta({ label, children }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.6rem' }}>
      <span style={{ fontSize: '0.68rem', letterSpacing: '0.1em', color: '#9AA9B5', minWidth: 56, paddingTop: '0.15rem' }}>
        {label}
      </span>
      <span style={{ fontSize: '0.76rem', lineHeight: 1.9, color: '#5A6B7A' }}>{children}</span>
    </div>
  )
}
