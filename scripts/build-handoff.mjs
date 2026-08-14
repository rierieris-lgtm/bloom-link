/**
 * handoff/ を組み立てる。VS Code で ChatGPT（Codex）と一緒に作業するための一式。
 *
 *   npm run ig:handoff
 *
 * このフォルダは毎回まるごと作り直す。中を手で書き換えても次の実行で消える。
 * 直すのは元のファイル（src/instagram9/posts.js、docs/instagram-9-引っ越しセット.md）。
 * コピーを置いて二重管理にすると、必ずどちらかが古くなるため。
 */

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { posts } from '../src/instagram9/posts.js'
import { buildCopyDoc } from './write-copy-doc.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'handoff')

/**
 * 本文が「01・02から取った書き方」に沿っているかを機械的に見る。
 *
 * 見られるのは形だけ（箇条書きの有無と行の長さ）。
 * 中身が本人の声になっているかは人が読むしかないので、そちらは status で持つ。
 */
const LINE_MAX = 23
const checkShape = p => {
  const body = p.caption.split('\n\n─')[0]
  const lines = body.split('\n')
  return {
    bullets: lines.filter(l => l.startsWith('・')).length,
    long: lines.filter(l => [...l].length > LINE_MAX).length,
    chars: p.caption.length,
  }
}

const statusTable = () => {
  const rows = posts.map(p => {
    const s = checkShape(p)
    const flags = []
    if (s.bullets) flags.push(`箇条書き${s.bullets}行`)
    if (s.long) flags.push(`${LINE_MAX}字超${s.long}行`)
    return `| ${p.no} | ${p.category} | ${p.status} | ${s.chars}字 | ${flags.length ? '**' + flags.join('・') + '**' : '—'} |`
  })
  return rows.join('\n')
}

const readme = `# 引っ越しフォルダ

**VS Code で ChatGPT（Codex）と一緒に作業するための一式です。**
このフォルダだけ渡せば、リポジトリの中を見なくても作業に入れます。

> このフォルダは \`npm run ig:handoff\` で**毎回まるごと作り直されます。**
> 中のファイルを直しても次の実行で消えます。直すのは元のファイルのほうです。

---

## 分担

| 中身 | 担当 | このフォルダのファイル |
| --- | --- | --- |
| 全体構成・表紙の文字・本文・ハッシュタグ | **Claude** | \`01-原稿.md\` |
| 表紙のデザイン・写真の選定と配置 | **ChatGPT / Codex** | \`02-デザイン依頼書.md\` |
| いまどこまで進んでいるか | 共通 | \`03-いまの状態.md\` |

**文章とデザインで、正になるファイルが違います。**

- **文章**は \`src/instagram9/posts.js\` が正。\`01-原稿.md\` はそこから作った読み物です
- **デザイン**は本人がChatGPTで作ったものが正。リポジトリのPNGは提案と記録です

---

## 触っていい場所・触らない場所

| 場所 | 触っていいか |
| --- | --- |
| \`src/instagram9/card.js\`（表紙の見た目） | **触っていい。** 型・余白・飾りの調整はここ |
| \`src/instagram9/posts.js\` の \`place\` \`boxAt\` \`focus\` \`photos\` | **触っていい。** 写真に合わせて型を選び直すため |
| \`src/instagram9/posts.js\` の \`caption\` \`headline\` \`sub\` \`category\` | **触らない。** 文章はClaude側で決めています |
| \`handoff/\` の中身 | **触らない。** 次の \`ig:handoff\` で消えます |

文言を変えたいときは、変えずに**理由をメモして共有**してください。
9投稿は一本の物語で、1か所直すと前後の回の持ち分が動きます。

---

## コマンド

\`\`\`bash
npm install                # 最初の1回
npm i -D playwright        # 表紙を書き出すときだけ必要

npm run dev                # /instagram9 で9枚まとめて確認
npm run ig:render          # 表紙PNGを書き出す（public/instagram/）
npm run ig:fonts           # 表紙に新しい漢字を足したときだけ
npm run ig:copy            # 原稿を作り直す
npm run ig:handoff         # このフォルダを作り直す
npm run ig:photo <in> <名前>   # 写真を長辺2000pxへ。EXIFの向きも焼き込む
\`\`\`

**\`ig:render\` は、表紙に使う文字がフォントに入っているかを先に確認します。**
足りない文字があればその文字を挙げて止まるので、豆腐のまま書き出されることはありません。
止まったら \`npm run ig:fonts\` を流してから、もう一度実行してください。

---

## 日本語の文字を画像生成に描かせない

画像生成AIは日本語を正しく描けません。実際に試した案では
「充金しよ、あい」「並んなね売もだてか」のような崩れた文字が出ていました。

**ラフを頼むときは、日本語をダミー（■■■■）にしてください。**
見たいのは写真と面のバランスなので、それで足ります。文字はこちらで入れます。

---

## 参考フォルダ

| ファイル | 中身 |
| --- | --- |
| \`参考/grid-instagram.png\` | **プロフィールでの実際の並び。**投稿前に見るのはこちら |
| \`参考/grid.png\` | 物語の順（01→09）。設計を確認するためのもの |
| \`参考/表紙案/\` | 9枚の表紙案。01〜03の写真は差し替え前の仮置き |

**Instagramのプロフィールは新しい投稿が左上に来ます。**
01から順に投稿すると、グリッドでは \`09 08 07 / 06 05 04 / 03 02 01\` と並びます。
だから表紙に 01〜09 の番号は入れていません。
`

