/**
 * 表紙で使うフォントを、必要な文字だけに絞ってローカルへ取り込む。
 *
 *   node scripts/fetch-card-fonts.mjs
 *
 * 目的は2つ。
 *  1. ブラウザのプレビューと書き出したPNGで、まったく同じ字形になること
 *  2. 書き出し（Playwright）をネットワークに依存させないこと
 *
 * 表紙のコピーに新しい漢字を足したときは、このスクリプトを流し直す。
 * ひらがな・カタカナ・英数字・記号は最初から全部入れてあるので、
 * 多少の文言修正なら流し直さなくても崩れない。
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { jpText, latinText } from '../src/instagram9/glyphs.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = resolve(ROOT, 'public/instagram/fonts')

// Chrome を名乗らないと woff2 ではなく ttf が返ってくる
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const FAMILIES = [
  { family: 'Noto Serif JP', weights: [300], jp: true, slug: 'noto-serif-jp' },
  { family: 'Noto Sans JP', weights: [300, 400], jp: true, slug: 'noto-sans-jp' },
  { family: 'Cormorant Garamond', weights: [300, 400], jp: false, slug: 'cormorant-garamond' },
  // 09の署名にだけ使う。英字数文字ぶんしか要らないので極小のサブセットで済む。
  { family: 'Italianno', weights: [400], jp: false, slug: 'italianno' },
]

async function get(url, asBuffer = false) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`)
  return asBuffer ? Buffer.from(await res.arrayBuffer()) : res.text()
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const blocks = []

  for (const { family, weights, jp, slug } of FAMILIES) {
    const text = jp ? jpText() : latinText()
    const url =
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weights.join(';')}` +
      `&text=${encodeURIComponent(text)}&display=block`

    let css = await get(url)

    // 返ってきた @font-face の woff2 を落として、参照をローカルへ差し替える。
    // 可変フォントは複数ウエイトが同じファイルを指すので、URLは重複を除く。
    const urls = [
      ...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1])),
    ]
    for (const [i, remote] of urls.entries()) {
      const file = urls.length > 1 ? `${slug}-${i}.woff2` : `${slug}.woff2`
      const bytes = await get(remote, true)
      await writeFile(resolve(OUT_DIR, file), bytes)
      css = css.split(remote).join(`./${file}`)
      console.log(`  ${file}  ${(bytes.length / 1024).toFixed(1)}KB`)
    }

    blocks.push(`/* ${family} — 表紙で使う文字のみのサブセット */\n${css.trim()}`)
  }

  const header = `/* 自動生成 — scripts/fetch-card-fonts.mjs で作られる。手で編集しない。 */\n\n`
  await writeFile(resolve(OUT_DIR, 'fonts.css'), header + blocks.join('\n\n') + '\n')
  console.log(`\npublic/instagram/fonts/fonts.css を書き出しました`)
}

main().catch(err => {
  console.error(err.message)
  process.exit(1)
})
