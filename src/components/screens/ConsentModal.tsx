"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { X, AlertTriangle, Shield, MapPin, Brain, FileWarning } from "lucide-react";

interface ConsentModalProps {
  isOpen: boolean;
  onAgree: () => void;
  onClose: () => void;
}

const consentItems = [
  {
    icon: AlertTriangle,
    title: "医療行為の代替ではありません",
    body: "医師・薬剤師の診断や治療の代替ではなく、行動整理のための情報提供ツールです。",
  },
  {
    icon: FileWarning,
    title: "緊急時は医療機関へ",
    body: "症状が重い場合や緊急性が高い場合は、直ちに医療機関を受診してください。",
  },
  {
    icon: Shield,
    title: "データ保存の扱い",
    body: "入力内容はブラウザ内に一時保存されます。サーバーへの送信はありません。",
  },
  {
    icon: Brain,
    title: "AI判定について",
    body: "判定はルールベースのロジックで行われます。医療従事者の判断に代わるものではありません。",
  },
  {
    icon: MapPin,
    title: "位置情報の利用",
    body: "近隣施設検索のために位置情報を利用する場合があります。",
  },
];

export function ConsentModal({ isOpen, onAgree, onClose }: ConsentModalProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary-light">
              <h2 className="text-lg font-bold text-text-primary">
                同意事項
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center hover:bg-primary hover:bg-opacity-20 transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              <div className="space-y-4">
                {consentItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-text-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-secondary">{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-primary-light bg-background-muted">
              <label className="flex items-center gap-3 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-primary accent-primary cursor-pointer"
                />
                <span className="text-sm text-text-primary font-medium">
                  上記内容に同意します
                </span>
              </label>
              <Button onClick={onAgree} disabled={!agreed}>
                同意して開始
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
