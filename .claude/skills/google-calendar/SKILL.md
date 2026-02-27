---
name: google-calendar
description: Google Calendar の予定を取得する
user_invocable: true
---

# Google Calendar 予定取得

CDP (Chrome DevTools Protocol) 経由で、ログイン済み Chrome プロファイルの Google Calendar イベントを取得するツール。

スクリプトは `$CLAUDE_PROJECT_DIR/.claude/skills/google-calendar/scripts/` に格納されている。

## コマンド

```bash
# プロファイル一覧
npx tsx "$CLAUDE_PROJECT_DIR/.claude/skills/google-calendar/scripts/index.ts" profiles

# 今日の予定を取得 (既存 Chrome デバッグポートに接続)
npx tsx "$CLAUDE_PROJECT_DIR/.claude/skills/google-calendar/scripts/index.ts" events --no-launch --port 9222 --format text

# プロファイル指定で予定取得
npx tsx "$CLAUDE_PROJECT_DIR/.claude/skills/google-calendar/scripts/index.ts" events -p "<プロファイル名>" --format text

# 日付範囲指定
npx tsx "$CLAUDE_PROJECT_DIR/.claude/skills/google-calendar/scripts/index.ts" events --no-launch --port 9222 --start YYYY-MM-DD --end YYYY-MM-DD --format text

# 特定日のみ
npx tsx "$CLAUDE_PROJECT_DIR/.claude/skills/google-calendar/scripts/index.ts" events --no-launch --port 9222 --date YYYY-MM-DD --format text

# JSON 形式
npx tsx "$CLAUDE_PROJECT_DIR/.claude/skills/google-calendar/scripts/index.ts" events --no-launch --port 9222 --format json
```

## 手順

1. まず `profiles` コマンドでプロファイル一覧を表示し、ユーザーに使用するプロファイルを確認する
2. ユーザーが指定したプロファイルで `events` コマンドを実行する
3. 結果をユーザーに分かりやすくサマライズして提示する

## 注意事項

- Chrome が既にログイン済みのプロファイルのセッションを流用する（OAuth 設定不要）
- DOM スクレイピング方式で取得するため、日付範囲が長い場合は1日ずつページ遷移する
- `browser.disconnect()` で切断するため、元の Chrome セッションには影響しない
- `--no-launch` を使う場合は、事前に Chrome を `--remote-debugging-port=9222` 付きで起動しておく必要がある
