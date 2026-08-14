/**
 * docs/instagram-9-原稿.md を posts.js から書き出す。
 *
 * 分担が「デザイン＝ChatGPT／構成と文章＝こちら」に分かれたので、
 * 文章だけを1ファイルにまとめて渡せるようにしている。
 *
 * 手で書き写さないのが要点。posts.js を直して `npm run ig:copy` を流せば、
 * 原稿ファイルも必ず一緒に変わる。二重管理にすると必ずどちらかが古くなる。
 *
 *   npm run ig:copy
 */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { posts, hashtagsFor, PROFILE_FOOTER, SERIES_TAGLINE } from '../src/instagram9/posts.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'docs/instagram-9-原稿.md')

/** 表紙に置く文字。デザインを作る側が拾うのはここだけ。 */
const coverBlock = p => {
  const sub = p.sub ? (Array.isArray(p.sub) ? p.sub : [p.sub]) : []
  return [
    `| カテゴリー | \`${p.category}\` |`,
    `| 見出し | ${p.headline.map(l => `\`${l}\``).join(' ／ ')} |`,
    sub.length
      ? `| サブ | ${sub.map(l => `\`${l}\``).join(' ／ ')} |`
      : '| サブ | なし |',
  ].join('\n')
}

const section = p => `## ${p.no}｜${p.category}

### 表紙に入れる文字

| | |
| --- | --- |
${coverBlock(p)}

**この回の役割**　${p.role}

**写真**　${p.photoNote}

### 本文

\`\`\`
${p.caption}

${hashtagsFor(p.no)}
\`\`\`

本文 ${p.caption.length}字（プロフィール定型を含む）
`

const doc = `# Instagram 9投稿｜原稿

**このファイルは文章だけを扱います。デザインは \`docs/instagram-9-引っ越しセット.md\` です。**

| 中身 | 担当 | ファイル |
| --- | --- | --- |
| 全体構成・表紙の文字・本文・ハッシュタグ | Claude | このファイル（元は \`src/instagram9/posts.js\`） |
| 表紙のデザイン・写真の選定と配置 | ChatGPT | \`docs/instagram-9-引っ越しセット.md\` |

**手で書き換えないでください。** 元は \`src/instagram9/posts.js\` で、
\`npm run ig:copy\` を流すとこのファイルが作り直されます。

---

## 判断の基準

> **${SERIES_TAGLINE}**

コピーを足すときも直すときも、必ずこの一文に接続できるかを先に確認します。

01〜09は独立した9投稿ではなく、一本の物語です。

\`\`\`
人生 → 違和感 → 選択 → 働き方 → 仕組み → AI → 人 → 世界 → 経営者支援 → 人生の選択肢
\`\`\`

### 本文を書くときの決まりごと

- **読む人を「会社を辞めた人」だけにしない。** 会社員のまま働き方を変えたい人、
  副業を始めた人、家のことを抱えている人が「自分の話ではない」と離れないようにする
  （08だけは経営者支援の回なので例外）
- **並べるものは、読む人が持っているものから。** 時間の使い方・優先順位・
  夫婦の時間・子どもとの過ごし方。お客様や売上から始めない
- **戦略の話は持ち主の回まで取っておく。**
  手放す・任せる・仕組みにする＝04／頼ることの怖さ・チームづくり＝06／
  関わる人の選択肢まで広げる＝09
- **1つの記事を1つの投稿で使い切らない。** 一番強い一行はその回のために残す
- ハッシュタグは**1投稿5つまで**。1枠目はシリーズのタグで固定

### 本文の末尾に置く定型ブロック

\`\`\`
${PROFILE_FOOTER}
\`\`\`

「01〜09で、ひとつの物語になっています」は入れません。連載であることは
本文の頭の「01｜」で足りていて、説明を足すと着地のあとに案内文が来て弱くなります。

---

${posts.map(section).join('\n---\n\n')}`

writeFileSync(out, doc)
console.log(`docs/instagram-9-原稿.md を書き出しました（${posts.length}投稿）`)
