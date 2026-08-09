/**
 * 9投稿の表紙テンプレート（1080 × 1350 / 4:5）
 *
 * ここが唯一の定義。プレビュー画面（/instagram9）とPNG書き出し
 * （scripts/render-instagram9.mjs）は、どちらもこのファイルを読む。
 * 片方だけ直す、ということが起きないようにしている。
 *
 * ── 01で確定させ、02〜09で固定するルール ──────────────
 *   キャンバス     1080 × 1350
 *   余白           左右90 / 上下96
 *   番号           上左（Cormorant 34px / トラッキング .18em）
 *   カテゴリー     番号の下。英字は小さく、1枚に1つだけ
 *   コピー         下寄せ（全変型共通）／明朝・ウエイト300
 *   フッター       シリーズの一文を小さく
 *   色             IVORY / WHITE / NAVY / CHARCOAL ＋ くすみゴールド少量
 *   写真           暗くしない。元の色を活かす。文字は明るいアイボリー面の上に置く
 * ─────────────────────────────────────────────
 *
 * レイアウトは絶対座標ではなく縦のフレックスで組んである。
 * コピーの行数を増やしても、写真と文字が重ならずに写真側が縮む。
 */

export const CANVAS = { w: 1080, h: 1350 }

export const TOKENS = {
  ivory: '#FAF8F3',
  white: '#FFFFFF',
  navy: '#2B5F7A',
  charcoal: '#3A4754',
  muted: '#6E8090',
  faint: '#94A3AF',
  gold: '#C9A96E',
  line: 'rgba(43,95,122,0.14)',
  marginX: 90,
  marginY: 96,
}

/** 写真は暗くしない。わずかに明るさと彩度を整えるだけ。 */
const PHOTO_FILTER = 'saturate(1.04) brightness(1.03)'

/** ヘッダー（番号＋罫線＋カテゴリー）の高さ。 */
const HEAD_H = 100
const MEDIA_TOP = 46
const MEDIA_BOTTOM = 52

