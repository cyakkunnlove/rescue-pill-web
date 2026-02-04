"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-primary-light z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-primary-light rounded-xl transition-colors">
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
          <h1 className="text-2xl font-bold text-text-primary mb-2">プライバシーポリシー</h1>
          <p className="text-sm text-text-muted mb-8">最終更新日: 2024年12月1日</p>

          <div className="prose prose-sm max-w-none text-text-secondary space-y-6">
            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">はじめに</h2>
              <p className="leading-relaxed">
                Rescue Pill運営（以下「当方」といいます）は、本サービス「Rescue Pill」（以下「本サービス」といいます）
                における利用者の皆様（以下「ユーザー」といいます）のプライバシーを尊重し、
                個人情報の保護に努めます。本プライバシーポリシーは、本サービスにおける情報の取り扱いについて説明するものです。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">1. 収集する情報</h2>
              <h3 className="font-bold text-text-primary mt-4 mb-2">1.1 ユーザーが入力する情報</h3>
              <p className="leading-relaxed mb-4">
                本サービスでは、セルフチェック機能のために以下の情報をユーザーに入力いただく場合があります。
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>最後の性行為の日時</li>
                <li>避妊の状況</li>
                <li>健康状態に関する情報（持病、服用中の薬など）</li>
                <li>月経に関する情報</li>
                <li>身体的特徴（身長、体重など）</li>
                <li>位置情報（任意、薬局検索のため）</li>
              </ul>
              <p className="mt-4 p-4 bg-primary-light rounded-xl">
                <strong className="text-primary">重要：</strong>これらの情報は
                <strong>ユーザーの端末内のみで処理され、当方のサーバーには送信されません。</strong>
              </p>

              <h3 className="font-bold text-text-primary mt-6 mb-2">1.2 自動的に収集される情報</h3>
              <p className="leading-relaxed">
                本サービスでは、サービス改善のため、以下の情報を自動的に収集する場合があります。
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>アクセス日時</li>
                <li>ブラウザの種類</li>
                <li>デバイスの種類</li>
                <li>IPアドレス（匿名化処理を行います）</li>
                <li>ページ閲覧履歴</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">2. 情報の利用目的</h2>
              <p className="leading-relaxed mb-2">当方は、収集した情報を以下の目的で利用します。</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>本サービスの提供・運営</li>
                <li>本サービスの改善・新機能の開発</li>
                <li>利用状況の分析・統計データの作成</li>
                <li>広告の配信</li>
                <li>お問い合わせへの対応</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">3. 情報の第三者提供</h2>
              <p className="leading-relaxed">
                当方は、以下の場合を除き、ユーザーの個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>ユーザーの同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">4. Cookie・広告について</h2>
              <h3 className="font-bold text-text-primary mt-4 mb-2">4.1 Cookieの使用</h3>
              <p className="leading-relaxed">
                本サービスでは、ユーザー体験の向上およびアクセス解析のためにCookieを使用する場合があります。
                ユーザーはブラウザの設定によりCookieを無効にすることができますが、
                一部のサービス機能が利用できなくなる場合があります。
              </p>

              <h3 className="font-bold text-text-primary mt-6 mb-2">4.2 広告配信</h3>
              <p className="leading-relaxed">
                本サービスでは、第三者配信の広告サービス（Google AdSense等）を利用しています。
                これらの広告配信事業者は、ユーザーの興味に応じた広告を表示するため、
                Cookieを使用してユーザーの本サービスおよび他のサイトへのアクセス情報を収集する場合があります。
              </p>
              <p className="mt-2 leading-relaxed">
                Google AdSenseの詳細については、
                <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Googleのポリシー
                </a>
                をご確認ください。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">5. アクセス解析ツール</h2>
              <p className="leading-relaxed">
                本サービスでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用する場合があります。
                このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
                このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">6. データの保存期間</h2>
              <p className="leading-relaxed">
                本サービスのセルフチェック機能で入力された情報は、ユーザーの端末内にのみ一時的に保存され、
                ブラウザを閉じるか、ユーザーが明示的に削除することで消去されます。
                当方のサーバーには保存されません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">7. セキュリティ</h2>
              <p className="leading-relaxed">
                当方は、ユーザーの情報の安全管理のため、適切なセキュリティ対策を講じます。
                ただし、インターネット上での通信の完全な安全性を保証することはできません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">8. お子様のプライバシー</h2>
              <p className="leading-relaxed">
                本サービスは、未成年者を含むすべての方を対象としていますが、
                16歳未満のお子様が本サービスを利用する場合は、保護者の方の同意のもとでご利用ください。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">9. プライバシーポリシーの変更</h2>
              <p className="leading-relaxed">
                当方は、必要に応じて本プライバシーポリシーを変更することがあります。
                変更後のプライバシーポリシーは、本サービス上に掲載した時点で効力を生じます。
                重要な変更がある場合は、本サービス上でお知らせします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">10. お問い合わせ</h2>
              <p className="leading-relaxed">
                本プライバシーポリシーに関するお問い合わせは、本サービス内のお問い合わせフォームよりご連絡ください。
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 bg-text-primary mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-white/50">
            © 2024 Rescue Pill. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
