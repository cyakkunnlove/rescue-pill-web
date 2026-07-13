"use client";

import Link from "next/link";
import { ArrowLeft, Heart, AlertTriangle, Info, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function DisclaimerPage() {
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
          <h1 className="text-2xl font-bold text-text-primary mb-2">免責事項</h1>
          <p className="text-sm text-text-muted mb-8">最終更新日: 2026年7月13日</p>

          {/* Important Notice */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-red-700 mb-2">重要なお知らせ</h2>
                <p className="text-red-600 text-sm leading-relaxed">
                  本サービス「Rescue Pill」は<strong>医療行為ではありません</strong>。
                  本サービスの情報や行動案内は参考情報であり、医療アドバイスの代替ではありません。
                  <strong>緊急避妊薬の使用については、必ず医療従事者（医師・薬剤師）にご相談ください。</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-text-secondary space-y-6">
            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">1. 医療情報に関する免責</h2>
              <div className="bg-primary-light bg-opacity-30 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary leading-relaxed">
                    本サービスで提供する情報は、緊急避妊に関する一般的な情報を提供することを目的としており、
                    個別の医療状況に対するアドバイスを提供するものではありません。
                  </p>
                </div>
              </div>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong className="text-text-primary">医療行為の代替ではない：</strong>
                  本サービスは医療行為、医療診断、医療アドバイスを提供するものではありません。
                  本サービスの利用により得られる情報は、専門の医療従事者による診察や相談の代替となるものではありません。
                </li>
                <li>
                  <strong className="text-text-primary">行動案内の限界：</strong>
                  本サービスの案内は、入力された情報に基づく一般的な参考情報です。
                  個人の健康状態、既往症、服用中の薬などにより、実際に適切な対応は異なる場合があります。
                </li>
                <li>
                  <strong className="text-text-primary">専門家への相談：</strong>
                  緊急避妊薬の使用を検討される場合は、必ず医師または薬剤師にご相談ください。
                  特に持病がある方、他の薬を服用中の方は、必ず事前に医療従事者に相談してください。
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">2. 情報の正確性</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  当方は、本サービスで提供する情報の正確性、完全性、有用性について最大限の努力を払いますが、
                  これらを保証するものではありません。
                </li>
                <li>
                  医療に関する情報は更新されます。本サービスでは確認日と一次情報を公開しますが、利用時には公式情報と医療従事者の説明を確認してください。
                </li>
                <li>
                  本サービスで紹介する薬局・医療機関の情報は、厚生労働省等の公開情報に基づいていますが、
                  営業状況、取り扱い状況等は変更される場合があります。
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">3. 損害に関する免責</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  当方は、本サービスの利用により生じた損害（直接的、間接的、偶発的、特別、結果的損害を含む）
                  について、当方の故意または重大な過失による場合を除き、一切の責任を負いません。
                </li>
                <li>
                  本サービスの判定結果に基づいて行動した結果生じた損害についても同様です。
                </li>
                <li>
                  本サービスの一時的な停止、中断、遅延、データの消失等によって生じた損害についても、
                  当方は責任を負いません。
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">4. 外部リンクについて</h2>
              <p className="leading-relaxed">
                本サービスには、外部のウェブサイトへのリンクが含まれる場合があります。
                これらの外部サイトの内容について、当方は一切の責任を負いません。
                外部サイトの利用については、各サイトの利用規約・プライバシーポリシーをご確認ください。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">5. 広告について</h2>
              <p className="leading-relaxed">
                本サービスに表示される広告の内容について、当方は一切の責任を負いません。
                広告主の製品・サービスについては、ユーザーご自身の責任においてご判断ください。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">6. 未成年者の利用について</h2>
              <p className="leading-relaxed">
                未成年の方も本サービスを利用できます。緊急避妊薬の購入に一律の年齢制限や保護者同意の要件はありません。
                厚生労働省の運用では16歳未満の方に産婦人科・小児科等への相談を勧めています。不安がある場合は、医療従事者や信頼できる支援者に相談してください。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">7. 緊急時の対応</h2>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-yellow-700 mb-2">緊急時・体調不良の場合</p>
                    <ul className="space-y-1 text-yellow-700">
                      <li>• 突然または持続する激しい腹痛、意識障害、呼吸困難など生命に関わる症状は119番へ連絡してください</li>
                      <li>• 判断に迷う場合は、対応地域の救急安心センター #7119 または医療機関へ相談してください</li>
                      <li>• 性暴力に関する支援はワンストップ支援センター #8891 を利用できます。届出は支援利用の条件ではありません</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">8. 準拠法</h2>
              <p className="leading-relaxed">
                本免責事項は日本法に準拠し、日本法に従って解釈されます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-primary mt-8 mb-4">9. 免責事項の変更</h2>
              <p className="leading-relaxed">
                当方は、必要に応じて本免責事項を変更することがあります。
                変更後の免責事項は、本サービス上に掲載した時点で効力を生じます。
              </p>
            </section>
          </div>

          {/* Final Notice */}
          <div className="mt-8 p-6 bg-gradient-to-br from-primary-light to-accent-light rounded-2xl text-center">
            <p className="text-text-primary font-medium leading-relaxed">
              本サービスをご利用いただくことで、<br />
              上記の免責事項に同意いただいたものとみなします。
            </p>
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
