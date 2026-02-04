"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdBanner } from "@/components/AdBanner";
import { Heart, Shield, Clock, FileText, Star } from "lucide-react";

interface EntryScreenProps {
  onProceed: () => void;
  hasConsent: boolean;
}

const benefits = [
  { icon: Shield, text: "匿名で安心してご利用いただけます" },
  { icon: Clock, text: "数分で次の行動がわかります" },
  { icon: FileText, text: "QRコード・PDF出力に対応" },
  { icon: Star, text: "薬局・医療機関検索機能付き" },
];

export function EntryScreen({ onProceed, hasConsent }: EntryScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-soft">
              <Heart className="w-12 h-12 text-white" fill="white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-primary mb-2">Rescue Pill</h1>
          <p className="text-lg text-text-secondary font-medium">
            緊急避妊支援アプリ
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-text-secondary mb-8 max-w-sm"
        >
          質問に答えて、次の行動を確認しましょう。
          <br />
          あなたのプライバシーを守りながらサポートします。
        </motion.p>

        {/* Benefits Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm mb-8"
        >
          <Card>
            <h2 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="text-lg">✨</span>
              このアプリでできること
            </h2>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-text-secondary">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm space-y-3"
        >
          <Button onClick={onProceed}>
            {hasConsent ? "セルフチェックを開始" : "同意して進む"}
          </Button>
          <p className="text-xs text-text-muted text-center px-4">
            本アプリの結果は参考情報であり、
            <br />
            医療行為の代替ではありません。
          </p>
        </motion.div>
      </div>

      {/* Ad Banner */}
      <div className="px-4 pb-4">
        <AdBanner />
      </div>
    </div>
  );
}
