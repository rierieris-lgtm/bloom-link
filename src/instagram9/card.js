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

/** 罫線＋カテゴリーの塊と、コピーとの間隔。 */
const LABEL_GAP = 30
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

.ig-photo {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; object-position: var(--focus, 50% 50%);
  filter: ${PHOTO_FILTER};
}

/* 写真全面の型。背面に敷き、文字は下の明るい帯の上に置く */
.ig-bleed { position: absolute; inset: 0; z-index: 0; }
.ig-bleed--cols { display: flex; gap: 3px; }
.ig-bleed--cols > div { position: relative; flex: 1; }

/*
 * 文字を載せるための面。暗いフィルター＋白文字ではなく、
 * 明るいアイボリーを重ねて紺文字を読ませる（絶対ルール7）。
 */
.ig-veil { position: absolute; left: 0; right: 0; z-index: 1; pointer-events: none; }
.ig-veil-bottom { bottom: 0; background: ${TOKENS.ivory}; }
.ig-veil-bottom-fade { height: 110px; background: linear-gradient(to top, ${TOKENS.ivory} 0%, rgba(250,248,243,0) 100%); }
.ig-veil-top { top: 0; background: ${TOKENS.ivory}; }
.ig-veil-top-fade { height: 110px; background: linear-gradient(to bottom, ${TOKENS.ivory} 0%, rgba(250,248,243,0) 100%); }

.ig-stack {
  position: relative; z-index: 2;
  display: flex; flex-direction: column;
  height: 100%; padding: ${TOKENS.marginY}px ${TOKENS.marginX}px;
}
/* 帯が上にある型。文字を先に置き、余った下を写真に渡す */
.ig-stack--top { justify-content: flex-start; }

/*
 * 文字を浮かぶ箱に入れる型。写真が箱の左右と下にも残るので、
 * 帯の型と並べたときにリズムが出る。
 */
.ig-boxed {
  position: absolute; z-index: 2;
  left: ${TOKENS.marginX}px; right: ${TOKENS.marginX}px; bottom: ${TOKENS.marginY}px;
  background: ${TOKENS.ivory};
  padding: 56px 54px 50px;
}

/*
 * 罫線＋カテゴリー。写真を全面に使うため、上端ではなくコピーの直上に置く。
 * 上端に置くと写真の上に文字が乗り、読ませるために写真を暗くする必要が出てしまう。
 */
.ig-label { flex: none; margin-bottom: ${LABEL_GAP}px; }
.ig-no { font-weight: 300; font-size: 34px; line-height: 1; letter-spacing: 0.18em; color: ${TOKENS.navy}; margin-bottom: 22px; }
.ig-cat { font-size: 17px; font-weight: 400; letter-spacing: 0.34em; color: ${TOKENS.faint}; }

/* 見出しとサブの間に置く。この位置が投稿済みの01と揃っている。 */
.ig-rule { width: 300px; height: 1px; background: ${TOKENS.gold}; opacity: 0.75; margin: 28px 0 24px; }

/* 写真・数字・余白が入る可変の領域。コピーが長い回は自動でここが縮む */
.ig-media { position: relative; flex: 1 1 auto; min-height: 0; margin: ${MEDIA_TOP}px 0 ${MEDIA_BOTTOM}px; }

