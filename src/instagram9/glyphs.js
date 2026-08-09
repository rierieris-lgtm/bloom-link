/**
 * 表紙に出る文字の集合。
 *
 * フォントは「表紙で使う文字だけ」に絞って取り込んでいるので、
 * ここが取りこぼすと、書き出したPNGで豆腐（□）になる。
 * フォントを作る側（fetch-card-fonts）と、確認する側（render-instagram9）が
 * 同じ定義を見るように、1か所に置いてある。
 */

import { posts, SERIES_TAGLINE } from './posts.js'

const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)).join('')

/** かな・英数字・記号は最初から全部入れておく（多少の文言修正で崩れないように） */
export const ALWAYS =
  range(0x20, 0x7e) + // ASCII
  range(0x3041, 0x309f) + // ひらがな
  range(0x30a0, 0x30ff) + // カタカナ
  range(0xff01, 0xff5e) + // 全角英数記号
  '、。「」『』（）〜ー・…—－'

/** 表紙に実際に出る文字（本文キャプションは対象外） */
export function cardCharacters() {
  const chunks = [SERIES_TAGLINE, 'BLOOM LINK', '0123456789']

  for (const p of posts) {
    chunks.push(p.no, p.category, ...p.headline)
    if (p.sub) chunks.push(p.sub)
    if (p.signature) chunks.push(p.signature)
    if (p.steps) chunks.push(...p.steps)
    if (p.flow) chunks.push(...p.flow.map(f => f.label))
    if (p.statValue) chunks.push(p.statValue, p.statUnit, p.statLabel)
  }

  return chunks.join('')
}

export const uniq = str => [...new Set([...str])].sort().join('')

/** 日本語フォントに必要な文字 */
export const jpText = () => uniq(cardCharacters() + ALWAYS)

/** 欧文フォントに必要な文字 */
export const latinText = () => uniq(cardCharacters().replace(/[^\x20-\x7e]/g, '') + range(0x20, 0x7e))

/**
 * fonts.css の unicode-range を読んで、表紙に出る文字がすべて含まれているか調べる。
 * 表紙のコピーに新しい漢字を足したまま ig:fonts を流し忘れると、ここで引っかかる。
 *
 * @returns {string[]} 足りていない文字（空なら問題なし）
 */
export function missingGlyphs(fontCSS) {
  const covered = new Set()

  for (const [, body] of fontCSS.matchAll(/unicode-range:\s*([^;]+);/g)) {
    for (const token of body.split(',')) {
      const m = token.trim().match(/^U\+([0-9a-f]+)(?:-([0-9a-f]+))?$/i)
      if (!m) continue
      const from = parseInt(m[1], 16)
      const to = m[2] ? parseInt(m[2], 16) : from
      for (let cp = from; cp <= to; cp++) covered.add(cp)
    }
  }

  return [...uniq(cardCharacters())].filter(ch => !covered.has(ch.codePointAt(0)))
}
