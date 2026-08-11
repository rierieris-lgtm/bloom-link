/**
 * 写真をサイトに載せられるサイズに整える。
 *
 *   node scripts/optimize-photos.mjs [--trim] [--crop=上%,下%] <入力> <出力名> [...]
 *
 * 例:
 *   node scripts/optimize-photos.mjs \
 *     public/travel/IMG_0237.jpeg uzbekistan-market.jpg
 *
 * --trim は上下左右の黒帯（レターボックス）を落とす。
 * 画面録画や動画から書き出した画像には黒帯が付いていることがあり、
 * そのまま表紙に入れると「暗くしない」というルールに反してしまう。
 *
 * --crop=35,100 は縦方向を上から35%〜100%だけ残す。
 * 写真全面の型は下側が明るい帯で覆われるので、被写体が写真の下寄りにあると
 * 隠れてしまう。あらかじめ上を切り落として被写体を上へ持ち上げるために使う。
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
  const argv = process.argv.slice(2)
  const trim = argv.includes('--trim')

  const cropArg = argv.find(a => a.startsWith('--crop='))
  let crop = null
  if (cropArg) {
    const [top, bottom] = cropArg.slice('--crop='.length).split(',').map(Number)
    if (!Number.isFinite(top) || !Number.isFinite(bottom) || top >= bottom) {
      throw new Error('--crop=上%,下% の形式で、上 < 下 になるように指定してください。')
    }
    crop = { top: top / 100, bottom: bottom / 100 }
  }

  const args = argv.filter(a => a !== '--trim' && !a.startsWith('--crop='))
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
      const mime = /\.png$/i.test(from) ? 'image/png' : 'image/jpeg'
      const dataUrl = `data:${mime};base64,${bytes.toString('base64')}`

      const result = await page.evaluate(
        async ({ dataUrl, maxEdge, quality, trim, crop }) => {
          const img = new Image()
          img.src = dataUrl
          await img.decode()

          // naturalWidth/Height は EXIF の向きを反映した値になる
          const { naturalWidth: w, naturalHeight: h } = img

          // 切り出す範囲。既定は全面。
          let sx = 0
          let sy = 0
          let sw = w
          let sh = h

          if (trim) {
            // 黒帯を検出する。行・列ごとに一番明るい画素を見て、
            // どこも暗いままの帯を端から削る。
            const probe = document.createElement('canvas')
            probe.width = w
            probe.height = h
            const pctx = probe.getContext('2d', { willReadFrequently: true })
            pctx.drawImage(img, 0, 0)
            const { data } = pctx.getImageData(0, 0, w, h)

            const DARK = 24 // これ以下なら黒帯とみなす
            const STEP = 8 // 走査を間引く（速度のため）
            const brightestInRow = y => {
              let m = 0
              for (let x = 0; x < w; x += STEP) {
                const i = (y * w + x) * 4
                const v = Math.max(data[i], data[i + 1], data[i + 2])
                if (v > m) m = v
              }
              return m
            }
            const brightestInCol = x => {
              let m = 0
              for (let y = 0; y < h; y += STEP) {
                const i = (y * w + x) * 4
                const v = Math.max(data[i], data[i + 1], data[i + 2])
                if (v > m) m = v
              }
              return m
            }

            let top = 0
            while (top < h - 1 && brightestInRow(top) <= DARK) top++
            let bottom = h - 1
            while (bottom > top && brightestInRow(bottom) <= DARK) bottom--
            let left = 0
            while (left < w - 1 && brightestInCol(left) <= DARK) left++
            let right = w - 1
            while (right > left && brightestInCol(right) <= DARK) right--

            sx = left
            sy = top
            sw = right - left + 1
            sh = bottom - top + 1
          }

          if (crop) {
            const y0 = sy + Math.round(sh * crop.top)
            const y1 = sy + Math.round(sh * crop.bottom)
            sy = y0
            sh = y1 - y0
          }

          const scale = Math.min(1, maxEdge / Math.max(sw, sh))
          const outW = Math.round(sw * scale)
          const outH = Math.round(sh * scale)

          const canvas = document.createElement('canvas')
          canvas.width = outW
          canvas.height = outH
          const ctx = canvas.getContext('2d')
          ctx.imageSmoothingQuality = 'high'
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH)

          return {
            from: { w, h },
            trimmed: { w: sw, h: sh },
            to: { w: outW, h: outH },
            jpeg: canvas.toDataURL('image/jpeg', quality).split(',')[1],
          }
        },
        { dataUrl, maxEdge: MAX_EDGE, quality: QUALITY, trim, crop }
      )

      const out = Buffer.from(result.jpeg, 'base64')
      await writeFile(to, out)

      const kb = n => `${Math.round(n / 1024)}KB`
      const cropped =
        result.trimmed && (result.trimmed.w !== result.from.w || result.trimmed.h !== result.from.h)
          ? `  （黒帯を除いて ${result.trimmed.w}×${result.trimmed.h}）`
          : ''
      console.log(
        `  ${basename(from)}  ${result.from.w}×${result.from.h} ${kb(bytes.length)}` +
          `  →  ${basename(to)}  ${result.to.w}×${result.to.h} ${kb(out.length)}${cropped}`
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