export const CARD_CSS = `
.ig-card {
  position: relative;
  width: ${CANVAS.w}px;
  height: ${CANVAS.h}px;
  overflow: hidden;
  background: ${TOKENS.ivory};
  color: ${TOKENS.navy};
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
.ig-card *, .ig-card *::before, .ig-card *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* Cormorant は既定が古典数字で「01」が「oI」に見えてしまうので、必ずライニング数字にする */
.ig-latin {
  font-family: 'Cormorant Garamond', serif;
  font-variant-numeric: lining-nums;
  font-feature-settings: 'lnum' 1, 'onum' 0;
}

.ig-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: ${PHOTO_FILTER}; }

/* 写真全面の型。背面に敷いて、文字はこの上のアイボリー面に置く */
.ig-bleed { position: absolute; inset: 0; z-index: 0; }

/*
 * 文字を載せるための面。暗いフィルター＋白文字ではなく、
 * 明るいアイボリーを重ねて紺文字を読ませる（絶対ルール7）。
 */
.ig-veil { position: absolute; left: 0; right: 0; z-index: 1; pointer-events: none; }
/* ヘッダーがちょうど収まる高さ。ここを削るとカテゴリー名が写真に埋もれる。 */
.ig-veil-top { top: 0; height: 212px; background: ${TOKENS.ivory}; }
.ig-veil-top-fade {
  top: 212px; height: 130px;
  background: linear-gradient(to bottom, ${TOKENS.ivory} 0%, rgba(250,248,243,0) 100%);
}
.ig-veil-bottom { bottom: 0; background: ${TOKENS.ivory}; }
.ig-veil-bottom-fade { height: 150px; background: linear-gradient(to top, ${TOKENS.ivory} 0%, rgba(250,248,243,0) 100%); }

.ig-stack {
  position: relative; z-index: 2;
  display: flex; flex-direction: column;
  height: 100%; padding: ${TOKENS.marginY}px ${TOKENS.marginX}px;
}

.ig-head { flex: none; height: ${HEAD_H}px; }
.ig-no { font-weight: 300; font-size: 34px; line-height: 1; letter-spacing: 0.18em; color: ${TOKENS.navy}; }
.ig-rule { width: 44px; height: 1px; background: ${TOKENS.gold}; margin: 22px 0 18px; }
.ig-cat { font-size: 17px; font-weight: 400; letter-spacing: 0.34em; color: ${TOKENS.faint}; }

/* 写真・数字・余白が入る可変の領域。コピーが長い回は自動でここが縮む */
.ig-media { position: relative; flex: 1 1 auto; min-height: 0; margin: ${MEDIA_TOP}px 0 ${MEDIA_BOTTOM}px; }
.ig-media--framed { overflow: hidden; }
/* 左右いっぱいの帯。ヘッダーの下から始めるので、番号が写真に隠れない */
.ig-media--band { overflow: hidden; margin: ${MEDIA_TOP}px -${TOKENS.marginX}px ${MEDIA_BOTTOM}px; }

.ig-body { flex: none; }
.ig-headline {
  font-family: 'Noto Serif JP', serif; font-weight: 300;
  line-height: 1.5; letter-spacing: 0.02em; color: ${TOKENS.navy};
}
.ig-sub {
  margin-top: 28px; font-size: 25px; font-weight: 300;
  line-height: 1.9; letter-spacing: 0.04em; color: ${TOKENS.muted};
}

.ig-foot {
  flex: none; margin-top: 60px;
  display: flex; align-items: center; justify-content: space-between;
}
.ig-foot-tag { font-size: 20px; font-weight: 300; letter-spacing: 0.1em; color: rgba(58,71,84,0.5); }
.ig-foot-mark { font-weight: 400; font-size: 19px; letter-spacing: 0.3em; color: ${TOKENS.gold}; }

/* 08 — 数字を主役にする型 */
.ig-stat { position: absolute; left: 0; right: 0; bottom: 0; }
.ig-stat-row { display: flex; align-items: baseline; gap: 18px; }
.ig-stat-value { font-weight: 300; font-size: 250px; line-height: 0.82; letter-spacing: 0.01em; color: ${TOKENS.gold}; }
.ig-stat-unit { font-family: 'Noto Serif JP', serif; font-weight: 300; font-size: 46px; color: ${TOKENS.navy}; }
.ig-stat-label {
  margin-top: 26px; padding-top: 22px; border-top: 1px solid ${TOKENS.line};
  font-size: 21px; letter-spacing: 0.08em; color: ${TOKENS.faint};
}

/* 02・04 — 写真を使わない回の、控えめな区切り */
.ig-hair { position: absolute; left: 0; bottom: 0; width: 120px; height: 1px; background: ${TOKENS.line}; }

/* 05 — AIに渡す前に決める5つ。写真ではなく、順序そのものを見せる */
.ig-steps { position: absolute; left: 0; right: 0; bottom: 0; }
.ig-step {
  display: flex; align-items: baseline; gap: 22px;
  padding: 19px 0; border-top: 1px solid ${TOKENS.line};
  font-size: 27px; font-weight: 300; letter-spacing: 0.04em; color: ${TOKENS.charcoal};
}
.ig-step:last-child { border-bottom: 1px solid ${TOKENS.line}; }
.ig-step-no { font-weight: 400; font-size: 19px; letter-spacing: 0.12em; color: ${TOKENS.gold}; }

/* 09 — 01から09までを閉じるインデックス */
.ig-index { display: flex; gap: 20px; }
.ig-index span { font-weight: 300; font-size: 20px; letter-spacing: 0.12em; color: rgba(43,95,122,0.3); }
.ig-index span.on { color: ${TOKENS.gold}; }
`

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const img = (base, file, style = '') =>
  `<img class="ig-photo" src="${base}/travel/${file}" style="${style}" alt="" />`

const head = p => `
    <div class="ig-head">
      <div class="ig-no ig-latin">${esc(p.no)}</div>
      <div class="ig-rule"></div>
      <div class="ig-cat">${esc(p.category)}</div>
    </div>`

/**
 * コピーは全変型で下寄せ。これが9枚を1つの作品に見せる一番の要素なので、
 * 変型ごとに上寄せ・中央寄せへ変えない。
 */
const body = p => `
    <div class="ig-body">
      <div class="ig-headline" style="font-size:${p.headlineSize}px">
        ${p.headline.map(l => `<div>${esc(l)}</div>`).join('\n        ')}
      </div>
      ${p.sub ? `<div class="ig-sub">${esc(p.sub)}</div>` : ''}
    </div>`

const foot = p =>
  p.variant === 'finale'
    ? // 09はコピー自体がシリーズの一文なので、フッターで繰り返さない
      `<div class="ig-foot">
      <div class="ig-index ig-latin">${['01', '02', '03', '04', '05', '06', '07', '08', '09']
        .map(n => `<span class="${n === p.no ? 'on' : ''}">${n}</span>`)
        .join('')}</div>
      <div class="ig-foot-mark ig-latin">BLOOM LINK</div>
    </div>`
    : `<div class="ig-foot">
      <div class="ig-foot-tag">仕事を軽くして、人生を広げる。</div>
      <div class="ig-foot-mark ig-latin">BLOOM LINK</div>
    </div>`

