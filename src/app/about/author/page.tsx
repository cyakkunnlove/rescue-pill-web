import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  UserRound,
  BookOpenCheck,
  ShieldCheck,
  FileText,
  ExternalLink,
  AlertTriangle,
  Mail,
  RefreshCcw,
  Scale,
} from "lucide-react";
import { EDITORIAL_AUTHOR, SITE_IDENTITY } from "@/lib/siteIdentity";

export const metadata: Metadata = {
  title: "著者・監修について",
  description:
    "Rescue Pillの運営責任者・執筆者の紹介、コンテンツの監修方針、参考文献・情報源の一覧、および免責事項をまとめたページです。",
  alternates: {
    canonical: "https://rescue-pill.com/about/author",
  },
};

const authorJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://rescue-pill.com/about/author#profilepage",
  name: "著者・監修について",
  description:
    "Rescue Pillの運営責任者・執筆者の紹介、コンテンツの監修方針、参考文献・情報源の一覧。",
  url: "https://rescue-pill.com/about/author",
  mainEntity: {
    "@type": "Person",
    "@id": EDITORIAL_AUTHOR.id,
    name: EDITORIAL_AUTHOR.name,
    url: EDITORIAL_AUTHOR.url,
    jobTitle: EDITORIAL_AUTHOR.role,
  },
  publisher: {
    "@id": SITE_IDENTITY.id,
  },
  inLanguage: "ja",
};

const references = [
  {
    category: "制度・薬局一覧",
    items: [
      {
        title: "厚生労働省｜緊急避妊薬に関する総合案内",
        href: "https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku.html",
        description: "制度概要、販売方法、関連通知の入口ページ",
      },
      {
        title: "厚生労働省｜緊急避妊薬を販売する薬局・店舗",
        href: "https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku_00005.html",
        description: "OTC販売対応薬局の公式一覧（Rescue Pillの薬局データの一次情報）",
      },
      {
        title: "厚生労働省｜緊急避妊の対面・オンライン診療と調剤対応一覧",
        href: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000186912_00002.html",
        description: "対面診療・オンライン診療対応医療機関と調剤薬局の各一覧",
      },
    ],
  },
  {
    category: "医薬品情報",
    items: [
      {
        title: "PMDA｜ノルレボ 一般用医薬品説明文書",
        href: "https://www.info.pmda.go.jp/downfiles/otc/PDF/J2501000152_01_A.pdf",
        description: "用法・用量、安全上の注意、服用後の確認事項",
      },
      {
        title: "PMDA｜レソエル72 一般用医薬品説明文書",
        href: "https://www.info.pmda.go.jp/downfiles/otc/PDF/K2601000014_02_A.pdf",
        description: "2026年6月承認のOTC専用製剤の説明文書",
      },
    ],
  },
  {
    category: "国際機関",
    items: [
      {
        title: "WHO｜Emergency contraception（Fact sheet）",
        href: "https://www.who.int/news-room/fact-sheets/detail/emergency-contraception",
        description: "緊急避妊の作用機序、安全性、反復使用に関する国際的な公式情報",
      },
    ],
  },
  {
    category: "被害者支援",
    items: [
      {
        title: "内閣府｜性犯罪・性暴力被害者のための支援",
        href: "https://www.gender.go.jp/policy/no_violence/seibouryoku/consult.html",
        description: "全国共通短縮番号 #8891 とワンストップ支援センター",
      },
    ],
  },
];

