import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  ExternalLink,
  Heart,
  Mail,
  RefreshCcw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { EDITORIAL_AUTHOR } from "@/lib/siteIdentity";

export const metadata: Metadata = {
  title: "情報源・更新方針",
  description:
    "Rescue Pillが参照する厚生労働省・PMDA等の一次情報と、医療情報・薬局データの更新方針を公開しています。",
  alternates: {
    canonical: "https://rescue-pill.com/sources",
  },
};

const sources = [
  {
    title: "厚生労働省｜緊急避妊薬の試験販売に係る調査研究 最終報告書",
    description: "2023年11月〜2026年2月の試験販売12,268件と、薬局で生じた課題・対応事例の最終集計",
    href: "https://www.mhlw.go.jp/stf/newpage_40123.html",
  },
  {
    title: "厚生労働省｜緊急避妊薬に関する総合案内",
    description: "制度、販売方法、関連する公式情報の入口",
    href: "https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku.html",
  },
  {
    title: "厚生労働省｜緊急避妊薬を販売する薬局・店舗",
    description: "2026年7月1日更新の公式一覧。掲載内容は随時変更されます",
    href: "https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku_00005.html",
  },
  {
    title: "厚生労働省｜緊急避妊の対面・オンライン診療と調剤対応一覧",
    description: "対面診療可能な医療機関、オンライン診療、調剤対応薬局の各一覧",
    href: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000186912_00002.html",
  },
  {
    title: "厚生労働省｜オンライン診療一般の利用上の注意",
    description: "オンライン診療の一般的な制限、受診の流れ、対面診療への切替",
    href: "https://www.mhlw.go.jp/stf/newpage_38226.html",
  },
  {
    title: "PMDA｜ノルレボ 一般用医薬品説明文書",
    description: "用法、安全上の注意、服用後の確認事項",
    href: "https://www.info.pmda.go.jp/downfiles/otc/PDF/J2501000152_01_A.pdf",
  },
  {
    title: "PMDA｜レソエル72 一般用医薬品説明文書",
    description: "2026年6月5日更新の用法・安全情報",
    href: "https://www.info.pmda.go.jp/downfiles/otc/PDF/K2601000014_02_A.pdf",
  },
  {
    title: "内閣府｜性犯罪・性暴力被害者のための支援",
    description: "全国共通短縮番号 #8891 とワンストップ支援センター",
    href: "https://www.gender.go.jp/policy/no_violence/seibouryoku/consult.html",
  },
  {
    title: "WHO｜Emergency contraception",
    description: "緊急避妊の作用、安全性、反復使用に関する国際的な公式情報",
    href: "https://www.who.int/news-room/fact-sheets/detail/emergency-contraception",
  },
];

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-background">
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
        <div className="flex items-start gap-3 mb-6">
          <ShieldCheck className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              情報源・更新方針
            </h1>
            <p className="text-sm text-text-muted mt-1">
              最終確認日: 2026年8月3日
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-primary-light bg-white p-5 mb-8">
          <h2 className="font-bold text-text-primary mb-3">現在の重要情報</h2>
          <ul className="space-y-3 text-sm text-text-secondary leading-relaxed list-disc pl-5">
            <li>
              処方箋なしの対面販売は2026年2月2日に開始されました。厚生労働省の一覧にある薬局・店舗で、研修を修了した薬剤師の説明を受け、本人がその場で服用します。
            </li>
            <li>
              薬局販売される緊急避妊薬の承認された用法は、性交後72時間以内に1錠をできるだけ早く服用することです。72時間を過ぎても自己判断であきらめず、医療機関へ直ちに相談してください。
            </li>
            <li>
              100%妊娠を防ぐ薬ではありません。服用約3週間後に妊娠検査薬または産婦人科で妊娠の有無を確認してください。
            </li>
            <li>
              厚生労働省が2026年7月31日に掲載した最終報告書では、試験販売12,268件を解析し、来店前の在庫・研修修了薬剤師の勤務確認、プライバシー、多言語対応などの課題が整理されています。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-4">
            参照している一次情報
          </h2>
          <div className="space-y-3">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-primary-light bg-white p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">
                      {source.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                      {source.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          id="editorial-policy"
          className="mt-10 scroll-mt-24 rounded-2xl border border-primary-light bg-white p-5"
        >
          <div className="flex items-start gap-3">
            <UserRound className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                運営者・編集方針
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                誰が、どの情報をもとに、どのように更新するかを公開します。
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-text-secondary">
            <div>
              <h3 className="flex items-center gap-2 font-bold text-text-primary">
                <UserRound className="h-4 w-4 text-primary" />
                執筆・編集責任
              </h3>
              <p className="mt-2">
                <strong className="text-text-primary">
                  {EDITORIAL_AUTHOR.name}
                </strong>
                （薬剤師・Rescue Pill運営責任者）が、一般向け情報として執筆・編集・内容確認を行います。薬剤師資格は、情報の整理と安全上の注意の確認に生かしていますが、本サイト上で診断、個別の服用可否判断、診療、服薬指導は行いません。
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-bold text-text-primary">
                <BookOpenCheck className="h-4 w-4 text-primary" />
                情報源の優先順位
              </h3>
              <p className="mt-2">
                日本の販売制度と承認用法は、厚生労働省の通知・公開一覧、PMDAの一般用医薬品説明文書を優先します。WHO等の情報は、国内の承認用法と混同しない範囲で補足に限って使用します。記事ごとに主要な一次情報と、その出典が裏付ける内容を表示します。
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-bold text-text-primary">
                <RefreshCcw className="h-4 w-4 text-primary" />
                更新・訂正
              </h3>
              <p className="mt-2">
                制度、承認文書、薬局一覧の更新を確認した際は、影響する記事とデータを見直し、最終確認日を更新します。重要な誤りを訂正した場合は、対象記事の更新日と訂正内容が分かる形で反映します。
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-bold text-text-primary">
                <ShieldCheck className="h-4 w-4 text-primary" />
                医学監修・独立性
              </h3>
              <p className="mt-2">
                現時点で、外部の医師・医療機関による医学監修は受けていません。厚生労働省、PMDA、掲載薬局・医療機関による承認・推奨・提携を示すものでもありません。広告や協賛の有無によって、医療情報の選定や結論を変更しない方針です。
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-bold text-text-primary">
                <Mail className="h-4 w-4 text-primary" />
                訂正の連絡
              </h3>
              <p className="mt-2">
                誤りやリンク切れは
                <Link href="/contact" className="mx-1 font-medium text-primary hover:underline">
                  お問い合わせフォーム
                </Link>
                からお知らせください。症状、服薬状況、妊娠の可能性などの健康情報は入力しないでください。個別相談には回答せず、緊急時は医療機関や公的相談窓口をご利用ください。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-primary-light p-5 text-sm text-text-secondary leading-relaxed">
          <h2 className="font-bold text-text-primary mb-2">更新と位置づけ</h2>
          <p>
            Rescue Pillは公的機関の公開情報をもとに、一般的な行動案内と検索機能を提供する独立したサービスです。厚生労働省、PMDA、掲載薬局・医療機関との提携や医療監修を示すものではなく、診断・診療の代替ではありません。制度や店舗情報は変わるため、最終確認は公式ページと医療従事者にお願いします。
          </p>
        </section>
      </main>
    </div>
  );
}