/**
 * 各変型は「背面レイヤー」と「メディア領域の中身」だけを返す。
 * ヘッダー・コピー・フッターの位置は全変型で共通。
 */
const VARIANTS = {
  /** アイボリー地に写真を額装する。余白そのものをデザインにする型。 */
  frame: (p, base) => ({
    mediaClass: 'ig-media--framed',
    media: img(base, p.photos[0]),
  }),

  /** 写真なし。タイポグラフィだけで持たせる型。 */
  ivory: () => ({ media: '<div class="ig-hair"></div>' }),

  /** 写真全面。暗い加工はせず、明るいアイボリー面を上下に重ねて文字を置く。 */
  photoFull: (p, base) => ({
    behind: `
    <div class="ig-bleed">${img(base, p.photos[0])}</div>
    <div class="ig-veil ig-veil-top"></div>
    <div class="ig-veil ig-veil-top-fade"></div>`,
    veilBottom: 'fade',
  }),

  /** 左右いっぱいの写真の帯。額装（frame）との対比でリズムをつくる。 */
  split: (p, base) => ({
    mediaClass: 'ig-media--band',
    media: img(base, p.photos[0]),
  }),

  /** 3地域を並べ、「世界へ広がっている」ことを1枚で見せる。 */
  mosaic: (p, base) => ({
    mediaClass: 'ig-media--band',
    media: `<div style="position:absolute;inset:0;display:flex;gap:3px">
        ${p.photos
          .slice(0, 3)
          .map(f => `<div style="position:relative;flex:1">${img(base, f)}</div>`)
          .join('\n        ')}
      </div>`,
  }),

  /** AIに渡す前に決める5つ。写真を使わず、考える順序そのものを見せる。 */
  steps: p => ({
    media: `<div class="ig-steps">
        ${p.steps
          .map(
            (s, i) =>
              `<div class="ig-step"><span class="ig-step-no ig-latin">0${i + 1}</span><span>${esc(s)}</span></div>`
          )
          .join('\n        ')}
      </div>`,
  }),

  /** 数字を主役にする。ただし結論のコピーを必ず下に置く。 */
  stat: p => ({
    media: `<div class="ig-stat">
        <div class="ig-stat-row">
          <div class="ig-stat-value ig-latin">${esc(p.statValue)}</div>
          <div class="ig-stat-unit">${esc(p.statUnit)}</div>
        </div>
        <div class="ig-stat-label">${esc(p.statLabel)}</div>
      </div>`,
  }),

  /** 着地点。水平線の帯を浅くとり、下に大きく余白を残してコピーで閉じる。 */
  finale: (p, base) => ({
    mediaClass: 'ig-media--band',
    media: `<div style="position:absolute;top:0;left:0;right:0;height:430px">${img(base, p.photos[0])}</div>`,
    goldHair: true,
  }),
}

/**
 * 表紙1枚分のHTMLを返す。
 * @param {object} post posts.js の1件
 * @param {object} [opts]
 * @param {string} [opts.assetBase] 画像のベースパス（プレビューは '' / 書き出しは '.'）
 */
export function cardHTML(post, opts = {}) {
  const base = opts.assetBase ?? ''
  const build = VARIANTS[post.variant]
  if (!build) throw new Error(`unknown variant: ${post.variant}`)

  const v = build(post, base)

  // 写真全面の型は、下のコピーの分だけアイボリー面を立ち上げて読ませる。
  // 行数から必要な高さを出すので、コピーを増減しても文字が写真に埋もれない。
  const bodyH =
    post.headline.length * post.headlineSize * 1.5 + (post.sub ? 28 + 25 * 1.9 : 0) + 44 + 24
  const veilH = Math.round(bodyH + TOKENS.marginY + 40)

  return `<div class="ig-card" data-no="${esc(post.no)}">
    ${v.behind ?? ''}
    ${
      v.veilBottom === 'fade'
        ? `<div class="ig-veil ig-veil-bottom" style="height:${veilH}px"></div>
    <div class="ig-veil ig-veil-bottom-fade" style="bottom:${veilH}px"></div>`
        : ''
    }
    <div class="ig-stack">
      ${head(post)}
      <div class="ig-media ${v.mediaClass ?? ''}">
        ${v.media ?? ''}
        ${v.goldHair ? `<div class="ig-hair" style="left:${TOKENS.marginX}px;background:${TOKENS.gold}"></div>` : ''}
      </div>
      ${body(post)}
      ${foot(post)}
    </div>
  </div>`
}
