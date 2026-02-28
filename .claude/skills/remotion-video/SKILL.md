---
name: remotion-video
description: Remotion を使ってプログラマティックに動画を作成・レンダリングする
user_invocable: true
---

# Remotion 動画作成

React ベースのフレームワーク Remotion を使い、テンプレートからプログラマティックに動画を生成するスキル。

スクリプトは `$CLAUDE_PROJECT_DIR/.claude/skills/remotion-video/scripts/` に格納されている。

## 事前準備

初回利用時のみ、依存パッケージをインストールする：

```bash
cd "$CLAUDE_PROJECT_DIR/.claude/skills/remotion-video/scripts" && npm install
```

## コマンド

### Studio（プレビュー）起動

```bash
cd "$CLAUDE_PROJECT_DIR/.claude/skills/remotion-video/scripts" && npx remotion studio src/index.ts
```

### 動画レンダリング

```bash
# TitleCard コンポジション（タイトルカード動画）
cd "$CLAUDE_PROJECT_DIR/.claude/skills/remotion-video/scripts" && npx remotion render src/index.ts TitleCard out/title.mp4 \
  --props='{"title":"メインタイトル","subtitle":"サブタイトル","backgroundColor":"#1a1a2e","textColor":"#ffffff"}'

# SlideShow コンポジション（スライドショー動画）
cd "$CLAUDE_PROJECT_DIR/.claude/skills/remotion-video/scripts" && npx remotion render src/index.ts SlideShow out/slideshow.mp4 \
  --props='{"slides":[{"text":"スライド1","backgroundColor":"#e63946"},{"text":"スライド2","backgroundColor":"#457b9d"},{"text":"スライド3","backgroundColor":"#2a9d8f"}]}'

# CountdownTimer コンポジション（カウントダウン動画）
cd "$CLAUDE_PROJECT_DIR/.claude/skills/remotion-video/scripts" && npx remotion render src/index.ts CountdownTimer out/countdown.mp4 \
  --props='{"from":10,"label":"開始まで","backgroundColor":"#0f0f0f","accentColor":"#e63946"}'
```

### レンダリングオプション

```bash
# コーデック指定（デフォルト: h264）
--codec=h264

# 品質指定（0-51、低いほど高品質、デフォルト: 18）
--crf=18

# スケール（2 で 2 倍解像度）
--scale=2

# GIF として出力
--codec=gif

# 静止画として出力（特定フレーム）
npx remotion still src/index.ts TitleCard out/thumbnail.png --frame=30 \
  --props='{"title":"サムネイル","subtitle":"","backgroundColor":"#1a1a2e","textColor":"#ffffff"}'
```

## 利用可能なコンポジション

### 1. TitleCard
シンプルなタイトルカード動画。フェードイン・スケールアニメーション付き。

**Props:**
| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| title | string | 必須 | メインタイトル |
| subtitle | string | "" | サブタイトル |
| backgroundColor | string | "#1a1a2e" | 背景色 |
| textColor | string | "#ffffff" | 文字色 |

### 2. SlideShow
複数スライドを順番に表示するスライドショー動画。

**Props:**
| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| slides | Slide[] | 必須 | スライド配列 |

**Slide:**
| プロパティ | 型 | 説明 |
|---|---|---|
| text | string | スライドテキスト |
| backgroundColor | string | 背景色 |

### 3. CountdownTimer
カウントダウンタイマー動画。

**Props:**
| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| from | number | 10 | カウントダウン開始値 |
| label | string | "開始まで" | ラベルテキスト |
| backgroundColor | string | "#0f0f0f" | 背景色 |
| accentColor | string | "#e63946" | アクセントカラー |

## カスタムコンポジション作成

新しいコンポジションを追加する場合：

1. `scripts/src/compositions/` に新しい `.tsx` ファイルを作成
2. `scripts/src/Root.tsx` に `<Composition>` を追加登録
3. `useCurrentFrame()` と `interpolate()` でアニメーションを制御

## 手順

1. ユーザーの要望を聞いて、適切なコンポジションとpropsを決定する
2. 必要に応じてカスタムコンポジションを `scripts/src/compositions/` に作成する
3. `npx remotion render` で動画をレンダリングする
4. 出力先のパスをユーザーに伝える

## 注意事項

- CSS transition / CSS アニメーションは使わない。必ず `useCurrentFrame` + `interpolate` / `spring` を使う
- 全 Remotion パッケージのバージョンは `4.0.429` で統一する（`^` を付けない）
- 画像や音声は `scripts/public/` に配置し、`staticFile()` で参照する
- 非同期データ取得には `delayRender` / `continueRender` を使う