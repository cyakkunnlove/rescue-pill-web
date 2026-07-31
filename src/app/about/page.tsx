import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Search,
  ShieldCheck,
  Globe,
  BookOpen,
  AlertTriangle,
  ExternalLink,
  Mail,
  Smartphone,
  Users,
} from "lucide-react";
import { EDITORIAL_AUTHOR, SITE_IDENTITY } from "@/lib/siteIdentity";

export const metadata: Metadata = {
  title: "このサイトについて",
  description:
    "Rescue Pill（レスキューピル）は、緊急避妊薬へのアクセス改善を目的とした無料Webアプリです。厚生労働省の公開情報をもとに、OTC対応薬局の検索と一般的な行動案内を提供します。",
  alternates: {
    canonical: "https://rescue-pill.com/about",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://rescue-pill.com/about#aboutpage",
  name: "Rescue Pill について",
  description:
    "緊急避妊薬へのアクセス改善を目的とした無料Webアプリ。厚生労働省の公開情報に基づく薬局検索と行動案内を提供。",
  url: "https://rescue-pill.com/about",
  mainEntity: {
    "@id": SITE_IDENTITY.id,
  },
  author: {
    "@id": EDITORIAL_AUTHOR.id,
  },
  publisher: {
    "@id": SITE_IDENTITY.id,
  },
  inLanguage: "ja",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary-light bg-white/90 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            aria-label="トップページへ戻る"
            className="min-w-11 min-h-11 flex items-center justify-center p-2 -ml-2 hover:bg-primary-light rounded-xl transition-colors"
          >
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

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="flex items-start gap-3 mb-6">
          <Heart className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              このサイトについて
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Rescue Pill（レスキューピル）の目的と運営方針
            </p>
          </div>
        </div>

        {/* What is Rescue Pill */}
        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            Rescue Pill とは
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              <strong className="text-text-primary">Rescue Pill（レスキューピル）</strong>は、
              緊急避妊薬（アフターピル）へのアクセス改善を目的とした<strong className="text-text-primary">無料のWebアプリケーション</strong>です。
              「もしもの時も、あわてず、次の一歩へ」をコンセプトに、緊急避妊が必要になった方が迅速かつ正確に行動できるようサポートします。
            </p>
            <p>
              2026年2月2日から、日本でも処方箋なしで緊急避妊薬を薬局で購入できるようになりました。
              しかし、すべての薬局で販売されているわけではなく、「どの薬局に行けばいいのか」「いつまでに服用すればいいのか」「費用はいくらかかるのか」など、
              緊急時に必要な情報をすぐに得ることは容易ではありません。
            </p>
            <p>
              Rescue Pillは、こうした情報格差をなくし、必要な人が必要な時に正しい情報にたどり着けるよう設計されています。
              スマートフォンひとつで、現在地や住所から最寄りのOTC対応薬局を検索し、
              簡単な質問に答えるだけで次に取るべき行動を確認できます。
            </p>
          </div>
        </section>

        {/* Why we built it */}
        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            なぜ作ったのか
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              緊急避妊薬のOTC販売が始まったことは大きな前進ですが、
              実際にアクセスしようとすると、いくつかの壁が存在します。
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-text-primary">情報の分散：</strong>
                販売薬局の一覧は厚生労働省のウェブサイトに掲載されていますが、PDFや表形式で、緊急時にスマートフォンから検索しにくい状態でした。
              </li>
              <li>
                <strong className="text-text-primary">知識の不足：</strong>
                緊急避妊薬の存在自体を知らない、あるいは入手方法がわからないという方がまだ多くいます。
              </li>
              <li>
                <strong className="text-text-primary">時間的プレッシャー：</strong>
                緊急避妊薬は性交後72時間以内の早期服用が重要です。焦りや不安の中で冷静に情報を探すのは困難です。
              </li>
              <li>
                <strong className="text-text-primary">心理的障壁：</strong>
                相談しづらいテーマだからこそ、まず自分一人で正しい情報を確認できる環境が必要です。
              </li>
            </ul>
            <p>
              Rescue Pillは、これらの課題を解決するために生まれた個人開発プロジェクトです。
              テクノロジーの力で、一人でも多くの人が適切なタイミングで正しい選択肢にたどり着けることを目指しています。
            </p>
          </div>
        </section>

        {/* Main Features */}
        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            主な機能
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <div className="rounded-xl bg-primary-light/50 p-4">
              <h3 className="font-bold text-text-primary mb-1">📍 薬局検索</h3>
              <p>
                厚生労働省が公開するOTC販売対応薬局の一覧データをもとに、現在地や住所から最寄りの薬局を検索できます。
                営業時間や対応状況など、緊急時に必要な情報を地図とリスト形式で表示します。
              </p>
            </div>
            <div className="rounded-xl bg-primary-light/50 p-4">
              <h3 className="font-bold text-text-primary mb-1">🏥 医療機関検索</h3>
              <p>
                OTC販売の条件を満たさない場合や、より詳しい相談が必要な場合のために、
                緊急避妊に対応する産婦人科・婦人科の検索機能も提供しています。
              </p>
            </div>
            <div className="rounded-xl bg-primary-light/50 p-4">
              <h3 className="font-bold text-text-primary mb-1">✅ セルフチェック</h3>
              <p>
                簡単な質問に答えることで、現在の状況に応じた一般的な行動案内を確認できます。
                薬局でのOTC購入、医療機関の受診、オンライン診療など、最適な選択肢を提示します。
              </p>
            </div>
            <div className="rounded-xl bg-primary-light/50 p-4">
              <h3 className="font-bold text-text-primary mb-1">📚 情報ガイド</h3>
              <p>
                緊急避妊薬の基礎知識、入手方法、費用、服用後の注意点など、
                信頼できる情報源に基づいた包括的なガイドを提供しています。
              </p>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            情報源について
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              Rescue Pillが提供する情報は、以下の公的機関・国際機関の公開情報に基づいています。
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-text-primary">厚生労働省</strong> — 緊急避妊薬の販売制度、OTC対応薬局一覧、対面・オンライン診療対応医療機関一覧
              </li>
              <li>
                <strong className="text-text-primary">PMDA（医薬品医療機器総合機構）</strong> — 一般用医薬品の説明文書（ノルレボ、レソエル72）
              </li>
              <li>
                <strong className="text-text-primary">WHO（世界保健機関）</strong> — 緊急避妊に関する国際的なファクトシート
              </li>
              <li>
                <strong className="text-text-primary">内閣府</strong> — 性犯罪・性暴力被害者支援に関する情報
              </li>
            </ul>
            <p>
              情報源の詳細と更新方針については、
              <Link href="/sources" className="text-primary font-medium hover:underline">
                情報源・更新方針ページ
              </Link>
              をご確認ください。
            </p>
          </div>
        </section>

        {/* Important Notice - Not Medical */}
        <section className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2">
                医療判定・処方を行うサイトではありません
              </h2>
              <div className="space-y-2 text-sm text-amber-800 leading-relaxed">
                <p>
                  Rescue Pillは一般的な情報提供と薬局・医療機関の検索支援を目的としています。
                  以下の点にご留意ください。
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>医師による診断、個別の服用可否の判断、処方、服薬指導は行いません</li>
                  <li>セルフチェック機能の結果は一般的な行動案内であり、医療アドバイスの代替ではありません</li>
                  <li>緊急避妊薬の使用にあたっては、必ず薬剤師または医師に相談してください</li>
                  <li>体調に異変を感じた場合は、速やかに医療機関を受診してください</li>
                </ul>
                <p className="mt-2">
                  詳しくは
                  <Link href="/disclaimer" className="font-medium text-amber-900 hover:underline">
                    免責事項
                  </Link>
                  をご確認ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Operator Info */}
        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            運営者情報
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-primary-light">
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-text-primary whitespace-nowrap">サービス名</td>
                    <td className="py-2.5">Rescue Pill（レスキューピル）</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-text-primary whitespace-nowrap">運営形態</td>
                    <td className="py-2.5">個人開発プロジェクト</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-text-primary whitespace-nowrap">運営責任者</td>
                    <td className="py-2.5">
                      <Link href="/about/author" className="text-primary font-medium hover:underline">
                        {EDITORIAL_AUTHOR.name}
                      </Link>
                      （{EDITORIAL_AUTHOR.role}）
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-text-primary whitespace-nowrap">URL</td>
                    <td className="py-2.5">
                      <a href={SITE_IDENTITY.url} className="text-primary hover:underline">
                        {SITE_IDENTITY.url}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-text-primary whitespace-nowrap">お問い合わせ</td>
                    <td className="py-2.5">
                      <Link href="/contact" className="text-primary font-medium hover:underline">
                        お問い合わせフォーム
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-text-primary whitespace-nowrap">利用料金</td>
                    <td className="py-2.5">無料（通信料はユーザー負担）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              本サービスは厚生労働省、PMDA、掲載薬局・医療機関との提携・承認を受けたものではなく、
              独立した情報提供サービスです。
            </p>
          </div>
        </section>

        {/* E-E-A-T / Trust */}
        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            信頼性への取り組み
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              Rescue Pillは、医療・健康に関わるサービスとして、
              情報の正確性と透明性を重視しています。
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-text-primary">一次情報の優先：</strong>
                厚生労働省やPMDAなどの公的機関の公開情報を一次情報として使用し、出典を明記します
              </li>
              <li>
                <strong className="text-text-primary">定期的な情報更新：</strong>
                薬局一覧データは厚生労働省の更新に合わせて反映し、制度変更にも対応します
              </li>
              <li>
                <strong className="text-text-primary">編集方針の公開：</strong>
                <Link href="/sources#editorial-policy" className="text-primary font-medium hover:underline">
                  情報源・更新方針ページ
                </Link>
                で、執筆・編集の責任者と情報源の優先順位を公開しています
              </li>
              <li>
                <strong className="text-text-primary">訂正の受付：</strong>
                誤りやリンク切れの報告を
                <Link href="/contact" className="text-primary font-medium hover:underline">
                  お問い合わせフォーム
                </Link>
                で受け付け、迅速に対応します
              </li>
              <li>
                <strong className="text-text-primary">広告と編集の独立：</strong>
                広告や協賛の有無にかかわらず、医療情報の選定や結論を変更しません
              </li>
            </ul>
          </div>
        </section>

        {/* Related Links */}
        <section className="rounded-2xl bg-primary-light p-5 mb-6">
          <h2 className="font-bold text-text-primary mb-3">関連ページ</h2>
          <div className="space-y-2">
            <Link
              href="/guide"
              className="flex items-center justify-between rounded-xl bg-white p-3 hover:border-primary border border-transparent transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">📖 緊急避妊薬 完全ガイド</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
            <Link
              href="/about/author"
              className="flex items-center justify-between rounded-xl bg-white p-3 hover:border-primary border border-transparent transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">👤 著者・監修について</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
            <Link
              href="/sources"
              className="flex items-center justify-between rounded-xl bg-white p-3 hover:border-primary border border-transparent transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">📋 情報源・更新方針</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
            <Link
              href="/pharmacies"
              className="flex items-center justify-between rounded-xl bg-white p-3 hover:border-primary border border-transparent transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">💊 OTC対応薬局を探す</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
            <Link
              href="/blog"
              className="flex items-center justify-between rounded-xl bg-white p-3 hover:border-primary border border-transparent transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">📝 ブログ・お知らせ</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Mail className="w-4 h-4" />
            お問い合わせ・ご連絡はこちら
          </Link>
        </div>
      </main>
    </div>
  );
}