export default function AuthorPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary-light bg-white/90 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/about"
            aria-label="このサイトについてへ戻る"
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
          <UserRound className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              著者・監修について
            </h1>
            <p className="text-sm text-text-muted mt-1">
              誰が、どの方針で、どの情報をもとに運営しているか
            </p>
          </div>
        </div>

        {/* Author Profile */}
        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <UserRound className="w-5 h-5 text-primary" />
            運営責任者・執筆者
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <div className="rounded-xl bg-primary-light/50 p-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <UserRound className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">
                    {EDITORIAL_AUTHOR.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-0.5">
                    {EDITORIAL_AUTHOR.role}
                  </p>
                </div>
              </div>
            </div>

            <p>
              Rescue Pillの企画・開発・運営・コンテンツの執筆および編集を担当しています。
              薬剤師資格を保有しており、緊急避妊薬に関する一般的な情報の整理と、安全上の注意事項の確認にその知識を活用しています。
            </p>
            <p>
              緊急避妊薬のOTC販売が2026年2月に開始されたことを受け、
              「必要な人が、必要な時に、正しい情報と最寄りの薬局にたどり着けるサービス」を個人開発プロジェクトとして立ち上げました。
            </p>
            <p>
              本サイトはあくまで一般向け情報提供と薬局・医療機関の検索支援を目的としており、
              サイト上で医師としての診断、個別の服用可否判断、診療行為、服薬指導を行うことはありません。
            </p>
          </div>
        </section>

        {/* Editorial Policy */}
        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-primary" />
            コンテンツの監修方針
          </h2>
          <div className="space-y-5 text-sm text-text-secondary leading-relaxed">
            <div>
              <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <BookOpenCheck className="w-4 h-4 text-primary" />
                一次情報の優先
              </h3>
              <p>
                日本の緊急避妊薬販売制度と承認用法に関する情報は、
                <strong className="text-text-primary">厚生労働省の通知・公開一覧</strong>および
                <strong className="text-text-primary">PMDA（医薬品医療機器総合機構）の一般用医薬品説明文書</strong>を
                一次情報として優先使用します。
              </p>
              <p className="mt-2">
                WHO（世界保健機関）等の国際的な情報は、国内の承認用法と混同しない範囲で補足目的に限定して使用します。
                記事ごとに主要な一次情報と、その出典が裏付ける内容を明示する方針です。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                医学監修の現状
              </h3>
              <p>
                現時点で、外部の医師・医療機関による医学監修は受けていません。
                薬剤師資格を持つ運営責任者が、公的機関の公開情報に基づいてコンテンツを執筆・確認していますが、
                厚生労働省、PMDA、掲載薬局・医療機関による承認・推奨・提携を示すものではありません。
              </p>
              <p className="mt-2">
                今後、外部の医療専門家による監修体制の構築を検討しています。
                監修体制が整った場合は、本ページで監修者情報を公開します。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-primary" />
                情報の更新・訂正方針
              </h3>
              <p>
                制度変更、承認文書の更新、薬局一覧の更新を確認した際は、
                影響するコンテンツとデータを見直し、最終確認日を更新します。
                重要な誤りを訂正した場合は、対象記事の更新日と訂正内容がわかる形で反映します。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4 text-primary" />
                広告と編集の独立性
              </h3>
              <p>
                Rescue Pillは広告を掲載する場合がありますが、
                広告や協賛の有無によって、医療情報の選定や結論を変更しない方針です。
                コンテンツの正確性と利用者の安全を最優先とします。
              </p>
            </div>
          </div>
        </section>

        {/* References */}
        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            参考文献・情報源一覧
          </h2>
          <div className="space-y-6">
            {references.map((group) => (
              <div key={group.category}>
                <h3 className="font-bold text-text-primary mb-2 text-sm">
                  {group.category}
                </h3>
                <div className="space-y-2">
                  {group.items.map((ref) => (
                    <a
                      key={ref.href}
                      href={ref.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-primary-light p-3 hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-medium text-text-primary">
                            {ref.title}
                          </h4>
                          <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                            {ref.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-text-muted">
            情報源の詳細と更新方針については、
            <Link href="/sources" className="text-primary hover:underline">情報源・更新方針ページ</Link>
            もあわせてご確認ください。
          </p>
        </section>

        {/* Disclaimer */}
        <section className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-3">
                免責事項
              </h2>
              <div className="space-y-3 text-sm text-amber-800 leading-relaxed">
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">医療アドバイスではありません</h3>
                  <p>
                    本サイトで提供する情報は、緊急避妊に関する一般的な情報提供を目的としており、
                    個別の医療状況に対するアドバイスを提供するものではありません。
                    緊急避妊薬の使用については、必ず医師または薬剤師にご相談ください。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">情報の正確性について</h3>
                  <p>
                    公的機関の公開情報に基づき最大限の正確性に努めていますが、
                    情報の完全性・最新性を保証するものではありません。
                    制度や薬局情報は随時変更される可能性があるため、最終確認は公式ページと医療従事者にお願いします。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">公的機関との関係</h3>
                  <p>
                    Rescue Pillは独立した個人開発プロジェクトです。
                    厚生労働省、PMDA、掲載薬局・医療機関による承認・推奨・提携を受けたサービスではありません。
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">損害に関する免責</h3>
                  <p>
                    本サービスの利用により生じた損害について、運営者の故意または重大な過失による場合を除き、
                    一切の責任を負いません。
                  </p>
                </div>
                <p className="mt-2">
                  詳しくは
                  <Link href="/disclaimer" className="font-medium text-amber-900 hover:underline">
                    免責事項の全文
                  </Link>
                  をご確認ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Corrections */}
        <section className="rounded-2xl bg-primary-light p-5 mb-6">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-text-secondary leading-relaxed">
              <h2 className="font-bold text-text-primary mb-1">
                誤りの報告・お問い合わせ
              </h2>
              <p>
                コンテンツの誤り、リンク切れ、または改善提案がございましたら、
                <Link href="/contact" className="text-primary font-medium hover:underline mx-1">
                  お問い合わせフォーム
                </Link>
                よりご連絡ください。
                なお、症状・服薬状況・妊娠の可能性などの健康情報は入力しないでください。
                個別の医療相談には回答いたしかねます。
              </p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-6">
          <h2 className="font-bold text-text-primary mb-3">関連ページ</h2>
          <div className="space-y-2">
            <Link
              href="/about"
              className="flex items-center justify-between rounded-xl border border-primary-light bg-white p-3 hover:border-primary transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">💡 このサイトについて</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
            <Link
              href="/sources"
              className="flex items-center justify-between rounded-xl border border-primary-light bg-white p-3 hover:border-primary transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">📋 情報源・更新方針</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
            <Link
              href="/guide"
              className="flex items-center justify-between rounded-xl border border-primary-light bg-white p-3 hover:border-primary transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">📖 緊急避妊薬 完全ガイド</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
            <Link
              href="/disclaimer"
              className="flex items-center justify-between rounded-xl border border-primary-light bg-white p-3 hover:border-primary transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">⚖️ 免責事項</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
            <Link
              href="/blog"
              className="flex items-center justify-between rounded-xl border border-primary-light bg-white p-3 hover:border-primary transition-colors"
            >
              <span className="text-sm font-medium text-text-primary">📝 ブログ・お知らせ</span>
              <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
