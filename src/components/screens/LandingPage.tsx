"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdBanner } from "@/components/AdBanner";
import {
  Heart,
  Shield,
  Clock,
  FileText,
  MapPin,
  QrCode,
  CheckCircle,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Lock,
  Smartphone,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  {
    icon: Shield,
    title: "完全匿名",
    description: "個人情報の登録不要。端末内で完結するのであなたのプライバシーを守ります。",
  },
  {
    icon: Clock,
    title: "わずか数分",
    description: "簡単な質問に答えるだけで、次に取るべき行動がすぐにわかります。",
  },
  {
    icon: MapPin,
    title: "薬局検索",
    description: "厚労省公式リストに基づいた、最寄りの対応薬局を検索できます。",
  },
  {
    icon: FileText,
    title: "PDF出力対応",
    description: "薬局での提示に便利なPDFを生成。スムーズな対応をサポート。",
  },
];

const steps = [
  {
    number: "01",
    title: "質問に回答",
    description: "画面の指示に従って、簡単な質問に答えていきます。",
  },
  {
    number: "02",
    title: "判定結果を確認",
    description: "あなたの状況に応じた次のステップが表示されます。",
  },
  {
    number: "03",
    title: "薬局・医療機関へ",
    description: "PDFを提示して、スムーズに相談・入手できます。",
  },
];

const faqs = [
  {
    q: "このアプリは誰が使えますか？",
    a: "緊急避妊薬の入手を検討しているすべての方がご利用いただけます。年齢制限はありませんが、未成年の方は保護者や医療機関への相談もご検討ください。",
  },
  {
    q: "個人情報は安全ですか？",
    a: "はい。会員登録は不要で、入力された情報はあなたの端末内のみで処理されます。サーバーへのデータ送信は行いません。",
  },
  {
    q: "緊急避妊薬はどこで入手できますか？",
    a: "2024年より、一部の薬局で処方箋なしで購入可能になりました。本アプリで対応薬局を検索できます。状況によっては医療機関の受診が必要な場合もあります。",
  },
  {
    q: "費用はかかりますか？",
    a: "本アプリは無料でご利用いただけます。緊急避妊薬の費用は薬局・医療機関によって異なります（目安：7,000〜15,000円程度）。",
  },
  {
    q: "このアプリの判定結果は医療行為ですか？",
    a: "いいえ。本アプリの判定結果は参考情報であり、医療行為の代替ではありません。最終的な判断は必ず医療従事者にご相談ください。",
  },
];

export function LandingPage({ onStart }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-light rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative px-4 pt-12 pb-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-4"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-soft">
                <Heart className="w-10 h-10 text-white" fill="white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-primary mb-2">Rescue Pill</h1>
            <p className="text-text-secondary font-medium">緊急避妊支援サービス</p>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-md mx-auto mb-8"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-4 leading-relaxed">
              もしもの時も、
              <br />
              <span className="text-primary">あわてず、次の一歩へ。</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              緊急避妊薬の入手をサポートするセルフチェックアプリ。
              匿名で、数分で、あなたの次の行動がわかります。
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-sm mx-auto space-y-4"
          >
            <Button onClick={onStart} className="w-full group">
              <span>セルフチェックを始める</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-text-muted text-center">
              登録不要・完全無料・約3分で完了
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="px-4 py-4">
        <AdBanner />
      </div>

      {/* Features Section */}
      <section className="px-4 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              FEATURES
            </span>
            <h2 className="text-2xl font-bold text-text-primary">
              Rescue Pillの特徴
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-text-primary mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-2">
              <CheckCircle className="w-4 h-4" />
              HOW IT WORKS
            </span>
            <h2 className="text-2xl font-bold text-text-primary">使い方</h2>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{step.number}</span>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-text-primary mb-1">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Privacy Section */}
      <section className="px-4 py-12 bg-gradient-to-br from-primary-light to-accent-light">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-soft flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-3">
            あなたのプライバシーを守ります
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            会員登録は一切不要。入力された情報はあなたの端末内のみで処理され、
            外部サーバーには送信されません。安心してご利用ください。
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Smartphone className="w-4 h-4 text-primary" />
              端末内完結
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Shield className="w-4 h-4 text-primary" />
              データ送信なし
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ad Banner */}
      <div className="px-4 py-4">
        <AdBanner />
      </div>

      {/* FAQ Section */}
      <section className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="text-2xl font-bold text-text-primary">
              よくある質問
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left flex items-start justify-between gap-3"
                  >
                    <span className="font-medium text-text-primary text-sm">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-primary-light"
                    >
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-12 bg-gradient-to-br from-primary to-secondary">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            今すぐセルフチェック
          </h2>
          <p className="text-white/80 mb-6">
            あなたの状況に合わせた次の行動がわかります
          </p>
          <Button
            variant="secondary"
            onClick={onStart}
            className="bg-white text-primary hover:bg-white/90"
          >
            無料で始める
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-text-primary">
        <div className="max-w-lg mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-white font-bold">Rescue Pill</span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
              利用規約
            </Link>
            <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/legal" className="text-white/70 hover:text-white transition-colors">
              特定商取引法に基づく表記
            </Link>
            <Link href="/disclaimer" className="text-white/70 hover:text-white transition-colors">
              免責事項
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-white/50 text-center mb-4 leading-relaxed">
            本サービスは医療行為の代替ではありません。
            緊急避妊薬の使用については、必ず医療従事者にご相談ください。
          </p>

          {/* Copyright */}
          <p className="text-xs text-white/40 text-center">
            © 2024 Rescue Pill. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
