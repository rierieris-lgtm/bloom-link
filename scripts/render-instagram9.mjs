/**
 * 9投稿の表紙を 1080 × 1350 のPNGに書き出す。
 *
 *   node scripts/render-instagram9.mjs          … 9枚すべて
 *   node scripts/render-instagram9.mjs 01 03    … 指定した番号だけ
 *
 * 書き出し先: public/instagram/01.png … 09.png
 *
 * デザインの定義は src/instagram9/card.js、文言は src/instagram9/posts.js。
 * このスクリプトはそれをブラウザで描いてPNGにするだけで、独自の見た目は持たない。
 * フォントはローカル（public/instagram/fonts）を読むので、実行にネットワークは要らない。
 */

import { createRequire } from 'node:module'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { posts } from '../src/instagram9/posts.js'
import { CANVAS, CARD_CSS, cardHTML } from '../src/instagram9/card.js'
import { missingGlyphs } from '../src/instagram9/glyphs.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = resolve(ROOT, 'public')
const OUT_DIR = resolve(PUBLIC, 'instagram')
const TMP_HTML = resolve(PUBLIC, '.instagram9-render.html')

/**
 * playwright はこのリポジトリの依存ではない（PNGの書き出しは任意の作業なので、
 * サイトのビルドに重い依存を持ち込みたくない）。ローカル → グローバルの順に探す。
 */
function loadPlaywright() {
  const require = createRequire(import.meta.url)
  const candidates = ['playwright', 'playwright-core', '/opt/node22/lib/node_modules/playwright']
  for (const id of candidates) {
    try {
      return require(id)
    } catch {
      /* 次を試す */
    }
  }
  throw new Error(
    'playwright が見つかりません。`npm i -D playwright` を実行してから、もう一度お試しください。'
  )
}

/** プロフィール画面に近い縮尺で9枚を並べ、grid.png として書き出す */
const GRID_SCALE = 1 / 3
const GRID_GUTTER = 4

async function renderGrid(page) {
  const cellW = Math.round(CANVAS.w * GRID_SCALE)
  const cellH = Math.round(CANVAS.h * GRID_SCALE)

  await page.setViewportSize({
    width: cellW * 3 + GRID_GUTTER * 2,
    height: cellH * 3 + GRID_GUTTER * 2,
  })

  await page.evaluate(
    ({ cards, cellW, cellH, gutter, scale }) => {
      document.getElementById('stage').outerHTML = `
        <div id="grid" style="display:grid;grid-template-columns:repeat(3,${cellW}px);gap:${gutter}px;background:#fff;width:max-content">
          ${cards
            .map(
              html => `<div style="width:${cellW}px;height:${cellH}px;overflow:hidden">
                 <div style="transform:scale(${scale});transform-origin:top left">${html}</div>
               </div>`
            )
            .join('')}
        </div>`
    },
    {
      cards: posts.map(p => cardHTML(p, { assetBase: '.' })),
      cellW,
      cellH,
      gutter: GRID_GUTTER,
      scale: GRID_SCALE,
    }
  )

  await page.evaluate(() => document.fonts.ready.then(() => true))
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map(img =>
        img.complete ? null : new Promise(done => img.addEventListener('load', done, { once: true }))
      )
    ).then(() => true)
  )

  await page.locator('#grid').screenshot({ path: resolve(OUT_DIR, 'grid.png') })
}

async function main() {
  const only = process.argv.slice(2)
  const targets = only.length ? posts.filter(p => only.includes(p.no)) : posts

  if (!targets.length) {
    throw new Error(`該当する投稿がありません: ${only.join(', ')}`)
  }

  const { chromium } = loadPlaywright()
  await mkdir(OUT_DIR, { recursive: true })

  const fontCSS = await readFile(resolve(OUT_DIR, 'fonts/fonts.css'), 'utf8').catch(() => {
    throw new Error(
      'public/instagram/fonts/fonts.css がありません。先に `npm run ig:fonts` を実行してください。'
    )
  })

  // フォントは表紙で使う文字だけに絞ってある。コピーに新しい漢字を足したあと
  // ig:fonts を流し忘れると豆腐（□）のまま書き出されるので、ここで止める。
  const missing = missingGlyphs(fontCSS)
  if (missing.length) {
    throw new Error(
      `フォントに入っていない文字があります: ${missing.join(' ')}\n` +
        '`npm run ig:fonts` を実行してから、もう一度お試しください。'
    )
  }

  // public/ の中に一時HTMLを置き、画像とフォントを相対パスで読ませる（file:// で完結させるため）
  const shell = `<meta charset="utf-8" />
<style>
  ${fontCSS.replace(/url\(\.\//g, 'url(./instagram/fonts/')}
  html, body { margin: 0; padding: 0; background: #fff; }
  ${CARD_CSS}
</style>
<div id="stage"></div>`
  await writeFile(TMP_HTML, shell)

  const browser = await chromium.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage({
    viewport: { width: CANVAS.w, height: CANVAS.h },
    deviceScaleFactor: 1,
  })
  await page.goto(`file://${TMP_HTML}`)

  try {
    for (const post of targets) {
      await page.evaluate(html => {
        document.getElementById('stage').innerHTML = html
      }, cardHTML(post, { assetBase: '.' }))

      // フォントと写真が確実に載ってから撮る（未ロードのまま撮ると豆腐や白抜けになる）
      await page.evaluate(() => document.fonts.ready.then(() => true))
      await page.evaluate(() =>
        Promise.all(
          [...document.images].map(img =>
            img.complete
              ? null
              : new Promise(done => img.addEventListener('load', done, { once: true }))
          )
        ).then(() => true)
      )

      const out = resolve(OUT_DIR, `${post.no}.png`)
      await page.locator('.ig-card').screenshot({ path: out })
      console.log(`  ${post.no}  ${post.category.padEnd(14)} ${post.headline.join('')}`)
    }

    // 9枚並べた状態そのものが1つの作品。1枚直すたびにここへ戻って全体を見る。
    if (targets.length === posts.length) {
      await renderGrid(page)
      console.log(`  grid  9枚を並べた確認用`)
    }
  } finally {
    await browser.close()
    await rm(TMP_HTML, { force: true })
  }

  console.log(`\n${targets.length}枚を public/instagram/ に書き出しました（1080 × 1350）`)
}

main().catch(err => {
  console.error(`\n${err.message}\n`)
  process.exit(1)
})
