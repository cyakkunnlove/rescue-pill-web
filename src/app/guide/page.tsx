import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Clock,
  Pill,
  Banknote,
  CheckCircle,
  HelpCircle,
  Phone,
  ExternalLink,
  AlertTriangle,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { EDITORIAL_AUTHOR, SITE_IDENTITY } from "@/lib/siteIdentity";

export const metadata: Metadata = {
  title: "緊急避妊薬 完全ガイド｜入手方法・費用・服用タイミング",
  description:
    "緊急避妊薬（アフターピル）の入手方法、費用、服用タイミング、効果、よくある質問を網羅した完全ガイド。薬局OTC購入・医療機関・オンライン診療の3つの方法を詳しく解説します。",
  alternates: {
    canonical: "https://rescue-pill.com/guide",
  },
};

const guideJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://rescue-pill.com/guide#article",
  headline: "緊急避妊薬 完全ガイド｜入手方法・費用・服用タイミング",
  description:
    "緊急避妊薬（アフターピル）の入手方法、費用、服用タイミング、効果、よくある質問を網羅した完全ガイド。",
  url: "https://rescue-pill.com/guide",
  datePublished: "2026-07-24",
  dateModified: "2026-08-03",
  author: {
    "@id": EDITORIAL_AUTHOR.id,
  },
  publisher: {
    "@id": SITE_IDENTITY.id,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://rescue-pill.com/guide",
  },
  inLanguage: "ja",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://rescue-pill.com/guide#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "緊急避妊薬は薬局で買えますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。2026年2月2日から、販売要件を満たし厚生労働省の一覧に掲載された薬局・店舗で処方箋なしに購入できます。研修を修了した薬剤師の説明を受け、購入する本人がその場で服用します。来店前に在庫と販売可能な薬剤師の勤務を電話で確認してください。",
      },
    },
    {
      "@type": "Question",
      name: "緊急避妊薬の費用はいくらですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "厚生労働省の試験販売では7,000〜9,000円が中心でしたが、これは試験期間中の実績です。現在の価格は製品・薬局・医療機関により異なるため、利用先へ事前に確認してください。通常は保険適用外で全額自費です。",
      },
    },
    {
      "@type": "Question",
      name: "72時間を過ぎたら効果はないですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "日本で承認されている緊急避妊薬（レボノルゲストレル製剤）の用法は性交後72時間以内ですが、72時間を過ぎても自己判断で諦めず、速やかに産婦人科を受診してください。医師が状況に応じた対応を提案できます。",
      },
    },
    {
      "@type": "Question",
      name: "未成年でも購入できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "緊急避妊薬の購入に一律の年齢制限や保護者同意の要件はありません。厚生労働省の運用では16歳未満の方に産婦人科・小児科等への相談を勧めています。不安がある場合は、医療機関や信頼できる支援者に相談してください。",
      },
    },
    {
      "@type": "Question",
      name: "服用後に気をつけることはありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "服用後約3週間後に妊娠検査薬または産婦人科で妊娠の有無を確認してください。服用後2時間以内に嘔吐した場合は効果が低下する可能性があるため、医療機関に相談してください。次の月経が予定日より1週間以上遅れる場合も産婦人科を受診しましょう。",
      },
    },
  ],
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          <BookOpen className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              緊急避妊薬 完全ガイド
            </h1>
            <p className="text-sm text-text-muted mt-1">
              入手方法・費用・服用タイミングを詳しく解説
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="rounded-2xl border border-primary-light bg-white p-5 mb-8">
          <h2 className="font-bold text-text-primary mb-3">目次</h2>
          <ol className="space-y-1.5 text-sm text-primary list-decimal pl-5">
            <li><a href="#what" className="hover:underline">緊急避妊薬とは</a></li>
            <li><a href="#how-to-get" className="hover:underline">入手方法（3つの選択肢）</a></li>
            <li><a href="#timing" className="hover:underline">服用タイミングと効果</a></li>
            <li><a href="#cost" className="hover:underline">費用について</a></li>
            <li><a href="#before-visit" className="hover:underline">来店前に準備すること</a></li>
            <li><a href="#after" className="hover:underline">服用後の確認事項</a></li>
            <li><a href="#faq" className="hover:underline">よくある質問</a></li>
            <li><a href="#support" className="hover:underline">相談先・参考リンク</a></li>
          </ol>
        </nav>

        {/* 1. What is Emergency Contraception */}
        <section id="what" className="scroll-mt-24 rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            1. 緊急避妊薬とは
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              <strong className="text-text-primary">緊急避妊薬（アフターピル）</strong>は、
              避妊に失敗した場合や、性暴力を受けた場合など、望まない妊娠を防ぐために使用される医薬品です。
              「モーニングアフターピル」とも呼ばれますが、朝に限らず性交後できるだけ早く服用することが重要です。
            </p>
            <p>
              日本で承認されている緊急避妊薬は<strong className="text-text-primary">レボノルゲストレル（LNG）</strong>を有効成分とする製剤で、
              代表的な製品に「ノルレボ錠」およびその後発品があります。
              2026年6月にはOTC専用の「レソエル72」も承認されました。
            </p>
            <p>
              緊急避妊薬は、主に排卵を遅らせることで妊娠を防ぎます。
              すでに受精卵が着床している場合には効果がありません。
              WHO（世界保健機関）は、緊急避妊薬は<strong className="text-text-primary">安全性の高い医薬品</strong>であり、
              重篤な副作用のリスクは極めて低いとしています。
            </p>
            <p>
              ただし、100%妊娠を防ぐ薬ではありません。
              性交後72時間以内の服用で妊娠阻止率は約85%とされ、服用が早いほど効果が高くなります。
            </p>
          </div>
        </section>

        {/* 2. How to Get */}
        <section id="how-to-get" className="scroll-mt-24 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            2. 入手方法（3つの選択肢）
          </h2>

          {/* Method 1: OTC */}
          <div className="rounded-2xl border-2 border-primary bg-white p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">1</div>
              <h3 className="font-bold text-text-primary">薬局でのOTC購入（処方箋不要）</h3>
            </div>
            <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
              <p>
                2026年2月2日から、販売要件を満たし厚生労働省の一覧に掲載された薬局・店舗で、処方箋なしに緊急避妊薬を購入できるようになりました。
                これが最も迅速な入手方法です。
              </p>
              <div className="rounded-xl bg-primary-light/50 p-3">
                <h4 className="font-bold text-text-primary mb-1">購入の流れ</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>OTC対応薬局を確認する（<Link href="/pharmacies" className="text-primary font-medium hover:underline">薬局検索はこちら</Link>）</li>
                  <li>薬局を訪問し、研修を修了した薬剤師から説明を受ける</li>
                  <li>薬局内でその場で服用する（持ち帰りはできません）</li>
                </ol>
              </div>
              <div className="rounded-xl bg-amber-50 p-3">
                <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  注意点
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-amber-800">
                  <li>すべての薬局で販売しているわけではありません</li>
                  <li>来店前に在庫・販売可能な薬剤師の勤務・営業時間を電話で確認してください</li>
                  <li>年齢確認などのため、本人確認書類の提示を求められる場合があります</li>
                  <li>代理購入はできません（本人がその場で服用する必要があります）</li>
                  <li>薬局の営業時間外は利用できません</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Method 2: Medical Institution */}
          <div className="rounded-2xl border border-primary-light bg-white p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm">2</div>
              <h3 className="font-bold text-text-primary">医療機関（産婦人科・婦人科）での処方</h3>
            </div>
            <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
              <p>
                産婦人科や婦人科を受診し、医師の処方を受けて服用する方法です。
                OTC販売開始前から利用できる、従来の入手方法です。
              </p>
              <div className="rounded-xl bg-primary-light/50 p-3">
                <h4 className="font-bold text-text-primary mb-1">こんな場合に適しています</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>近くにOTC対応薬局がない</li>
                  <li>持病がある・他の薬を服用中で、医師に相談したい</li>
                  <li>性交後72時間以上が経過している（医師が状況に応じて対応を提案）</li>
                  <li>性暴力被害を受けた（ワンストップ支援センターからの紹介も可能）</li>
                </ul>
              </div>
              <p>
                <Link href="/hospitals" className="text-primary font-medium hover:underline">
                  対応医療機関の検索はこちら →
                </Link>
              </p>
            </div>
          </div>

          {/* Method 3: Online */}
          <div className="rounded-2xl border border-primary-light bg-white p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">3</div>
              <h3 className="font-bold text-text-primary">オンライン診療</h3>
            </div>
            <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
              <p>
                スマートフォンやパソコンを使って医師のオンライン診療を受ける方法です。
                現行の厚生労働省案内では、診療後に処方箋が対応薬局へ送られ、本人がその薬局で研修修了薬剤師の説明を受け、面前で服用します。自宅配送で完結する経路ではありません。
              </p>
              <div className="rounded-xl bg-amber-50 p-3">
                <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  オンライン診療の注意点
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-amber-800">
                  <li>オンライン診療に対応する医療機関と、処方箋を受ける対応薬局の両方を確認してください</li>
                  <li>薬局まで移動して面前で服用する時間を含め、72時間以内のできるだけ早い服用が必要です</li>
                  <li>初診でのオンライン処方に対応していない医療機関もあります</li>
                  <li>対面での受診が必要と判断される場合があります</li>
                </ul>
              </div>
              <p className="text-xs text-text-muted">
                ※ 緊急性が高い場合は、OTC対応薬局または対面の医療機関を優先してください。
              </p>
            </div>
          </div>
        </section>

        {/* 3. Timing and Effectiveness */}
        <section id="timing" className="scroll-mt-24 rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            3. 服用タイミングと効果
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              緊急避妊薬は<strong className="text-text-primary">できるだけ早く服用することが最も重要</strong>です。
              日本で承認されている用法は、性交後72時間（3日）以内に1錠を服用するというものです。
            </p>

            <div className="grid gap-3 mt-4">
              <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-800 text-sm">12時間以内</span>
                </div>
                <p className="text-xs text-green-700">最も効果が高い。可能な限りこの時間内に服用を目指しましょう。</p>
              </div>
              <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="font-bold text-yellow-800 text-sm">12〜24時間以内</span>
                </div>
                <p className="text-xs text-yellow-700">高い効果が期待できます。早めの行動を。</p>
              </div>
              <div className="rounded-xl bg-orange-50 border border-orange-200 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="font-bold text-orange-800 text-sm">24〜72時間以内</span>
                </div>
                <p className="text-xs text-orange-700">効果はありますが、時間の経過とともに低下します。</p>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-red-800 text-sm">72時間以降</span>
                </div>
                <p className="text-xs text-red-700">承認された用法の範囲外です。自己判断であきらめず、速やかに産婦人科を受診してください。</p>
              </div>
            </div>

            <div className="rounded-xl bg-primary-light p-4 mt-4">
              <p className="text-sm text-text-primary font-medium">
                💡 ポイント：「72時間以内」は上限であり目標ではありません。1時間でも早く服用することが、効果を最大化する最善の方法です。
              </p>
            </div>
          </div>
        </section>

        {/* 4. Cost */}
        <section id="cost" className="scroll-mt-24 rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <Banknote className="w-5 h-5 text-primary" />
            4. 費用について
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              緊急避妊薬は<strong className="text-text-primary">保険適用外</strong>のため、全額自費となります。
              入手方法、製品、施設によって費用は異なります。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary-light">
                    <th className="py-2.5 pr-3 text-left font-bold text-text-primary">入手方法</th>
                    <th className="py-2.5 text-left font-bold text-text-primary">費用目安</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-light">
                  <tr>
                    <td className="py-2.5 pr-3">薬局OTC購入</td>
                    <td className="py-2.5 font-medium text-text-primary">店舗・製品により異なる</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3">医療機関（対面）</td>
                    <td className="py-2.5 font-medium text-text-primary">医療機関へ要確認</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3">オンライン診療</td>
                    <td className="py-2.5 font-medium text-text-primary">診療先・薬局へ要確認</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-text-muted">
              ※ 厚生労働省の最終報告書では、試験販売時の価格は7,000〜9,000円が中心でした。これは2026年2月1日までの試験販売実績であり、現在の販売価格を保証するものではありません。事前に利用先へご確認ください。
            </p>
            <p>
              性暴力被害の場合、公費負担制度により費用が補填される場合があります。
              最寄りの<strong className="text-text-primary">ワンストップ支援センター（#8891）</strong>にご相談ください。
            </p>
          </div>
        </section>

        {/* Before visiting a pharmacy */}
        <section id="before-visit" className="scroll-mt-24 rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            来店前に準備すること
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              厚生労働省の試験販売最終報告書では、研修修了薬剤師の不在や日本語での意思疎通が難しいことが、販売できなかった主な理由として報告されています。移動前に電話し、次の点を確認・整理してください。
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>在庫、販売可能な薬剤師の勤務、受付できる時間</li>
              <li>性交の日時、最終月経、妊娠検査の結果、出産・中絶後の場合はその時期</li>
              <li>服用中の薬やサプリメント、治療中の病気</li>
              <li>緊急避妊薬を以前に服用したことがある場合は、その時期と回数</li>
              <li>日本語での相談が難しい場合に、希望する言語で対応できるか</li>
            </ul>
            <p className="text-xs text-text-muted">
              妊娠の可能性や服用可否をこのサイトだけで判断することはできません。薬剤師または医師に、分かる範囲で正確に伝えてください。
            </p>
          </div>
        </section>

        {/* 5. After Taking */}
        <section id="after" className="scroll-mt-24 rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            5. 服用後の確認事項
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              緊急避妊薬を服用した後は、以下の点を確認してください。
            </p>
            <div className="space-y-3">
              <div className="rounded-xl bg-primary-light/50 p-4">
                <h3 className="font-bold text-text-primary mb-1">🔍 妊娠の確認（約3週間後）</h3>
                <p>
                  服用から約3週間後に、市販の妊娠検査薬または産婦人科で妊娠の有無を確認してください。
                  緊急避妊薬は100%の効果ではないため、この確認は必ず行ってください。
                </p>
              </div>
              <div className="rounded-xl bg-primary-light/50 p-4">
                <h3 className="font-bold text-text-primary mb-1">🤢 服用後の嘔吐</h3>
                <p>
                  服用後2時間以内に嘔吐した場合、薬が十分に吸収されていない可能性があります。
                  速やかに処方した医師・薬剤師に連絡するか、医療機関を受診してください。
                </p>
              </div>
              <div className="rounded-xl bg-primary-light/50 p-4">
                <h3 className="font-bold text-text-primary mb-1">📅 月経の確認</h3>
                <p>
                  次の月経が予定日より1週間以上遅れる場合は、産婦人科を受診してください。
                  服用後に出血があっても、月経とは限りません。通常の月経が来るまで注意が必要です。
                </p>
              </div>
              <div className="rounded-xl bg-primary-light/50 p-4">
                <h3 className="font-bold text-text-primary mb-1">⚠️ 体調の変化</h3>
                <p>
                  頭痛、吐き気、倦怠感、不正出血などの軽い副作用が起こることがあります。
                  多くは数日で改善しますが、激しい腹痛や持続する異常がある場合は医療機関を受診してください。
                </p>
              </div>
              <div className="rounded-xl bg-primary-light/50 p-4">
                <h3 className="font-bold text-text-primary mb-1">💊 今後の避妊</h3>
                <p>
                  緊急避妊薬はあくまで「緊急」の手段です。今後の避妊方法については、
                  産婦人科で低用量ピルやIUD（子宮内避妊具）など、継続的な避妊法について相談することをおすすめします。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section id="faq" className="scroll-mt-24 rounded-2xl border border-primary-light bg-white p-5 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            6. よくある質問
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl border border-primary-light overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-white hover:bg-primary-light/30 transition-colors">
                <span className="font-medium text-text-primary text-sm pr-4">Q. 緊急避妊薬は薬局で買えますか？</span>
                <span className="text-primary text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-secondary leading-relaxed">
                <p>
                  はい。2026年2月2日から、販売要件を満たし厚生労働省の一覧に掲載された薬局・店舗で処方箋なしに購入できます。
                  研修を修了した薬剤師の説明を受け、本人がその場で服用します。
                  すべての薬局で販売しているわけではないため、事前に
                  <Link href="/pharmacies" className="text-primary font-medium hover:underline">対応薬局を確認</Link>
                  してください。
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-primary-light overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-white hover:bg-primary-light/30 transition-colors">
                <span className="font-medium text-text-primary text-sm pr-4">Q. 緊急避妊薬の費用はいくらですか？</span>
                <span className="text-primary text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-secondary leading-relaxed">
                <p>
                  厚生労働省の試験販売では7,000〜9,000円が中心でしたが、これは2026年2月1日までの実績です。
                  現在の価格は製品・薬局・医療機関により異なるため、利用先へ事前に確認してください。
                  通常は保険適用外で全額自費です。性暴力被害の場合は公費負担制度がある場合があります。
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-primary-light overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-white hover:bg-primary-light/30 transition-colors">
                <span className="font-medium text-text-primary text-sm pr-4">Q. 72時間を過ぎたら効果はないですか？</span>
                <span className="text-primary text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-secondary leading-relaxed">
                <p>
                  日本で承認されている緊急避妊薬（レボノルゲストレル製剤）の用法は性交後72時間以内ですが、
                  72時間を過ぎても自己判断で諦めず、速やかに産婦人科を受診してください。
                  医師が状況に応じた対応を提案できます。
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-primary-light overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-white hover:bg-primary-light/30 transition-colors">
                <span className="font-medium text-text-primary text-sm pr-4">Q. 未成年でも購入できますか？</span>
                <span className="text-primary text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-secondary leading-relaxed">
                <p>
                  緊急避妊薬の購入に一律の年齢制限や保護者同意の要件はありません。
                  厚生労働省の運用では16歳未満の方に産婦人科・小児科等への相談を勧めています。
                  不安がある場合は、医療機関や信頼できる支援者に相談してください。
                </p>
              </div>
            </details>

            <details className="group rounded-xl border border-primary-light overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-white hover:bg-primary-light/30 transition-colors">
                <span className="font-medium text-text-primary text-sm pr-4">Q. 服用後に気をつけることはありますか？</span>
                <span className="text-primary text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-secondary leading-relaxed">
                <p>
                  服用後約3週間後に妊娠検査薬または産婦人科で妊娠の有無を確認してください。
                  服用後2時間以内に嘔吐した場合は効果が低下する可能性があるため、医療機関に相談してください。
                  次の月経が予定日より1週間以上遅れる場合も産婦人科を受診しましょう。
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* 7. Support & Links */}
        <section id="support" className="scroll-mt-24 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            7. 相談先・参考リンク
          </h2>

          {/* Emergency Numbers */}
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 mb-4">
            <h3 className="font-bold text-amber-900 mb-3">緊急連絡先</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900">救急（生命に関わる症状）：119</p>
                  <p className="text-xs text-amber-700">激しい腹痛、意識障害、呼吸困難など</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900">救急安心センター：#7119</p>
                  <p className="text-xs text-amber-700">救急車を呼ぶか迷ったとき（対応地域に限る）</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900">性暴力被害相談：#8891</p>
                  <p className="text-xs text-amber-700">ワンストップ支援センター（届出は支援利用の条件ではありません）</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Links */}
          <div className="rounded-2xl border border-primary-light bg-white p-5">
            <h3 className="font-bold text-text-primary mb-3">参考リンク</h3>
            <div className="space-y-2">
              <a
                href="https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-primary-light p-3 hover:border-primary transition-colors"
              >
                <span className="text-sm text-text-primary">厚生労働省｜緊急避妊薬に関する総合案内</span>
                <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
              </a>
              <a
                href="https://www.who.int/news-room/fact-sheets/detail/emergency-contraception"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-primary-light p-3 hover:border-primary transition-colors"
              >
                <span className="text-sm text-text-primary">WHO｜Emergency contraception</span>
                <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
              </a>
              <Link
                href="/sources"
                className="flex items-center justify-between rounded-xl border border-primary-light p-3 hover:border-primary transition-colors"
              >
                <span className="text-sm text-text-primary">Rescue Pill｜情報源・更新方針</span>
                <ArrowLeft className="w-4 h-4 text-primary rotate-180 flex-shrink-0" />
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="rounded-2xl bg-primary-light p-5 mb-6 text-sm text-text-secondary leading-relaxed">
          <h2 className="font-bold text-text-primary mb-2">ご注意</h2>
          <p>
            本ガイドは公的機関の公開情報に基づく一般的な情報提供です。
            個別の医療状況に対するアドバイスではありません。
            緊急避妊薬の使用にあたっては、必ず薬剤師または医師にご相談ください。
            詳しくは<Link href="/disclaimer" className="text-primary font-medium hover:underline">免責事項</Link>をご確認ください。
          </p>
        </section>

        {/* CTA */}
        <div className="text-center space-y-3">
          <Link
            href="/pharmacies"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-medium text-white hover:bg-primary/90 transition-colors"
          >
            <Pill className="w-5 h-5" />
            OTC対応薬局を探す
          </Link>
          <div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Heart className="w-4 h-4" />
              このサイトについて
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
