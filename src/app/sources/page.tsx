import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Heart, ShieldCheck } from "lucide-react";

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
    title: "厚生労働省｜対面・オンライン診療に関する情報",
    description: "緊急避妊に対応する医療機関とオンライン診療の運用",
    href: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000186912_00002.html",
  },
  {
    title: "厚生労働省｜オンライン診療を希望する方へ",
    description: "利用条件、薬の受け取り、服用後の確認に関する患者向け案内",
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
              最終確認日: 2026年7月13日
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
