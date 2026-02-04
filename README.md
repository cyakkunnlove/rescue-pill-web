# Rescue Pill Web

緊急避妊薬の入手を支援するWebアプリケーション。

🌐 **Live:** https://rescue-pill-web.vercel.app

## 機能

- ✅ セルフチェック問診（16問）
- ✅ ルールベース判定（薬局/医療機関/緊急）
- ✅ QRコード生成・ダウンロード
- ✅ PDF出力
- ✅ 近隣薬局検索への導線
- ✅ 広告配信（Google AdSense対応）

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Zustand（状態管理）
- qrcode.react / @react-pdf/renderer

## セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

## 環境変数

`.env.example` を `.env.local` にコピーして設定：

```bash
cp .env.example .env.local
```

### Google AdSense 設定

1. [Google AdSense](https://www.google.com/adsense/) でアカウント作成
2. サイト審査を通過
3. パブリッシャーIDと広告ユニットIDを取得
4. 環境変数を設定：

```env
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_BANNER=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE=1234567891
NEXT_PUBLIC_ADSENSE_SLOT_INLINE=1234567892
```

5. `public/ads.txt` を更新：

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

### Vercelでの環境変数設定

1. Vercelダッシュボード → Settings → Environment Variables
2. 上記の環境変数を追加
3. 再デプロイ

### Google Analytics（任意）

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## ページ構成

| ページ | パス | 説明 |
|--------|------|------|
| トップ | `/` | サービス紹介 |
| 利用規約 | `/terms` | 利用規約 |
| プライバシーポリシー | `/privacy` | プライバシーポリシー |
| 特定商取引法 | `/legal` | 特定商取引法に基づく表記 |
| 免責事項 | `/disclaimer` | 免責事項 |

## デプロイ

Vercelに接続済み。`main` ブランチへのpushで自動デプロイ。

## ライセンス

Private

---

**⚠️ 注意:** 本サービスは医療行為ではありません。緊急避妊薬の使用については、必ず医療従事者にご相談ください。
