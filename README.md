# Rescue Pill Web

緊急避妊薬について、厚生労働省・PMDAの公開情報をもとに入手先と相談先を案内するWebアプリケーションです。医療行為・診断・購入可否の判定は行いません。

🌐 **Canonical:** https://rescue-pill.com

## 機能

- ✅ 必要最小限のセルフチェック
- ✅ ルールベースの一般案内（薬局/医療機関/緊急）
- ✅ QRコード生成・ダウンロード
- ✅ PDF出力
- ✅ 都道府県・名称・住所による薬局検索
- ✅ 日本語・英語・中国語・ベトナム語・韓国語
- ✅ 広告配信（Google AdSense対応）

## 公開情報の基準日

- 薬局販売制度: 2026年2月2日開始
- 厚生労働省の販売可能薬局・店舗一覧: 2026年7月1日更新分
- 収録件数: 15,304件（削除指定行を除外）
- サイト内の医療・制度情報の確認日: 2026年7月13日

一次情報はサイト内の `/sources` に集約しています。薬局データは在庫、販売時間、研修を受けた薬剤師の勤務を保証しないため、利用前の電話確認を案内しています。

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

### 薬局データの更新

```bash
python3 -m pip install -r requirements-data.txt
npm run update:pharmacies
```

更新スクリプトは厚生労働省の公式ページからその時点のExcel URLと更新日を検出し、TLS・配布元・形式・件数を検証してから `public/data/otc_pharmacies.json` とメタデータを置き換えます。公式ページの構造が変わり最新ファイルを一意に特定できない場合は、古いデータを更新済みとして扱わず停止します。位置座標は検索や並び順に使用していません。

## 環境変数

`.env.example` を `.env.local` にコピーして設定：

```bash
cp .env.example .env.local
```

### Google AdSense 設定

1. [Google AdSense](https://www.google.com/adsense/) でアカウント作成
2. `src/lib/siteIdentity.ts` の所有権確認IDと `public/ads.txt` のIDを一致させる
3. サイト審査を通過
4. 同意管理と記事ページの広告枠を確認してから、広告配信を有効化する：

```env
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ENABLED=false
NEXT_PUBLIC_ADSENSE_SLOT_BANNER=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE=1234567891
NEXT_PUBLIC_ADSENSE_SLOT_INLINE=1234567892
```

`NEXT_PUBLIC_ADSENSE_ENABLED` は、承認前は必ず `false` のままにします。所有権確認は
`google-adsense-account` metaタグで行い、広告スクリプトは読み込みません。承認後も、
セルフチェック・結果・薬局/医療機関検索・緊急CTA周辺には広告を配置しません。

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
| 薬局検索 | `/pharmacies` | 厚生労働省一覧の検索 |
| 医療機関 | `/hospitals` | 対面・オンライン診療の公式案内 |
| 出典 | `/sources` | 一次情報と更新方針 |
| ブログ | `/blog` | 緊急避妊薬の解説 |
| 利用規約 | `/terms` | 利用規約 |
| プライバシーポリシー | `/privacy` | プライバシーポリシー |
| 特定商取引法 | `/legal` | 特定商取引法に基づく表記 |
| 免責事項 | `/disclaimer` | 免責事項 |

## デプロイ

Vercelに接続済み。`main` ブランチへのpushで自動デプロイ。

## ライセンス

Private

---

**⚠️ 注意:** 本サービスは一般情報の提供を目的とし、診断や医療従事者の判断に代わるものではありません。時間が重要なため、服用を検討している場合は薬剤師または医療機関へ早めに相談してください。
