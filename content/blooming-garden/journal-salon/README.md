# Journal Salon 開催記録

Blooming Garden「Journal Salon」の開催記録を、AIで検索・分析・再利用できる形で蓄積するための保管場所です。

## フォルダ構成

```
journal-salon/
  README.md            このファイル
  index.md             全開催の一覧表(索引)
  templates/
    log-template.md     新しい開催ログの雛形
  sessions/
    YYYY-MM-DD_テーマ名/
      log.md            開催ログ本体
      materials/        使用したPDF・スライド原本
      transcript.md      文字起こし
```

## 新しい開催を追加する手順

1. `sessions/` 配下に `YYYY-MM-DD_テーマ名` フォルダを作成する
2. `templates/log-template.md` を `sessions/YYYY-MM-DD_テーマ名/log.md` としてコピーし、内容を埋める
3. 使用したPDF・スライドは `sessions/YYYY-MM-DD_テーマ名/materials/` に置く
4. 文字起こしは `sessions/YYYY-MM-DD_テーマ名/transcript.md` に貼り付ける(未収録の場合は空のままでよい)
5. `index.md` の一覧表に1行追加する

## 命名規則

- セッションフォルダ名: `YYYY-MM-DD_テーマ名`(全角記号「｜」は使わず `_` で区切る。ログ本文タイトルでは `YYYY-MM-DD｜テーマ名` の表記を使う)
- ログ本体のファイル名は常に `log.md` に統一する(スクリプトやAIが `sessions/*/log.md` で一括参照できるようにするため)