.ig-body { flex: none; }
.ig-headline {
  font-family: 'Noto Serif JP', serif; font-weight: 300;
  line-height: 1.5; letter-spacing: 0.02em; color: ${TOKENS.navy};
}
.ig-sub {
  font-size: 25px; font-weight: 300;
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

/* 04 — 構造を変える4手。順番そのものを図で見せる */
.ig-flow { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: flex-start; }
.ig-flow-step { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.ig-flow-icon { width: 46px; height: 46px; color: ${TOKENS.navy}; }
.ig-flow-icon svg { width: 100%; height: 100%; display: block; }
.ig-flow-label { font-size: 23px; font-weight: 300; letter-spacing: 0.06em; color: ${TOKENS.charcoal}; white-space: nowrap; }
.ig-flow-arrow { flex: none; width: 34px; margin-top: 22px; color: ${TOKENS.gold}; }
.ig-flow-arrow svg { width: 100%; display: block; }

/* 09 — 物語を自分の名前で閉じる */
.ig-sign {
  font-family: 'Italianno', 'Cormorant Garamond', cursive;
  font-weight: 400; font-size: 62px; line-height: 1; color: ${TOKENS.navy};
}
`

/** 04で使う線画アイコン。太らせず、細い線のまま置く。 */
const ICONS = {
  sort: '<line x1="3" y1="6.5" x2="21" y2="6.5"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="17.5" x2="9" y2="17.5"/>',
  stop: '<circle cx="12" cy="12" r="8.2"/><line x1="6.2" y1="17.8" x2="17.8" y2="6.2"/>',
  // 自分（塗り）から相手（線）へ渡す。他の3つと同じ視覚的な重さになるよう円で揃える。
  hand: '<circle cx="5.2" cy="12" r="3" fill="currentColor" stroke="none"/><circle cx="18.8" cy="12" r="3"/><line x1="9.6" y1="12" x2="14.2" y2="12"/><polyline points="12.6,10.3 14.3,12 12.6,13.7"/>',
  system:
    '<rect x="2.5" y="4" width="8" height="6.4" rx="1.6"/><rect x="13.5" y="13.6" width="8" height="6.4" rx="1.6"/><path d="M10.5 7.2 h4 a3 3 0 0 1 3 3 v3.4"/>',
}

const svg = paths =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * 写真1枚。
 *
 * 縦長のスマホ写真を横長の枠に入れると、被写体が枠の外へ出てしまうことがある。
 * focus（object-position）で、どこを残すかを投稿ごとに指定できるようにしている。
 */
const img = (base, file, { focus, style = '' } = {}) =>
  `<img class="ig-photo" src="${base}/travel/${file}"${
    focus ? ` style="--focus:${focus};${style}"` : style ? ` style="${style}"` : ''
  } alt="" />`

/**
 * 罫線＋カテゴリー。コピーの直上に置く。
 *
 * numbers を true にすると 01〜09 の番号も出る。既定は false。
 * Instagramのプロフィールは新しい投稿が左上に来るため、01から順に投稿すると
 * グリッド上では番号が逆順に並んでしまうので、既定では出さない。
 */
const label = (p, numbers) => `
    <div class="ig-label">
      ${numbers ? `<div class="ig-no ig-latin">${esc(p.no)}</div>` : ''}
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
      ${p.sub ? `<div class="ig-rule"></div>\n      <div class="ig-sub">${esc(p.sub)}</div>` : ''}
    </div>`

/**
 * フッター。
 *
 * 署名がある回（09）は、コピー自体がシリーズの一文なので繰り返さない。
 * 屋号の代わりに本人の署名を置いて物語を閉じる。
 */
const foot = p =>
  p.signature
    ? `<div class="ig-foot" style="justify-content:flex-end">
      <div class="ig-sign">${esc(p.signature)}</div>
    </div>`
    : `<div class="ig-foot">
      <div class="ig-foot-tag">仕事を軽くして、人生を広げる。</div>
      <div class="ig-foot-mark ig-latin">BLOOM LINK</div>
    </div>`

/**
 * 各変型は「背面レイヤー」と「可変領域の中身」だけを返す。
 * 罫線＋カテゴリー・コピー・フッターの位置は全変型で共通。
 */
const VARIANTS = {
  /**
   * 写真全面。写真は一切暗くせず、下に明るい帯を置いてその上に紺文字を読ませる。
   *
   * 白文字を写真に直接置く案は採らない。実際の写真で試すと、
   * 暗くしないと読めず、暗くすると写真の光が死ぬ。
   * 明るい帯なら、どの写真でも読めて色もそのまま残る。
   */
  bleed: (p, base, photoH) => ({
    behind: `<div class="ig-bleed" style="${p.place === 'top' ? 'top:auto' : 'bottom:auto'};height:${photoH}px">${img(base, p.photos[0], { focus: p.focus })}</div>`,
    band: true,
  }),

  /** 写真全面の3枚組。地域を並べて「世界へ広がっている」ことを1枚で見せる。 */
  bleedMosaic: (p, base, photoH) => ({
    behind: `<div class="ig-bleed ig-bleed--cols" style="${p.place === 'top' ? 'top:auto' : 'bottom:auto'};height:${photoH}px">
      ${p.photos
        .slice(0, 3)
        .map(f => `<div>${img(base, f, { focus: p.focusBy?.[f] })}</div>`)
        .join('\n      ')}
    </div>`,
    band: true,
  }),

  /** 写真なし。タイポグラフィと余白だけで持たせる型。 */
  ivory: () => ({}),

  /** 構造を変える4手。05の「問い」に対して、こちらは「動作」を横並びで見せる。 */
  flow: p => ({
    media: `<div class="ig-flow">
        ${p.flow
          .map(
            (s, i) =>
              `${i ? `<div class="ig-flow-arrow">${svg('<line x1="2" y1="12" x2="20" y2="12"/><polyline points="16,8.4 20,12 16,15.6"/>')}</div>` : ''}
        <div class="ig-flow-step">
          <div class="ig-flow-icon">${svg(ICONS[s.icon])}</div>
          <div class="ig-flow-label">${esc(s.label)}</div>
        </div>`
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

}

/**
 * 表紙1枚分のHTMLを返す。
 *
 * @param {object} post posts.js の1件
 * @param {object} [opts]
 * @param {string} [opts.assetBase] 画像のベースパス（プレビューは '' / 書き出しは '.'）
 * @param {boolean} [opts.numbers] 表紙に01〜09の番号を出すか（既定 false）
 *   Instagramのプロフィールは新しい投稿が左上に来るので、01から順に投稿すると
 *   グリッドでは 09 08 07 / 06 05 04 / 03 02 01 と番号が逆から並んでしまう。
 *   順番はキャプション冒頭の「01｜」で伝えることにして、表紙からは外した。
 */
export function cardHTML(post, opts = {}) {
  const base = opts.assetBase ?? ''
  const numbers = opts.numbers ?? false
  const build = VARIANTS[post.variant]
  if (!build) throw new Error(`unknown variant: ${post.variant}`)

  // 文字が占める高さ。行数から出すので、コピーを増減しても写真に埋もれない。
  const headlineH = post.headline.length * post.headlineSize * 1.5
  // サブの前に罫線が入る（28 + 罫線1 + 24 + 行の高さ）
  const subH = post.sub ? 28 + 1 + 24 + 25 * 1.9 : 0
  const labelH = (numbers ? 34 + 22 : 0) + 24 + LABEL_GAP
  const footH = 60 + 24
  const bandH = Math.round(TOKENS.marginY + footH + subH + headlineH + labelH + 34)

  /**
   * 文字をどこに置くか。写真の被写体がどこにいるかで選ぶ。
   *   bottom … 下に帯（被写体が上寄りの写真）
   *   top    … 上に帯（被写体が下寄りの写真）
   *   box    … 浮かぶ箱（縦位置で余白のある写真）
   */
  const place = post.place ?? 'bottom'

  // 写真は帯の外側だけを埋める高さで置く。キャンバス全面にすると、
  // 横位置の写真が上下で大きく切れ、拡大率も上がってしまう。
  const photoH = place === 'box' ? CANVAS.h : CANVAS.h - bandH
  const v = build(post, base, photoH)

  const content = `${label(post, numbers)}
      ${body(post)}
      ${foot(post)}`

  if (place === 'box') {
    return `<div class="ig-card" data-no="${esc(post.no)}">
    ${v.behind ?? ''}
    <div class="ig-boxed">${content}</div>
  </div>`
  }

  const veil =
    place === 'top'
      ? `<div class="ig-veil ig-veil-top" style="height:${bandH}px"></div>
    <div class="ig-veil ig-veil-top-fade" style="top:${bandH}px"></div>`
      : `<div class="ig-veil ig-veil-bottom" style="height:${bandH}px"></div>
    <div class="ig-veil ig-veil-bottom-fade" style="bottom:${bandH}px"></div>`

  const media = `<div class="ig-media">${v.media ?? ''}</div>`

  return `<div class="ig-card" data-no="${esc(post.no)}">
    ${v.behind ?? ''}
    ${v.band ? veil : ''}
    <div class="ig-stack${place === 'top' ? ' ig-stack--top' : ''}">
      ${place === 'top' ? `${content}\n      ${media}` : `${media}\n      ${content}`}
    </div>
  </div>`
}