const stateDoc = `# いまの状態

> \`npm run ig:handoff\` で作り直されます。手で書き換えないでください。

## 9投稿の進みぐあい

| No | カテゴリー | 状態 | 本文 | 形のチェック |
| --- | --- | --- | --- | --- |
${statusTable()}

**「形のチェック」は機械的に見ているだけです。** 箇条書きが入っていないか、
1行が${LINE_MAX}字を超えていないかの2点だけ。中身が本人の声になっているかは人が読みます。

01・02は投稿済みで、この2本が見本です。書き方の決まりは \`01-原稿.md\` の先頭にあります。

---

## 次にやること

**03** — 本文は確定しています。**表紙だけ作れば投稿できます。**
型は**浮かぶ箱**。写真は上にサグラダ・ファミリアの尖塔、下に本人がいるので、
帯を上下どちらに置いても片方が消えます。箱だけが両方を残せます。
箱は**左下**へ。本人が右下にいるので、空いているのは左側です。

**04〜09** — 本文を書き直します。番号順に進めます。
いまの本文は叩き台で、投稿済みの01・02の書き方から外れています
（箇条書きがある・行が長い・話が抽象的）。

**04を書くのに、本人から2つ聞く必要があります。**

1. 「私がやらなきゃ」を減らし始めたのは**いつ**か。
   03と同じく会社員の頃からか、辞めたあとに本格化したのか
2. **最初に手放したものは何**だったか。
   01の「4年間の産休・育休」、02の「小学生2人の子育てと、全国への出張」くらい
   具体的な場面がひとつあれば、同じ密度で書けます

---

## 取ってある素材（先に使わない）

note記事「一人旅なんてもうできないと思っていた話」から、
あえて03に入れなかったものが2つあります。

| 素材 | 使う回 | 理由 |
| --- | --- | --- |
| 「一番勇気が必要だったのは、周りに頼ること」 | **06** | 06は任せる・頼るの回。03には事実として「まわりに頼りました」だけ置き、気持ちは06に残す |
| 旅先で出会った人たち（一人旅のマダム／子連れの家族／留学生） | **07** | 07の本文がまさにこれ。旅で人に会い、選択肢のストックにする話 |

**1つの記事を1つの投稿で使い切りません。** 一番強い一行は、その回のために残します。

---

## 表紙の型の割り当て

物語の順。

\`\`\`
01 箱        02 縦割り    03 箱         ← 01・02は投稿済み
04 手順の図  05 上帯      06 縦割り
07 上帯3枚   08 数字      09 下帯
\`\`\`

プロフィールでの実際の並び。**辺で接する12か所すべてで型が違います。**

\`\`\`
09 下帯      08 数字      07 上帯3枚
06 縦割り    05 上帯      04 手順の図
03 箱        02 縦割り    01 箱
\`\`\`

斜めは接していないので、01と03が同じ箱、02と06が同じ縦割りでも問題ありません。

**1枚の型を変えると、真上と真下も動きます。**
03を箱にしたので、その真上の06は箱にできず縦割りへ移しました。
`

rmSync(out, { recursive: true, force: true })
mkdirSync(resolve(out, '参考/表紙案'), { recursive: true })

writeFileSync(resolve(out, 'README.md'), readme)
writeFileSync(resolve(out, '01-原稿.md'), buildCopyDoc())
writeFileSync(
  resolve(out, '02-デザイン依頼書.md'),
  readFileSync(resolve(root, 'docs/instagram-9-引っ越しセット.md'), 'utf8')
)
writeFileSync(resolve(out, '03-いまの状態.md'), stateDoc)

const copied = []
for (const [from, to] of [
  ['public/instagram/grid-instagram.png', '参考/grid-instagram.png'],
  ['public/instagram/grid.png', '参考/grid.png'],
  ...posts.map(p => [`public/instagram/${p.no}.png`, `参考/表紙案/${p.no}.png`]),
]) {
  const src = resolve(root, from)
  if (!existsSync(src)) continue
  cpSync(src, resolve(out, to))
  copied.push(to)
}

console.log('handoff/ を組み立てました')
console.log('  README.md / 01-原稿.md / 02-デザイン依頼書.md / 03-いまの状態.md')
console.log(`  参考 ${copied.length}点`)
if (copied.length < 11) {
  console.log('  ※ 表紙PNGが足りません。`npm run ig:render` を先に流してください')
}
