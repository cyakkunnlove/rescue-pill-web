"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Result } from "@/types";
import { Check, Circle, Info, Wallet } from "lucide-react";

interface ChecklistScreenProps {
  result: Result;
  onBack: () => void;
}

const pharmacyItems = [
  "保険証（あれば）",
  "現金またはカード（約8,000〜15,000円）",
  "メモや質問リスト（任意）",
  "このアプリの結果画面/PDF",
];

const medicalItems = [
  "保険証",
  "現金またはカード（約15,000〜20,000円）",
  "紹介状（あれば）",
  "お薬手帳（あれば）",
  "メモや質問リスト（任意）",
  "このアプリの結果画面/PDF",
];

export function ChecklistScreen({ result, onBack }: ChecklistScreenProps) {
  const isPharmacy = result.route === "pharmacy";
  const items = isPharmacy ? pharmacyItems : medicalItems;
  const [checks, setChecks] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  const toggleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const checkedCount = checks.filter(Boolean).length;
  const progress = (checkedCount / items.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      <div className="flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-text-primary">
            {isPharmacy ? "薬局向け" : "医療機関向け"}持ち物
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            忘れ物がないか確認しましょう
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>進捗</span>
            <span>
              {checkedCount} / {items.length}
            </span>
          </div>
          <div className="h-3 bg-primary-light rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </div>
        </motion.div>

        {/* Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => toggleCheck(index)}
                  className="w-full flex items-center gap-3 text-left"
                >
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center
                               transition-all duration-200
                               ${
                                 checks[index]
                                   ? "bg-secondary border-secondary"
                                   : "border-primary-light"
                               }`}
                  >
                    {checks[index] ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : (
                      <Circle className="w-4 h-4 text-primary-light" />
                    )}
                  </div>
                  <span
                    className={`flex-1 ${
                      checks[index]
                        ? "text-text-muted line-through"
                        : "text-text-primary"
                    }`}
                  >
                    {item}
                  </span>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Cost Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-r from-accent-light to-primary-light">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  費用の目安
                </h3>
                {isPharmacy ? (
                  <div className="text-sm text-text-secondary space-y-1">
                    <p>• 緊急避妊薬: 約8,000〜15,000円</p>
                    <p>• 保険は通常適用されません</p>
                  </div>
                ) : (
                  <div className="text-sm text-text-secondary space-y-1">
                    <p>• 診察料 + 処方料: 約5,000〜10,000円</p>
                    <p>• 緊急避妊薬: 約10,000〜15,000円</p>
                    <p>• 保険適用の可能性あり（要確認）</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <Card>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-text-secondary">
                {isPharmacy ? (
                  <p>
                    事前に電話で在庫確認することをおすすめします。
                    取り扱いのない薬局もあります。
                  </p>
                ) : (
                  <p>
                    予約なしでも受診可能な場合がありますが、
                    事前に電話で確認することをおすすめします。
                  </p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <Button variant="secondary" onClick={onBack}>
          戻る
        </Button>
      </motion.div>
    </div>
  );
}
