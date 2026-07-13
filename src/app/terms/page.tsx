"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
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
          <h1 className="text-2xl font-bold text-text-primary mb-2">利用規約</h1>
          <p className="text-sm text-text-muted mb-8">最終更新日: 2026年7月13日</p>

          <div className="prose prose-sm max-w-none text-text-secondary space-y-6">
            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第1条（適用）</h2>
              <p className="leading-relaxed">
                本利用規約（以下「本規約」といいます）は、Rescue Pill運営（以下「当方」といいます）が提供する
                緊急避妊支援サービス「Rescue Pill」（以下「本サービス」といいます）の利用条件を定めるものです。
                利用者の皆様（以下「ユーザー」といいます）には、本規約に同意いただいた上で、本サービスをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第2条（本サービスの内容）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>本サービスは、緊急避妊薬の入手を検討するユーザーに対し、セルフチェック機能および情報提供を行うものです。</li>
                <li>本サービスは医療行為ではなく、医療アドバイスの提供を目的としたものではありません。</li>
                <li>本サービスの案内は一般的な参考情報であり、個別の診断や購入可否を確定するものではありません。最終的な確認は医療従事者にご相談ください。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第3条（利用資格）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>本サービスは、日本国内に居住する方を対象としています。</li>
                <li>未成年の方も利用できます。16歳未満の方には、厚生労働省の運用に沿って産婦人科・小児科等への相談も案内します。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第4条（禁止事項）</h2>
              <p className="mb-2">ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>本サービスの運営を妨害する行為</li>
                <li>他のユーザーに迷惑をかける行為</li>
                <li>虚偽の情報を入力する行為</li>
                <li>本サービスのコンテンツを無断で複製・転載する行為</li>
                <li>その他、当方が不適切と判断する行為</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第5条（本サービスの変更・停止）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>当方は、ユーザーへの事前通知なく、本サービスの内容を変更または停止することができます。</li>
                <li>当方は、本サービスの変更または停止によりユーザーに生じた損害について、一切の責任を負いません。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第6条（免責事項）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>当方は、本サービスの情報の正確性、完全性、有用性等について、いかなる保証も行いません。</li>
                <li>当方は、本サービスの利用によりユーザーに生じた損害について、当方の故意または重過失による場合を除き、一切の責任を負いません。</li>
                <li>緊急避妊薬の使用や受診については、薬剤師または医師の説明を受けてください。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第7条（知的財産権）</h2>
              <p className="leading-relaxed">
                本サービスに関する知的財産権は、すべて当方または正当な権利者に帰属します。
                ユーザーは、当方の書面による事前の承諾なく、本サービスのコンテンツを複製、転載、改変、販売等することはできません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第8条（規約の変更）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>当方は、必要と判断した場合には、ユーザーへの事前通知なく本規約を変更することができます。</li>
                <li>変更後の規約は、本サービス上に掲載した時点で効力を生じます。</li>
                <li>本規約の変更後に本サービスを利用した場合、変更後の規約に同意したものとみなします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第9条（準拠法・管轄裁判所）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>本規約の解釈は、日本法に準拠します。</li>
                <li>本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">第10条（お問い合わせ）</h2>
              <p className="leading-relaxed">
                本規約に関するお問い合わせは、本サービス内のお問い合わせフォームよりご連絡ください。
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
