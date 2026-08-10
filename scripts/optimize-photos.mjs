/**
 * 写真をサイトに載せられるサイズに整える。
 *
 *   node scripts/optimize-photos.mjs <入力> <出力名> [<入力> <出力名> ...]
 *
 * 例:
 *   node scripts/optimize-photos.mjs \
 *     public/travel/IMG_0237.jpeg uzbekistan-market.jpg
 *
 * スマホから上げた写真はそのままだと5〜8MBあり、リポジトリとサイトが重くなる。
 * 表紙は1080×1350なので、長辺2000pxあれば引き伸ばしにはならない。
 *
 * あわせて、撮影時の向き（EXIF）を画素そのものに焼き込む。
 * iPhoneの写真は「横向きに保存して、向きは情報として持つ」形になっていることがあり、
 * 環境によって寝たまま表示されることがあるため。
 */

import { createRequire } from 'node:module'
import { readFile, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** 長辺の上限。表紙（1080×1350）に対して充分な余裕がある。 */
const MAX_EDGE = 2000
const QUALITY = 0.86

function loadPlaywright() {
  const require = createRequire(import.meta.url)
  for (const id of ['playwright', 'playwright-core', '/opt/node22/lib/node_modules/playwright']) {
    try {
      return require(id)
    } catch {
      /* 次を試す */
    }
  }
  throw new Error('playwright が見つかりません。`npm i -D playwright` を実行してください。')
}

async function main() {
  const args = process.argv.slice(2)
  if (!args.length || args.length % 2 !== 0) {
    throw new Error('入力ファイルと出力名を対で渡してください。')
  }

  const jobs = []
  for (let i = 0; i < args.length; i += 2) {
    jobs.push({ from: resolve(ROOT, args[i]), to: resolve(ROOT, dirname(args[i]), args[i + 1]) })
  }

  const { chromium } = loadPlaywright()
  const browser = await chromium.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto('about:blank')

  try {
    for (const { from, to } of jobs) {
      const bytes = await readFile(from)
      const dataUrl = `data:image/jpeg;base64,${bytes.toString('base64')}`

      const result = await page.evaluate(
        async ({ dataUrl, maxEdge, quality }) => {
          const img = new Image()
          img.src = dataUrl
          await img.decode()

          // naturalWidth/Height は EXIF の向きを反映した値になる
          const { naturalWidth: w, naturalHeight: h } = img
          const scale = Math.min(1, maxEdge / Math.max(w, h))
          const outW = Math.round(w * scale)
          const outH = Math.round(h * scale)

          const canvas = document.createElement('canvas')
          canvas.width = outW
          canvas.height = outH
          const ctx = canvas.getContext('2d')
          ctx.imageSmoothingQuality = 'high'
          ctx.drawImage(img, 0, 0, outW, outH)

          return {
            from: { w, h },
            to: { w: outW, h: outH },
            jpeg: canvas.toDataURL('image/jpeg', quality).split(',')[1],
          }
        },
        { dataUrl, maxEdge: MAX_EDGE, quality: QUALITY }
      )

      const out = Buffer.from(result.jpeg, 'base64')
      await writeFile(to, out)

      const kb = n => `${Math.round(n / 1024)}KB`
      console.log(
        `  ${basename(from)}  ${result.from.w}×${result.from.h} ${kb(bytes.length)}` +
          `  →  ${basename(to)}  ${result.to.w}×${result.to.h} ${kb(out.length)}`
      )

      if (to !== from) await rm(from)
    }
  } finally {
    await browser.close()
  }
}

main().catch(err => {
  console.error(`\n${err.message}\n`)
  process.exit(1)
})
