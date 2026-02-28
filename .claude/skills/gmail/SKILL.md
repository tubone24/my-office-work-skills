---
name: gmail
description: Gmail のメールを取得・検索する
user_invocable: true
---

# Gmail スキル

## 概要
Chrome の既存セッションを利用して Gmail のメールを DOM スクレイピングで取得します。
OAuth 設定は不要です。

## 使い方

### メール一覧取得
受信トレイのメール一覧を取得:
```bash
cd .claude/skills/gmail/scripts && npx tsx src/index.ts list -p "プロファイル名"
```

### メール検索
```bash
cd .claude/skills/gmail/scripts && npx tsx src/index.ts search -p "プロファイル名" -q "検索クエリ"
```

### メール本文読取
```bash
cd .claude/skills/gmail/scripts && npx tsx src/index.ts read -p "プロファイル名" --thread "スレッドID"
```

### 添付ファイルダウンロード
```bash
cd .claude/skills/gmail/scripts && npx tsx src/index.ts download -p "プロファイル名" --thread "スレッドID" --output ./downloads
```

## オプション
- `--label <name>`: ラベル指定（list時）
- `--limit <n>`: 取得件数上限（デフォルト50）
- `--format json|text`: 出力形式（デフォルト: text）
- `--no-launch`: 既存Chromeに接続
- `--port <number>`: デバッグポート（デフォルト: 9222）

## 注意事項
- Gmail にログイン済みの Chrome プロファイルが必要
- DOM セレクタは Google の更新で変わる可能性があります
