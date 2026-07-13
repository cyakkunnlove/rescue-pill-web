"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-primary-light z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" aria-label="トップへ戻る" className="min-w-11 min-h-11 flex items-center justify-center p-2 -ml-2 hover:bg-primary-light rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-text-primary">Rescue Pill</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-text-primary mb-2">特定商取引法に基づく表記</h1>
          <p className="text-sm text-text-muted mb-8">最終更新日: 2026年7月13日</p>

          <div className="prose prose-sm max-w-none text-text-secondary">
            <div className="bg-white rounded-2xl border-2 border-primary-light overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 w-1/3 text-text-primary font-medium">
                      販売事業者名
                    </th>
                    <td className="p-4 text-text-secondary">
                      Rescue Pill運営事務局
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      運営責任者
                    </th>
                    <td className="p-4 text-text-secondary">
                      加藤 琢也
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      所在地
                    </th>
                    <td className="p-4 text-text-secondary">
                      請求があった場合に遅滞なく開示いたします
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      電話番号
                    </th>
                    <td className="p-4 text-text-secondary">
                      請求があった場合に遅滞なく開示いたします
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      メールアドレス
                    </th>
                    <td className="p-4 text-text-secondary">
                      お問い合わせフォームよりご連絡ください
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      サービスURL
                    </th>
                    <td className="p-4 text-text-secondary">
                      https://rescue-pill.com
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      販売価格
                    </th>
                    <td className="p-4 text-text-secondary">
                      本サービスは無料でご利用いただけます
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      販売価格以外の必要料金
                    </th>
                    <td className="p-4 text-text-secondary">
                      インターネット接続に必要な通信費はお客様のご負担となります
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      支払方法
                    </th>
                    <td className="p-4 text-text-secondary">
                      無料サービスのため、お支払いは発生しません
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      サービス提供時期
                    </th>
                    <td className="p-4 text-text-secondary">
                      サービスにアクセスした時点から即時ご利用いただけます
                    </td>
                  </tr>
                  <tr className="border-b border-primary-light">
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      返品・キャンセル
                    </th>
                    <td className="p-4 text-text-secondary">
                      無料サービスのため、返品・キャンセルは適用されません
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left p-4 bg-primary-light bg-opacity-30 text-text-primary font-medium">
                      動作環境
                    </th>
                    <td className="p-4 text-text-secondary">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>対応ブラウザ: Google Chrome、Safari、Firefox、Edge（最新版を推奨）</li>
                        <li>対応デバイス: PC、スマートフォン、タブレット</li>
                        <li>インターネット接続が必要です</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <section className="mt-8">
              <h2 className="text-lg font-bold text-text-primary mb-4">広告について</h2>
              <p className="leading-relaxed text-text-secondary">
                本サービスでは、コンテンツページで第三者配信の広告サービス（Google AdSense）を利用する場合があります。
                広告の表示により、当方は広告収入を得る場合があります。
                広告の内容については、広告配信事業者の責任において配信されるものであり、
                当方が広告内容を保証するものではありません。
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-bold text-text-primary mb-4">将来の有料サービスについて</h2>
              <p className="leading-relaxed text-text-secondary">
                将来的に有料のオプションサービスを提供する場合は、
                本ページを更新し、料金、支払方法、返品・キャンセルポリシー等を明記いたします。
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 bg-text-primary mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-white/50">
            © 2026 Rescue Pill. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
