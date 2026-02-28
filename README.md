# my-office-work-skills

A collection of Claude Code skills for automating office-related data gathering tasks — calendar events, emails, location history, and video creation.

---

## Skills Overview

### 1. `google-calendar` — Fetch Google Calendar Events

Retrieves events from Google Calendar by scraping your logged-in Chrome session via CDP (no OAuth required).

**Usage:** Ask Claude to get your calendar events for a date range.

> "今週のGoogleカレンダーの予定を取得して"

---

### 2. `gmail` — Fetch & Search Gmail

Lists, searches, reads, and downloads attachments from Gmail using your existing Chrome session.

**Usage:** Ask Claude to search or read your emails.

> "件名に'請求書'が含むメールを検索して"

---

### 3. `google-maps-timeline` — Office Attendance from Location History

Parses a `Timeline.json` exported from Google Maps to list the days you visited the office.

**Prerequisites — How to export Timeline.json:**

1. Open **Google Maps** on your smartphone
2. Tap your **profile icon** (top-right)
3. Tap **Timeline**
4. Tap the **gear icon** (Settings)
5. Tap **Export timeline data**
6. Save the downloaded `Timeline.json` to your Mac (e.g. via AirDrop or iCloud Drive)

**Usage:** Ask Claude to analyze the file.

> "Timeline.jsonを使って今月の出社日を一覧にして"

The skill detects office visits using:
- `TYPE_WORK` / `INFERRED_WORK` semantic types (auto-detected)
- Or explicit coordinates + radius (`--lat`, `--lng`, `--radius`)

---

### 4. `remotion-video` — Create Videos Programmatically

Renders MP4 videos using [Remotion](https://www.remotion.dev/) (React-based). Includes built-in compositions:

| Composition | Description |
|---|---|
| `TitleCard` | Animated title + subtitle |
| `SlideShow` | Sequential slide animation |
| `CountdownTimer` | Countdown number display |

**Usage:** Ask Claude to create a video.

> "カウントダウン動画を10秒で作って"

---

## Architecture

All browser-based skills (Gmail, Google Calendar) share a common Chrome automation layer located in `shared/`. They connect to your existing Chrome profile via **Chrome DevTools Protocol (CDP)**, so no API keys or OAuth setup is needed — just a logged-in Chrome browser.

```
.claude/skills/
├── gmail/
├── google-calendar/
├── google-maps-timeline/
├── remotion-video/
└── shared/          ← Chrome launcher & profile utilities
```
